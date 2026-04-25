import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// === PROJECT ===
export const getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

// CREATE
export const createProject = async (payload) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([payload])

  if (error) throw error
  return data
}

// UPDATE
export const updateProject = async (id, payload) => {
  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)

  if (error) throw error
  return data
}

// DELETE
export const deleteProject = async (id) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)

  if (error) throw error
}