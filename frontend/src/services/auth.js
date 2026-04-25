import { supabase } from "./api"

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error) throw error
  return data.user
}

export const logout = async () => {
  await supabase.auth.signOut()
}

export const signInAnon = async () => {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data;
};