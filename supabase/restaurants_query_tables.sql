-- Consultas útiles para el módulo "restaurantes"

-- 1) Listar restaurantes con kitchen y specialties (agregadas)
-- Parámetros: none
SELECT
  r.id,
  r.name,
  r.slug,
  r.city,
  r.cuisine,
  r.price_range,
  r.rating,
  r.image,
  k.id AS kitchen_id,
  k.name AS kitchen_name,
  COALESCE(jsonb_agg(jsonb_build_object('id', s.id, 'name', s.name)) FILTER (WHERE s.id IS NOT NULL), '[]') AS specialties
FROM public.restaurants r
LEFT JOIN public.kitchens k ON k.id = r.kitchen_id
LEFT JOIN public.restaurant_specialties rs ON rs.restaurant_id = r.id
LEFT JOIN public.specialties s ON s.id = rs.specialty_id
GROUP BY r.id, k.id, k.name
ORDER BY r.featured DESC, r.rating DESC, r.name ASC;


-- 2) Obtener detalle completo de un restaurante (menus + items) como JSON
-- Parámetros: :restaurant_id
SELECT jsonb_build_object(
  'id', r.id,
  'name', r.name,
  'slug', r.slug,
  'description', r.description,
  'address', r.address,
  'city', r.city,
  'lat', r.lat,
  'lng', r.lng,
  'phone', r.phone,
  'kitchen', jsonb_build_object('id', k.id, 'name', k.name),
  'specialties', COALESCE(specialties, '[]'),
  'menus', COALESCE(menus, '[]')
) AS restaurant
FROM public.restaurants r
LEFT JOIN public.kitchens k ON k.id = r.kitchen_id
LEFT JOIN (
  SELECT rs.restaurant_id,
         jsonb_agg(jsonb_build_object('id', s.id, 'name', s.name)) AS specialties
  FROM public.restaurant_specialties rs
  JOIN public.specialties s ON s.id = rs.specialty_id
  GROUP BY rs.restaurant_id
) sp ON sp.restaurant_id = r.id
LEFT JOIN (
  SELECT m.restaurant_id,
         jsonb_agg(
           jsonb_build_object(
             'id', m.id,
             'title', m.title,
             'description', m.description,
             'items', COALESCE(items.items, '[]')
           ) ORDER BY m.title
         ) AS menus
  FROM public.menus m
  LEFT JOIN (
    SELECT mi.menu_id,
           jsonb_agg(jsonb_build_object('id', mi.id, 'name', mi.name, 'price', mi.price, 'available', mi.available) ORDER BY mi.position) AS items
    FROM public.menu_items mi
    GROUP BY mi.menu_id
  ) items ON items.menu_id = m.id
  GROUP BY m.restaurant_id
) m ON m.restaurant_id = r.id
WHERE r.id = :restaurant_id; -- reemplazar :restaurant_id por UUID


-- 3) Búsqueda full-text por texto en name/description/cuisine (paginated)
-- Parámetros: :query_text, :limit, :offset
SELECT
  r.id, r.name, r.slug, r.city, r.cuisine, r.rating, r.image,
  ts_rank(to_tsvector('spanish', coalesce(r.name,'') || ' ' || coalesce(r.description,'')), plainto_tsquery('spanish', :query_text)) AS rank
FROM public.restaurants r
WHERE to_tsvector('spanish', coalesce(r.name,'') || ' ' || coalesce(r.description,'') || ' ' || coalesce(r.cuisine,'')) @@ plainto_tsquery('spanish', :query_text)
ORDER BY rank DESC, r.rating DESC
LIMIT COALESCE(:limit, 20) OFFSET COALESCE(:offset, 0);


-- 4) Obtener mesas disponibles por restaurante
-- Parámetros: :restaurant_id
SELECT id, number, seats, location, status, metadata, created_at
FROM public.restaurant_tables
WHERE restaurant_id = :restaurant_id
  AND status = 'AVAILABLE'
ORDER BY number;


-- 5) Obtener menú y sus items por slug de restaurante
-- Parámetros: :restaurant_slug
SELECT m.id AS menu_id, m.title AS menu_title, m.description AS menu_description,
       mi.id AS item_id, mi.name AS item_name, mi.description AS item_description, mi.price, mi.available
FROM public.menus m
JOIN public.restaurants r ON r.id = m.restaurant_id
LEFT JOIN public.menu_items mi ON mi.menu_id = m.id
WHERE r.slug = :restaurant_slug
ORDER BY m.title, mi.position;


-- 6) Upsert ejemplo: insertar/actualizar restaurante por slug
-- Parámetros: :slug, :name, :description, :city, :cuisine
INSERT INTO public.restaurants (id, slug, name, description, city, cuisine, created_at, updated_at)
VALUES (gen_random_uuid(), :slug, :name, :description, :city, :cuisine, now(), now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  city = EXCLUDED.city,
  cuisine = EXCLUDED.cuisine,
  updated_at = now()
RETURNING *;


-- 7) Reservar (marcar) una mesa: ejemplo de actualización segura
-- Parámetros: :table_id, :expected_status (optional: 'AVAILABLE')
-- Esto intenta reservar la mesa solo si estaba AVAILABLE (optimistic)
UPDATE public.restaurant_tables
SET status = 'RESERVED', updated_at = now()
WHERE id = :table_id
  AND ( :expected_status IS NULL OR status = :expected_status )
RETURNING id, restaurant_id, number, seats, status, updated_at;


-- 8) Estadísticas rápidas: total de restaurantes, menus, items y mesas
SELECT
  (SELECT count(*) FROM public.restaurants) AS total_restaurants,
  (SELECT count(*) FROM public.menus) AS total_menus,
  (SELECT count(*) FROM public.menu_items) AS total_menu_items,
  (SELECT count(*) FROM public.restaurant_tables) AS total_tables;
