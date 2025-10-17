-- -- Migration: create_test_table
-- CREATE TABLE public.test_table (
--   id serial PRIMARY KEY,
--   name text,
--   created_at timestamp with time zone DEFAULT now()
-- );

-- INSERT INTO public.test_table (name) VALUES ('Prueba Supabase');

-- Agregado: esquema detallado para módulo Restaurantes (Supabase / Postgres)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Crear tipos ENUM si no existen
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'table_status') THEN
    CREATE TYPE public.table_status AS ENUM ('AVAILABLE','OCCUPIED','RESERVED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'price_range_enum') THEN
    CREATE TYPE public.price_range_enum AS ENUM ('VERY_LOW','LOW','MEDIUM','HIGH','VERY_HIGH');
  END IF;
END
$$;

-- Función reutilizable para actualizar updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Kitchens
CREATE TABLE IF NOT EXISTS public.kitchens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  phone text,
  email text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_kitchens_set_updated_at') THEN
    CREATE TRIGGER trg_kitchens_set_updated_at
    BEFORE UPDATE ON public.kitchens
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END
$$;

-- Asegurar índice único en kitchens.name para soportar INSERT ... ON CONFLICT (name)
CREATE UNIQUE INDEX IF NOT EXISTS ux_kitchens_name ON public.kitchens (name);

-- Restaurants
CREATE TABLE IF NOT EXISTS public.restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  description text,
  image text,
  featured boolean DEFAULT false,
  price_range public.price_range_enum,
  rating numeric(3,2) CHECK (rating >= 0 AND rating <= 5),
  reviews integer DEFAULT 0,
  cuisine text,
  address text,
  city text,
  postal_code text,
  lat numeric(9,6),
  lng numeric(9,6),
  phone text,
  contact_email text,
  website text,
  kitchen_id uuid,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_restaurant_kitchen FOREIGN KEY (kitchen_id) REFERENCES public.kitchens(id) ON DELETE SET NULL
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_restaurants_set_updated_at') THEN
    CREATE TRIGGER trg_restaurants_set_updated_at
    BEFORE UPDATE ON public.restaurants
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END
$$;

ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS lat numeric(9,6),
  ADD COLUMN IF NOT EXISTS lng numeric(9,6);

-- Crear índices si aún no existen (idempotente)
CREATE INDEX IF NOT EXISTS idx_restaurants_metadata_gin ON public.restaurants USING gin (metadata);
CREATE INDEX IF NOT EXISTS idx_restaurants_location ON public.restaurants (lat, lng);

-- Índices para restaurants
CREATE INDEX IF NOT EXISTS idx_restaurants_name ON public.restaurants (name);
CREATE INDEX IF NOT EXISTS idx_restaurants_city ON public.restaurants (city);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON public.restaurants (cuisine);

-- Full-text search index (concatenate name + description + cuisine)
CREATE INDEX IF NOT EXISTS idx_restaurants_fts ON public.restaurants USING gin (
  to_tsvector('spanish', coalesce(name,'') || ' ' || coalesce(description,'') || ' ' || coalesce(cuisine,''))
);

-- Menus
CREATE TABLE IF NOT EXISTS public.menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  kind text, -- ejemplo: 'lunch','dinner','drinks'
  active boolean DEFAULT true,
  restaurant_id uuid NOT NULL, -- no crear FK directa a restaurants por posibles incompatibilidades de tipo
  kitchen_id uuid,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
  -- CONSTRAINT fk_menu_restaurant FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE, -- removed (conditional below)
  -- CONSTRAINT fk_menu_kitchen FOREIGN KEY (kitchen_id) REFERENCES public.kitchens(id) ON DELETE SET NULL
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_menus_set_updated_at') THEN
    CREATE TRIGGER trg_menus_set_updated_at
    BEFORE UPDATE ON public.menus
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_menus_title ON public.menus (title);
CREATE INDEX IF NOT EXISTS idx_menus_metadata_gin ON public.menus USING gin (metadata);

-- Menu items
CREATE TABLE IF NOT EXISTS public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0.00,
  currency text DEFAULT 'USD',
  available boolean DEFAULT true,
  spicy_level smallint CHECK (spicy_level >= 0 AND spicy_level <= 5),
  position integer DEFAULT 0,
  menu_id uuid NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_menuitem_menu FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON DELETE CASCADE
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_menu_items_set_updated_at') THEN
    CREATE TRIGGER trg_menu_items_set_updated_at
    BEFORE UPDATE ON public.menu_items
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_menu_items_name ON public.menu_items (name);
CREATE INDEX IF NOT EXISTS idx_menu_items_metadata_gin ON public.menu_items USING gin (metadata);

-- Tables (mesas)
CREATE TABLE IF NOT EXISTS public.restaurant_tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer NOT NULL,
  seats integer DEFAULT 4,
  location text,
  accessible boolean DEFAULT false,
  status public.table_status DEFAULT 'AVAILABLE',
  restaurant_id uuid NOT NULL, -- FK to restaurants will be added conditionally
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
  -- CONSTRAINT fk_table_restaurant FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE -- removed
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_restaurant_table_number ON public.restaurant_tables (restaurant_id, number);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_tables_set_updated_at') THEN
    CREATE TRIGGER trg_tables_set_updated_at
    BEFORE UPDATE ON public.restaurant_tables
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_tables_metadata_gin ON public.restaurant_tables USING gin (metadata);

-- Specialties and join (M:N)
CREATE TABLE IF NOT EXISTS public.specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_specialties_set_updated_at') THEN
    CREATE TRIGGER trg_specialties_set_updated_at
    BEFORE UPDATE ON public.specialties
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.restaurant_specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL, -- conditional FK
  specialty_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
  -- CONSTRAINT fk_rs_restaurant FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE, -- removed
  -- CONSTRAINT fk_rs_specialty FOREIGN KEY (specialty_id) REFERENCES public.specialties(id) ON DELETE CASCADE -- keepable if needed (created below)
);

