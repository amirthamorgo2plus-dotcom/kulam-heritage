-- Seed the venues (kalyana mandapams) table — Coimbatore.
-- Paste into the Supabase SQL editor AFTER running schema.sql. Safe to re-run.

insert into public.venues
  (id, name, area, district, lat, lng, capacity_min, capacity_max, plate_veg, plate_nonveg) values
  (1,  'Jenneys Residency',         'Peelamedu',      'Coimbatore', 11.0259, 77.0010, 10,   2250, 625,  820),
  (2,  'Hemambigai Marriage Hall',  'Eachanari',      'Coimbatore', 10.9333, 76.9667, 500,  750,  300,  400),
  (3,  'Sri Ayyapan Pooja Sangam',  'Ram Nagar',      'Coimbatore', 11.0027, 76.9706, 350,  600,  300,  null),
  (4,  'Le Meridien',               'Neelambur',      'Coimbatore', 11.0750, 77.1300, 14,   2700, 1200, 1400),
  (5,  'Shree Anandhaas',           'Vadavalli',      'Coimbatore', 11.0260, 76.8870, 100,  400,  400,  null),
  (6,  'Shree Aksshayam',           'Avarampalayam',  'Coimbatore', 11.0290, 76.9870, 200,  300,  350,  null),
  (7,  'Suguna Kalyana Mandapam',   'Peelamedu',      'Coimbatore', 11.0265, 77.0025, 800,  1200, 400,  null),
  (8,  'Selvam Mahaal',             'Eachanari',      'Coimbatore', 10.9340, 76.9680, 400,  1800, 350,  450),
  (9,  'Vijay Park Inn',            'Ram Nagar',      'Coimbatore', 11.0035, 76.9712, 30,   550,  300,  400),
  (10, 'Sree Annapoorna',           'Saibaba Colony', 'Coimbatore', 11.0230, 76.9450, 120,  200,  245,  null)
on conflict (id) do nothing;

-- Keep the auto-id sequence ahead of the seeded ids (so app inserts don't clash).
select setval(pg_get_serial_sequence('public.venues', 'id'), (select max(id) from public.venues));
