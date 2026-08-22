import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzryhazxwabzkpajabam.supabase.co';
const supabaseAnonKey = 'sb_publishable_ZgkbrSk4Vcs7BquS9M-v5g_JvcEiJK7';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSignUp() {
  console.log('--- Testing Supabase User Registration ---');
  const testEmail = `newuser_${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  console.log('Signing up with:', testEmail);

  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        name: 'New Test User'
      }
    }
  });

  if (error) {
    console.log('❌ ERROR CODE:', error.code);
    console.log('❌ ERROR MESSAGE:', error.message);
    console.log('❌ ERROR STATUS:', error.status);
  } else {
    console.log('✅ Supabase Signup Success!');
    console.log('User ID:', data.user?.id);
    console.log('User Email:', data.user?.email);
    console.log('Identities:', data.user?.identities);
  }
}

testSignUp();
