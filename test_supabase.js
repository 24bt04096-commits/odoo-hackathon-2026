import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzryhazxwabzkpajabam.supabase.co';
const supabaseAnonKey = 'sb_publishable_ZgkbrSk4Vcs7BquS9M-v5g_JvcEiJK7';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testWithAuth() {
  console.log('--- Testing Supabase Insert & Read ---');
  
  // 1. Insert row
  const testPayload = {
    first_name: 'Gaurang',
    last_name: 'Gothi',
    email: '24bt04035@gsfcuniversity.ac.in',
    phone: '+91 9876543210',
    destination_interest: 'Paris & Swiss Alps',
    travel_dates: '2026-12-01 to 2026-12-10',
    number_of_guests: 2,
    budget_range: '$3,000 - $5,000',
    message: 'Hello, I want to book a custom trip to Paris!',
    status: 'new'
  };

  const { data: insertResult, error: insertError } = await supabase
    .from('inquiries')
    .insert([testPayload])
    .select();

  console.log('Insert Result:', insertResult);
  console.log('Insert Error:', insertError);

  // 2. Read rows
  const { data: rows, error: selectErr } = await supabase
    .from('inquiries')
    .select('*');

  console.log('Total Rows in inquiries table:', rows?.length || 0);
  console.log('Rows:', rows);
  console.log('Select Error:', selectErr);
}

testWithAuth();
