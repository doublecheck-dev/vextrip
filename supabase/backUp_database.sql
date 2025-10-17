-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.kitchens (
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
CREATE TABLE public.menu_items (
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
  CONSTRAINT fk_menuitem_menu FOREIGN KEY (menu_id) REFERENCES public.menus(id)
);
CREATE TABLE public.menus (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  kind text,
  active boolean DEFAULT true,
  restaurant_id uuid NOT NULL,
  kitchen_id uuid,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menus_pkey PRIMARY KEY (id)
);
CREATE TABLE public.restaurant_specialties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL,
  specialty_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT restaurant_specialties_pkey PRIMARY KEY (id),
  CONSTRAINT fk_rs_specialty FOREIGN KEY (specialty_id) REFERENCES public.specialties(id)
);
CREATE TABLE public.restaurant_tables (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  number integer NOT NULL,
  seats integer DEFAULT 4,
  location text,
  accessible boolean DEFAULT false,
  status USER-DEFINED DEFAULT 'AVAILABLE'::table_status,
  restaurant_id uuid NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT restaurant_tables_pkey PRIMARY KEY (id)
);
CREATE TABLE public.restaurants (
  id integer NOT NULL DEFAULT nextval('restaurants_id_seq'::regclass),
  name text NOT NULL,
  description text,
  long_description text,
  image text,
  gallery ARRAY,
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
  amenities ARRAY,
  specialties ARRAY,
  reservation_required boolean,
  policies ARRAY,
  city text,
  metadata jsonb DEFAULT '{}'::jsonb,
  lat numeric,
  lng numeric,
  CONSTRAINT restaurants_pkey PRIMARY KEY (id)
);
CREATE TABLE public.specialties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT specialties_pkey PRIMARY KEY (id)
);
CREATE TABLE public.test_table (
  id integer NOT NULL DEFAULT nextval('test_table_id_seq'::regclass),
  name text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT test_table_pkey PRIMARY KEY (id)
);