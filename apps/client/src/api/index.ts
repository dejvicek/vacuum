import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const { VITE_SUPABASE_PROJECT_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

if (!VITE_SUPABASE_PROJECT_URL)
  throw new Error('Missing configuration of "VITE_SUPABASE_PROJECT_URL"');

export const client = createClient<Database>(
  VITE_SUPABASE_PROJECT_URL,
  VITE_SUPABASE_ANON_KEY!
);
