/* =========================
   Seeds idempotentes (ampliados: >10 filas por tabla) - corregido
   ========================= */
BEGIN;

-- Specialties (11)
INSERT INTO public.specialties (id, name, created_at, updated_at) VALUES
  ('b1111111-1111-1111-1111-111111111111'::uuid, 'Asados', now(), now()),
  ('b2222222-2222-2222-2222-222222222222'::uuid, 'Mariscos', now(), now()),
  ('b3333333-3333-3333-3333-333333333333'::uuid, 'Vegano', now(), now()),
  ('b4444444-4444-4444-4444-444444444444'::uuid, 'Italiana', now(), now()),
  ('b5555555-5555-5555-5555-555555555555'::uuid, 'Mexicana', now(), now()),
  ('b6666666-6666-6666-6666-666666666666'::uuid, 'Postres', now(), now()),
  ('b7777777-7777-7777-7777-777777777777'::uuid, 'Vegana Gourmet', now(), now()),
  ('b8888888-8888-8888-8888-888888888888'::uuid, 'Rápida', now(), now()),
  ('b9999999-9999-9999-9999-999999999999'::uuid, 'Café', now(), now()),
  ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'Fusión', now(), now()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'Mar y Tierra Plus', now(), now())
ON CONFLICT (name) DO NOTHING;