-- Si la constraint fk_rs_specialty no fue creada (por orden), crearla ahora (idempotente)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_rs_specialty') THEN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'restaurant_specialties')
      AND EXISTS (SELECT 1 FROM pg_class WHERE relname = 'specialties') THEN
      EXECUTE 'ALTER TABLE public.restaurant_specialties ADD CONSTRAINT fk_rs_specialty FOREIGN KEY (specialty_id) REFERENCES public.specialties(id) ON DELETE CASCADE';
    END IF;
  END IF;
END
$$;

-- Añadir constraints FK hacia public.restaurants sólo si los tipos de columna son compatibles (idempotente)
DO $$
BEGIN
  -- fk_menu_restaurant
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_menu_restaurant') THEN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'menus') AND EXISTS (SELECT 1 FROM pg_class WHERE relname = 'restaurants') THEN
      IF (SELECT atttypid FROM pg_attribute WHERE attrelid = 'public.menus'::regclass AND attname = 'restaurant_id' LIMIT 1)
         =
         (SELECT atttypid FROM pg_attribute WHERE attrelid = 'public.restaurants'::regclass AND attname = 'id' LIMIT 1)
      THEN
        EXECUTE 'ALTER TABLE public.menus ADD CONSTRAINT fk_menu_restaurant FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE';
      END IF;
    END IF;
  END IF;

  -- fk_table_restaurant
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_table_restaurant') THEN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'restaurant_tables') AND EXISTS (SELECT 1 FROM pg_class WHERE relname = 'restaurants') THEN
      IF (SELECT atttypid FROM pg_attribute WHERE attrelid = 'public.restaurant_tables'::regclass AND attname = 'restaurant_id' LIMIT 1)
         =
         (SELECT atttypid FROM pg_attribute WHERE attrelid = 'public.restaurants'::regclass AND attname = 'id' LIMIT 1)
      THEN
        EXECUTE 'ALTER TABLE public.restaurant_tables ADD CONSTRAINT fk_table_restaurant FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE';
      END IF;
    END IF;
  END IF;

  -- fk_rs_restaurant (restaurant_specialties -> restaurants)
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_rs_restaurant') THEN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'restaurant_specialties') AND EXISTS (SELECT 1 FROM pg_class WHERE relname = 'restaurants') THEN
      IF (SELECT atttypid FROM pg_attribute WHERE attrelid = 'public.restaurant_specialties'::regclass AND attname = 'restaurant_id' LIMIT 1)
         =
         (SELECT atttypid FROM pg_attribute WHERE attrelid = 'public.restaurants'::regclass AND attname = 'id' LIMIT 1)
      THEN
        EXECUTE 'ALTER TABLE public.restaurant_specialties ADD CONSTRAINT fk_rs_restaurant FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE';
      END IF;
    END IF;
  END IF;
END
$$;

-- Seeds mínimos (opcionales, idempotentes)
INSERT INTO public.kitchens (id, name, description) VALUES
  (gen_random_uuid(), 'Cocina Principal', 'Cocina central del restaurante')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.specialties (name) VALUES
  ('Asados'), ('Mariscos'), ('Vegano')
ON CONFLICT (name) DO NOTHING;
