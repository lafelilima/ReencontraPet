/*
# Add address column to lost_pets

1. Changes
- Add `address` column (text, nullable) to `lost_pets` table
- Stores the full address where the pet was lost or found
- The address is kept private and only used internally; the public-facing region field remains separate

2. Notes
- Non-destructive: adds a nullable column, no existing data is affected
- RLS policies and grants remain unchanged (they already cover all columns)
*/

ALTER TABLE lost_pets ADD COLUMN IF NOT EXISTS address text;