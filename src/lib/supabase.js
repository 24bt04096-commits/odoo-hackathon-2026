import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xzryhazxwabzkpajabam.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZgkbrSk4Vcs7BquS9M-v5g_JvcEiJK7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to sync authentication with Supabase
export const supabaseSignIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase sign-in fallback:', err.message);
    return { data: null, error: err };
  }
};

export const supabaseSignUp = async (email, password, metadata = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase sign-up fallback:', err.message);
    return { data: null, error: err };
  }
};
