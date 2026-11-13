import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LostPet = {
  id: string;
  photo_url: string | null;
  species: string | null;
  size: string | null;
  color: string | null;
  marks: string | null;
  breed: string | null;
  animal_name: string | null;
  region: string | null;
  lost_date: string | null;
  lost_time: string | null;
  status: string;
  created_at: string;
};
