import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xzryhazxwabzkpajabam.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZgkbrSk4Vcs7BquS9M-v5g_JvcEiJK7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign in with Email & Password via Supabase Auth
export const supabaseSignIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Supabase authentication failed.' };
  }
};

// Sign up with Email & Password via Supabase Auth
export const supabaseSignUp = async (email, password, metadata = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: metadata
      }
    });
    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Supabase registration failed.' };
  }
};

// Sign out from Supabase Session
export const supabaseSignOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Supabase sign out error:', err.message);
  }
};

// Get Active Supabase Session
export const supabaseGetSession = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    return data?.session || null;
  } catch (err) {
    return null;
  }
};
