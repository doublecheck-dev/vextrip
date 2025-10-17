
CREATE TABLE public.restaurants (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text,
  long_description text,
  image text,
  gallery text[], -- Array of image URLs
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
  amenities text[], -- Array of amenities
  specialties text[], -- Array of specialties
  reservation_required boolean,
  policies text[] -- Array of policies
);



INSERT INTO public.restaurants (
  name,
  description,
  long_description,
  image,
  gallery,
  rating,
  reviews,
  category,
  cuisine,
  location,
  address,
  price_range,
  phone,
  email,
  website,
  open_hours,
  featured,
  amenities,
  specialties,
  reservation_required,
  policies
) VALUES (
  'Hotel Magia Natural',
  'Descubre la magia de la naturaleza en cada rincón. Cocina gourmet con ingredientes locales y vista panorámica de las montañas.',
  'Hotel Magia Natural es un destino gastronómico único donde la cocina gourmet se fusiona con los sabores auténticos de la región. Ubicado en el corazón de San Rafael, nuestros chefs utilizan ingredientes frescos y locales para crear experiencias culinarias memorables con vista panorámica a las majestuosas montañas.',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
  ],
  4.8,
  342,
  'Gourmet',
  'Gourmet Internacional',
  'Centro de San Rafael',
  'Av. San Martín 123, Centro, San Rafael, Mendoza',
  '$$$',
  '+57 312 685-3970',
  'reservas@magianatural.com',
  'www.hotelmagianatural.com',
  '8:00 AM - 11:00 PM',
  TRUE,
  ARRAY['Terraza con Vista', 'WiFi', 'Aire Acondicionado', 'Estacionamiento', 'Bar'],
  ARRAY['Cordero Patagónico', 'Trucha Andina', 'Postres Artesanales'],
  TRUE,
  ARRAY[
    'Reservas recomendadas',
    'Dress code: Smart casual',
    'Cancelación gratuita hasta 2 horas antes',
    'Menú especial para vegetarianos disponible'
  ]
);