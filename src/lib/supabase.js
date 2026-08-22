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

// Send Password Reset Email via Supabase Auth
export const supabaseResetPassword = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to send password reset request.' };
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

// Submit Inquiry directly to Supabase inquiries table
export const supabaseSubmitInquiry = async (inquiryData) => {
  try {
    const payload = {
      first_name: inquiryData.firstName || inquiryData.first_name || 'Traveler',
      last_name: inquiryData.lastName || inquiryData.last_name || '',
      email: inquiryData.email,
      phone: inquiryData.phone || '',
      destination_interest: inquiryData.destinationInterest || inquiryData.destination_interest || 'General Inquiry',
      travel_dates: inquiryData.travelDates || inquiryData.travel_dates || '',
      number_of_guests: Number(inquiryData.numberOfGuests || inquiryData.number_of_guests) || 1,
      budget_range: inquiryData.budgetRange || inquiryData.budget_range || '$1,000 - $3,000',
      message: inquiryData.message,
      status: 'new'
    };

    const { data, error } = await supabase.from('inquiries').insert([payload]).select();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: data?.[0] };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to submit inquiry to Supabase.' };
  }
};

// Fetch Inquiries directly from Supabase inquiries table
export const supabaseGetInquiries = async () => {
  try {
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (error) {
      return { success: false, error: error.message, data: [] };
    }
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message, data: [] };
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
