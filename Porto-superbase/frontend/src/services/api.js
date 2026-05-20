import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Satu-satunya export dari api.js adalah supabase client
// Semua fungsi CRUD ada di services/project.js dan services/certif.js
export const supabase = createClient(supabaseUrl, supabaseKey)