-- Kitchens (11)
INSERT INTO public.kitchens (id, name, description, phone, email, metadata, created_at, updated_at) VALUES
  ('33333333-3333-3333-3333-333333333333'::uuid, 'Cocina Central', 'Cocina principal', '+57 300 0000000', 'central@vextrip.test', '{"hours":"08:00-22:00"}'::jsonb, now(), now()),
  ('44444444-4444-4444-4444-444444444444'::uuid, 'Cocina de Mar', 'Especializada en mariscos', '+57 300 1111111', 'mar@vextrip.test', '{"hours":"12:00-23:00"}'::jsonb, now(), now()),
  ('55555555-5555-5555-5555-555555555555'::uuid, 'Cocina Express', 'Platos rápidos', '+57 300 2222222', 'express@vextrip.test', '{}'::jsonb, now(), now()),
  ('66666666-6666-6666-6666-666666666666'::uuid, 'Cocina Vegetariana', 'Opciones vegetarianas', '+57 300 3333333', 'veg@vextrip.test', '{}'::jsonb, now(), now()),
  ('77777777-7777-7777-7777-777777777777'::uuid, 'Cocina Italiana', 'Pastas y pizzas', '+57 300 4444444', 'italia@vextrip.test', '{}'::jsonb, now(), now()),
  ('88888888-8888-8888-8888-888888888888'::uuid, 'Café Central', 'Cafetería', '+57 300 5555555', 'cafe@vextrip.test', '{}'::jsonb, now(), now()),
  ('99999999-9999-9999-9999-999999999999'::uuid, 'Cocina Mex', 'Sabores mexicanos', '+57 300 6666666', 'mex@vextrip.test', '{}'::jsonb, now(), now()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'Cocina Gourmet', 'Alta cocina', '+57 300 7777777', 'gourmet@vextrip.test', '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'Cocina de Postres', 'Postres y dulces', '+57 300 8888888', 'postres@vextrip.test', '{}'::jsonb, now(), now()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid, 'Cocina Fusión', 'Fusión internacional', '+57 300 9999999', 'fusion@vextrip.test', '{}'::jsonb, now(), now()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid, 'Cocina Local', 'Productos regionales', '+57 300 1010101', 'local@vextrip.test', '{}'::jsonb, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Restaurants (11, ids 1..11)
INSERT INTO public.restaurants (id, name, description, long_description, image, gallery, rating, reviews, cuisine, address, price_range, phone, city, metadata, lat, lng, created_at, updated_at) VALUES
  (1, 'Parrilla San Rafael', 'Parrilla tradicional', 'La mejor parrilla con carnes selectas y ambiente familiar', '/images/parrilla.jpg', ARRAY['/images/parrilla1.jpg','/images/parrilla2.jpg']::text[], 4.6, 124, 'Carnes', 'Calle 10 #5-20', '$$', '+57 310 1234567', 'San Rafael', '{"note":"seed r1"}'::jsonb, -34.123456, -69.123456, now(), now()),
  (2, 'Mar y Tierra', 'Mariscos y parrilla', 'Fusión de mar y tierra con productos locales', '/images/marytierra.jpg', ARRAY['/images/myt1.jpg']::text[], 4.4, 87, 'Mariscos', 'Av 5 #2-10', '$$$', '+57 310 7654321', 'San Rafael', '{"note":"seed r2"}'::jsonb, -34.223456, -69.223456, now(), now()),
  (3, 'La Trattoria', 'Pasta y pizza', 'Ambiente familiar y horno de leña', '/images/trattoria.jpg', ARRAY[]::text[], 4.5, 56, 'Italiana', 'Calle 1 #1-01', '$$', '+57 300 1111222', 'San Rafael', '{}'::jsonb, -34.100000, -69.100000, now(), now()),
  (4, 'Taquería El Sabor', 'Tacos y antojitos', 'Sabor auténtico mexicano', '/images/taqueria.jpg', ARRAY[]::text[], 4.2, 34, 'Mexicana', 'Av 2 #2-02', '$', '+57 300 2222333', 'San Rafael', '{}'::jsonb, -34.110000, -69.110000, now(), now()),
  (5, 'Café del Parque', 'Cafetería y pastelería', 'Desayunos y brunch', '/images/cafe.jpg', ARRAY[]::text[], 4.7, 90, 'Café', 'Plaza Central', '$', '+57 300 3333444', 'San Rafael', '{}'::jsonb, -34.120000, -69.120000, now(), now()),
  (6, 'Veggie House', 'Opciones veganas', 'Cocina 100% vegetal', '/images/veggie.jpg', ARRAY[]::text[], 4.3, 45, 'Vegano', 'Calle 3 #3-03', '$$', '+57 300 4444555', 'San Rafael', '{}'::jsonb, -34.130000, -69.130000, now(), now()),
  (7, 'Postres & Co', 'Dulces y tortas', 'Postres caseros', '/images/postres.jpg', ARRAY[]::text[], 4.8, 64, 'Postres', 'Calle 4 #4-04', '$', '+57 300 5555666', 'San Rafael', '{}'::jsonb, -34.140000, -69.140000, now(), now()),
  (8, 'Bistro Fusión', 'Comida fusión', 'Menú creativo', '/images/bistro.jpg', ARRAY[]::text[], 4.1, 22, 'Fusión', 'Av 6 #6-06', '$$$', '+57 300 6666777', 'San Rafael', '{}'::jsonb, -34.150000, -69.150000, now(), now()),
  (9, 'Express Burger', 'Hamburguesas y papas', 'Rápido y sabroso', '/images/burger.jpg', ARRAY[]::text[], 3.9, 120, 'Rápida', 'Calle 7 #7-07', '$', '+57 300 7777888', 'San Rafael', '{}'::jsonb, -34.160000, -69.160000, now(), now()),
  (10,'La Marisquería', 'Mariscos frescos', 'Pescados y mariscos del día', '/images/marisqueria.jpg', ARRAY[]::text[], 4.5, 48, 'Mariscos', 'Av 8 #8-08', '$$$', '+57 300 8888999', 'San Rafael', '{}'::jsonb, -34.170000, -69.170000, now(), now()),
  (11,'El Rincón Gourmet', 'Alta cocina', 'Experiencia gourmet', '/images/gourmet.jpg', ARRAY[]::text[], 4.9, 18, 'Gourmet', 'Calle 9 #9-09', '$$$$', '+57 300 9999000', 'San Rafael', '{}'::jsonb, -34.180000, -69.180000, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Menus (11 menus for 11 restaurants)
INSERT INTO public.menus (id, title, description, kind, active, restaurant_id, kitchen_id, metadata, created_at, updated_at) VALUES
  ('55555555-5555-5555-5555-555555555555'::uuid, 'Menú Principal', 'Platos destacados', 'dinner', true, 1, '33333333-3333-3333-3333-333333333333'::uuid, '{"notes":"sin gluten"}'::jsonb, now(), now()),
  ('66666666-6666-6666-6666-666666666666'::uuid, 'Menú de Mar', 'Especialidades del mar', 'dinner', true, 2, '44444444-4444-4444-4444-444444444444'::uuid, '{}'::jsonb, now(), now()),
  ('77777777-7777-7777-7777-777777777777'::uuid, 'Menú Italiano', 'Antipasti y pastas', 'dinner', true, 3, '77777777-7777-7777-7777-777777777777'::uuid, '{}'::jsonb, now(), now()),
  ('88888888-8888-8888-8888-888888888888'::uuid, 'Menú Mexicano', 'Tacos y más', 'dinner', true, 4, '99999999-9999-9999-9999-999999999999'::uuid, '{}'::jsonb, now(), now()),
  ('99999999-9999-9999-9999-999999999990'::uuid, 'Brunch', 'Desayunos y brunch', 'brunch', true, 5, '88888888-8888-8888-8888-888888888888'::uuid, '{}'::jsonb, now(), now()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01'::uuid,'Menú Vegano','Platos 100% veganos','dinner',true,6,'66666666-6666-6666-6666-666666666666'::uuid, '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01'::uuid,'Postres','Tortas y postres','dessert',true,7,'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, '{}'::jsonb, now(), now()),
  ('cccccccc-cccc-cccc-cccc-cccccccc0001'::uuid,'Fusión Creativa','Degustación','dinner',true,8,'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid, '{}'::jsonb, now(), now()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid,'Fast Menu','Rápido y económico','lunch',true,9,'55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeee0001'::uuid,'Mariscos Premium','Lo mejor del mar','dinner',true,10,'44444444-4444-4444-4444-444444444444'::uuid, '{}'::jsonb, now(), now()),
  ('ffffffff-ffff-ffff-ffff-ffffffff0001'::uuid,'Cena Gourmet','Menú degustación','dinner',true,11,'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, '{}'::jsonb, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Menu items (>=11 items across menus) — UUIDs válidos y únicos
INSERT INTO public.menu_items (id, name, description, price, currency, available, spicy_level, position, menu_id, metadata, created_at, updated_at) VALUES
  ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0'::uuid, 'Bife de Chorizo', 'Bife jugoso a la parrilla', 45000.00, 'COP', true, 0, 1, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  ('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1'::uuid, 'Ensalada de Quinoa', 'Opción vegana', 18000.00, 'COP', true, 0, 2, '55555555-5555-5555-5555-555555555555'::uuid, '{"vegan":true}'::jsonb, now(), now()),
  ('c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2'::uuid, 'Ceviche Clásico', 'Ceviche de la casa', 32000.00, 'COP', true, 1, 1, '66666666-6666-6666-6666-666666666666'::uuid, '{}'::jsonb, now(), now()),
  ('d3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3'::uuid, 'Pulpo a la Parrilla', 'Pulpo tierno con chimichurri', 42000.00, 'COP', true, 2, 2, '66666666-6666-6666-6666-666666666666'::uuid, '{}'::jsonb, now(), now()),
  ('e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4'::uuid, 'Spaghetti Carbonara', 'Pasta clásica', 25000.00, 'COP', true, 0, 1, '77777777-7777-7777-7777-777777777777'::uuid, '{}'::jsonb, now(), now()),
  ('f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5'::uuid, 'Tacos al Pastor', 'Tacos tradicionales', 12000.00, 'COP', true, 1, 1, '88888888-8888-8888-8888-888888888888'::uuid, '{}'::jsonb, now(), now()),
  ('6a6a6a6a-6a6a-6a6a-6a6a-6a6a6a6a6a6a'::uuid, 'Brunch Especial', 'Huevos, pancakes y más', 22000.00, 'COP', true, 0, 1, '99999999-9999-9999-9999-999999999990'::uuid, '{}'::jsonb, now(), now()),
  ('7b7b7b7b-7b7b-7b7b-7b7b-7b7b7b7b7b7b'::uuid, 'Bowl Veggie', 'Ingredientes frescos', 20000.00, 'COP', true, 0, 1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01'::uuid, '{}'::jsonb, now(), now()),
  ('8c8c8c8c-8c8c-8c8c-8c8c-8c8c8c8c8c8c'::uuid, 'Tarta de Chocolate', 'Postre casero', 9000.00, 'COP', true, 0, 1, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01'::uuid, '{}'::jsonb, now(), now()),
  ('9d9d9d9d-9d9d-9d9d-9d9d-9d9d9d9d9d9d'::uuid, 'Hamburguesa Express', 'Hamburguesa clásica', 15000.00, 'COP', true, 0, 1, 'dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid, '{}'::jsonb, now(), now()),
  ('0e0e0e0e-0e0e-0e0e-0e0e-0e0e0e0e0e0e'::uuid, 'Pulpo Especial', 'Pulpo con paprika', 38000.00, 'COP', true, 2, 1, 'eeeeeeee-eeee-eeee-eeee-eeeeeeee0001'::uuid, '{}'::jsonb, now(), now())
ON CONFLICT (id) DO NOTHING;

-- 20 additional menu_items for menu_id 55555555-5555-5555-5555-555555555555
INSERT INTO public.menu_items (id, name, description, price, currency, available, spicy_level, position, menu_id, metadata, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Entrante Mixto', 'Tabla de entradas para compartir', 12000.00, 'COP', true, 0, 1, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Sopa del Día', 'Sopa preparada con ingredientes frescos', 9000.00, 'COP', true, 0, 2, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Ensalada César', 'Ensalada clásica con aderezo César', 14000.00, 'COP', true, 0, 3, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Empanadas de Carne', 'Empanadas caseras', 8000.00, 'COP', true, 1, 4, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Anticuchos', 'Brochetas de corazón a la parrilla', 16000.00, 'COP', true, 2, 5, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Bife de Chorizo (Medio)', 'Porción mediana de bife', 35000.00, 'COP', true, 0, 6, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Bife de Chorizo (Grande)', 'Porción grande para compartir', 60000.00, 'COP', true, 0, 7, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Pulpo a la Parrilla', 'Pulpo tierno con chimichurri', 42000.00, 'COP', true, 2, 8, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Ceviche de la Casa', 'Ceviche fresco con limón y ají', 32000.00, 'COP', true, 1, 9, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Arroz con Mariscos', 'Arroz meloso con mariscos frescos', 38000.00, 'COP', true, 1, 10, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Spaghetti Carbonara', 'Pasta con salsa cremosa y panceta', 25000.00, 'COP', true, 0, 11, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Ravioles de Ricotta', 'Ravioles caseros con salsa de tomate', 26000.00, 'COP', true, 0, 12, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Pollo al Ajillo', 'Pollo marinado y salteado', 23000.00, 'COP', true, 0, 13, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Hamburguesa Gourmet', 'Hamburguesa con queso, lechuga y tomato', 18000.00, 'COP', true, 0, 14, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Risotto de Champiñones', 'Risotto cremoso con setas', 27000.00, 'COP', true, 0, 15, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Lomo a la Pimienta', 'Lomo en salsa de pimienta', 45000.00, 'COP', true, 2, 16, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Pescado del Día', 'Pescado fresco según la pesca', 34000.00, 'COP', true, 1, 17, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Ensalada Primavera', 'Mezcla de hojas, frutos y vinagreta', 12000.00, 'COP', true, 0, 18, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Papas a la Provenzal', 'Papas rústicas con ajo y perejil', 8000.00, 'COP', true, 0, 19, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  (gen_random_uuid(), 'Tarta de Chocolate', 'Postre casero, porción individual', 9000.00, 'COP', true, 0, 20, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now())
ON CONFLICT (id) DO NOTHING;

-- 20 additional menus for restaurant_id = 1
INSERT INTO public.menus (id, title, description, kind, active, restaurant_id, kitchen_id, metadata, created_at, updated_at) VALUES
  ('10101010-1010-1010-1010-101010101010'::uuid, 'Menú Especial 1', 'Selección especial de la casa', 'dinner', true, 1, '33333333-3333-3333-3333-333333333333'::uuid, '{}'::jsonb, now(), now()),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'Menú Especial 2', 'Entrantes y platos principales', 'dinner', true, 1, '33333333-3333-3333-3333-333333333333'::uuid, '{}'::jsonb, now(), now()),
  ('12121212-1212-1212-1212-121212121212'::uuid, 'Menú Ejecutivo', 'Opción rápida para almuerzo', 'lunch', true, 1, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  ('13131313-1313-1313-1313-131313131313'::uuid, 'Menú Parrilla', 'Carnes a la parrilla', 'dinner', true, 1, '33333333-3333-3333-3333-333333333333'::uuid, '{}'::jsonb, now(), now()),
  ('14141414-1414-1414-1414-141414141414'::uuid, 'Menú Mar y Tierra', 'Fusión mar y tierra', 'dinner', true, 1, '44444444-4444-4444-4444-444444444444'::uuid, '{}'::jsonb, now(), now()),
  ('15151515-1515-1515-1515-151515151515'::uuid, 'Menú Veggie', 'Platos 100% vegetales', 'dinner', true, 1, '66666666-6666-6666-6666-666666666666'::uuid, '{}'::jsonb, now(), now()),
  ('16161616-1616-1616-1616-161616161616'::uuid, 'Menú Degustación', 'Varios bocados para compartir', 'dinner', true, 1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, '{}'::jsonb, now(), now()),
  ('17171717-1717-1717-1717-171717171717'::uuid, 'Menú Familiar', 'Porciones para 4-6 personas', 'dinner', true, 1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, '{}'::jsonb, now(), now()),
  ('18181818-1818-1818-1818-181818181818'::uuid, 'Menú del Chef', 'Platos creados por el chef', 'dinner', true, 1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, '{}'::jsonb, now(), now()),
  ('19191919-1919-1919-1919-191919191919'::uuid, 'Menú Brunch', 'Desayuno tardío y brunch', 'brunch', true, 1, '88888888-8888-8888-8888-888888888888'::uuid, '{}'::jsonb, now(), now()),
  ('1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a'::uuid, 'Menú Tapas', 'Pequeños bocados para compartir', 'dinner', true, 1, '33333333-3333-3333-3333-333333333333'::uuid, '{}'::jsonb, now(), now()),
  ('1b1b1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b'::uuid, 'Menú Kids', 'Opciones para niños', 'lunch', true, 1, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  ('1c1c1c1c-1c1c-1c1c-1c1c-1c1c1c1c1c1c'::uuid, 'Menú Postres', 'Selección de postres', 'dessert', true, 1, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, '{}'::jsonb, now(), now()),
  ('1d1d1d1d-1d1d-1d1d-1d1d-1d1d1d1d1d1d'::uuid, 'Menú Saludable', 'Platos ligeros y saludables', 'lunch', true, 1, '66666666-6666-6666-6666-666666666666'::uuid, '{}'::jsonb, now(), now()),
  ('1e1e1e1e-1e1e-1e1e-1e1e-1e1e1e1e1e1e'::uuid, 'Menú Festivo', 'Platos especiales de temporada', 'dinner', true, 1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, '{}'::jsonb, now(), now()),
  ('1f1f1f1f-1f1f-1f1f-1f1f-1f1f1f1f1f1f'::uuid, 'Menú Económico', 'Opciones accesibles', 'lunch', true, 1, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  ('20202020-2020-2020-2020-202020202020'::uuid, 'Menú Vegetarianos', 'Platos sin carne', 'dinner', true, 1, '66666666-6666-6666-6666-666666666666'::uuid, '{}'::jsonb, now(), now()),
  ('21212121-2121-2121-2121-212121212121'::uuid, 'Menú Sin Gluten', 'Opciones sin gluten', 'dinner', true, 1, '33333333-3333-3333-3333-333333333333'::uuid, '{}'::jsonb, now(), now()),
  ('22222222-2222-2222-2222-222222222222'::uuid, 'Menú Rápido', 'Platos listos en menos de 15 min', 'lunch', true, 1, '55555555-5555-5555-5555-555555555555'::uuid, '{}'::jsonb, now(), now()),
  ('23232323-2323-2323-2323-232323232323'::uuid, 'Menú Degustación 2', 'Segundo menú de degustación', 'dinner', true, 1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, '{}'::jsonb, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Test rows (11)
INSERT INTO public.test_table (name, created_at) VALUES
  ('Prueba Supabase - seed 1', now()),
  ('Prueba Supabase - seed 2', now()),
  ('Prueba Supabase - seed 3', now()),
  ('Prueba Supabase - seed 4', now()),
  ('Prueba Supabase - seed 5', now()),
  ('Prueba Supabase - seed 6', now()),
  ('Prueba Supabase - seed 7', now()),
  ('Prueba Supabase - seed 8', now()),
  ('Prueba Supabase - seed 9', now()),
  ('Prueba Supabase - seed 10', now()),
  ('Prueba Supabase - seed 11', now())
ON CONFLICT DO NOTHING;

-- Ajustar secuencia de restaurants para evitar colisiones
SELECT setval('public.restaurants_id_seq', COALESCE((SELECT MAX(id) FROM public.restaurants), 1));

COMMIT;