/*
# Update lost_pets status values to Portuguese

1. Changes
- Update default status from 'lost' to 'perdido'
- Add CHECK constraint: status must be 'perdido', 'encontrado', or 'reencontrado'
- Update any existing rows with 'lost' status to 'perdido'

2. Notes
- The app uses Portuguese status values: perdido (lost), encontrado (found), reencontrado (reunited)
- No data loss: existing rows are updated to the new Portuguese value
- The CHECK constraint ensures only valid status values can be inserted
*/

UPDATE lost_pets SET status = 'perdido' WHERE status = 'lost';

ALTER TABLE lost_pets ALTER COLUMN status SET DEFAULT 'perdido';

ALTER TABLE lost_pets DROP CONSTRAINT IF EXISTS lost_pets_status_check;
ALTER TABLE lost_pets ADD CONSTRAINT lost_pets_status_check
  CHECK (status IN ('perdido', 'encontrado', 'reencontrado'));