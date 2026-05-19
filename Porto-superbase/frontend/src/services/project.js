import { supabase } from "./api";

// ================= GET =================
export const getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// ================= CREATE =================
export const createProject = async (payload) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([payload])
    .select();

  if (error) throw error;
  return data;
};

// ================= UPDATE =================
export const updateProject = async (id, payload) => {
  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

// ================= DELETE =================
export const deleteProject = async (id) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
};