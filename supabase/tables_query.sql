-- Clean: drop + recreate schema and idempotent seeds (restaurants.id = integer)

-- Drop objects (safe order)
DROP TABLE IF EXISTS public.restaurant_specialties CASCADE;
DROP TABLE IF EXISTS public.restaurant_tables CASCADE;
DROP TABLE IF EXISTS public.menu_items CASCADE;
DROP TABLE IF EXISTS public.menus CASCADE;
DROP TABLE IF EXISTS public.restaurants CASCADE;
DROP TABLE IF EXISTS public.specialties CASCADE;
DROP TABLE IF EXISTS public.kitchens CASCADE;
DROP TABLE IF EXISTS public.test_table CASCADE;
DROP SEQUENCE IF EXISTS public.restaurants_id_seq;
DROP TYPE IF EXISTS public.table_status;

-- Schema + seeds donde restaurants.id es INTEGER (idempotente)

-- 1) Enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'table_status') THEN
    CREATE TYPE public.table_status AS ENUM ('AVAILABLE','OCCUPIED','RESERVED');
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 2) Secuencia para restaurants.id
CREATE SEQUENCE IF NOT EXISTS public.restaurants_id_seq;

-- Ensure pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 3) Tablas (ordenadas)
CREATE TABLE IF NOT EXISTS public.kitchens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  phone text,
  email text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT kitchens_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.specialties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT specialties_pkey PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS public.restaurants (
  id integer NOT NULL DEFAULT nextval('restaurants_id_seq'::regclass),
  name text NOT NULL,
  description text,
  long_description text,
  image text,
  gallery text[],
  rating numeric,
  reviews integer,
  category text,
  cuisine text,
  location text,
  address text,
  price_range text,
  phone text,
  email text,
  website text,
  open_hours text,
  featured boolean,
  amenities text[],
  specialties text[],
  reservation_required boolean,
  policies text[],
  city text,
  metadata jsonb DEFAULT '{}'::jsonb,
  lat numeric,
  lng numeric,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT restaurants_pkey PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS public.menus (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  kind text,
  active boolean DEFAULT true,
  restaurant_id integer NOT NULL,
  kitchen_id uuid,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menus_pkey PRIMARY KEY (id),
  CONSTRAINT menus_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id),
  CONSTRAINT menus_kitchen_id_fkey FOREIGN KEY (kitchen_id) REFERENCES public.kitchens(id)
);
CREATE TABLE IF NOT EXISTS public.menu_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0.00,
  currency text DEFAULT 'USD'::text,
  available boolean DEFAULT true,
  spicy_level smallint CHECK (spicy_level >= 0 AND spicy_level <= 5),
  position integer DEFAULT 0,
  menu_id uuid NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_items_pkey PRIMARY KEY (id),
  CONSTRAINT menu_items_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id)
);
CREATE TABLE IF NOT EXISTS public.restaurant_tables (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  number integer NOT NULL,
  seats integer DEFAULT 4,
  location text,
  accessible boolean DEFAULT false,
  status public.table_status DEFAULT 'AVAILABLE',
  restaurant_id integer NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT restaurant_tables_pkey PRIMARY KEY (id),
  CONSTRAINT restaurant_tables_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id)
);

CREATE TABLE IF NOT EXISTS public.restaurant_specialties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  restaurant_id integer NOT NULL,
  specialty_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT restaurant_specialties_pkey PRIMARY KEY (id),
  CONSTRAINT restaurant_specialties_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id),
  CONSTRAINT restaurant_specialties_specialty_id_fkey FOREIGN KEY (specialty_id) REFERENCES public.specialties(id)
);

CREATE TABLE IF NOT EXISTS public.test_table (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT test_table_pkey PRIMARY KEY (id)
);
