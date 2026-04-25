import { supabase } from "./api";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("projects")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("projects")
    .getPublicUrl(fileName);

  return data.publicUrl;
};