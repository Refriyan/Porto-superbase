import { supabase } from "./api";

export const getCertif = async () => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET CERT ERROR:", error);
    throw error;
  }

  return data;
};

export const createCertif = async (payload) => {
  const { data, error } = await supabase
    .from("certificates")
    .insert([payload])
    .select();

  if (error) {
    console.error("CREATE CERT ERROR:", error);
    throw error;
  }

  return data;
};

export const deleteCertif = async (id) => {
  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE CERT ERROR:", error);
    throw error;
  }
};

export const updateCertif = async (id, payload) => {
  const { data, error } = await supabase
    .from("certificates")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};