/*
# Create lost_pets table (single-tenant, no auth)

1. New Tables
- `lost_pets`
  - `id` (uuid, primary key)
  - `photo_url` (text, optional - URL or path to the pet photo)
  - `species` (text, optional - e.g. Cachorro, Gato)
  - `size` (text, optional - e.g. Pequeno, Médio, Grande)
  - `color` (text, optional - main color of the animal)
  - `marks` (text, optional - distinctive marks/features)
  - `breed` (text, optional - breed of the animal)
  - `animal_name` (text, optional - name of the pet)
  - `region` (text, optional - approximate region where the pet was lost)
  - `lost_date` (text, optional - date the pet disappeared, format DD/MM/YYYY)
  - `lost_time` (text, optional - time the pet disappeared, format HH:MM)
  - `status` (text, not null, default 'lost' - status of the case: lost, found, reunited)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `lost_pets`.
- Grant CRUD to `anon` + `authenticated` so the Data API can reach the table.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (community lost-pet alerts, no sign-in required).

3. Notes
- This is a community app for reporting lost pets. No authentication is required.
- All data is public/shared - anyone can create and view lost pet reports.
- The `status` column defaults to 'lost' and can be updated to 'found' or 'reunited'.
*/

CREATE TABLE IF NOT EXISTS lost_pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_url text,
  species text,
  size text,
  color text,
  marks text,
  breed text,
  animal_name text,
  region text,
  lost_date text,
  lost_time text,
  status text NOT NULL DEFAULT 'lost',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lost_pets ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON lost_pets TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_lost_pets" ON lost_pets;
CREATE POLICY "anon_select_lost_pets" ON lost_pets FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_lost_pets" ON lost_pets;
CREATE POLICY "anon_insert_lost_pets" ON lost_pets FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_lost_pets" ON lost_pets;
CREATE POLICY "anon_update_lost_pets" ON lost_pets FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_lost_pets" ON lost_pets;
CREATE POLICY "anon_delete_lost_pets" ON lost_pets FOR DELETE
  TO anon, authenticated USING (true);