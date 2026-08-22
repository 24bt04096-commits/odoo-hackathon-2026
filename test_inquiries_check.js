import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzryhazxwabzkpajabam.supabase.co';
const supabaseAnonKey = 'sb_publishable_ZgkbrSk4Vcs7BquS9M-v5g_JvcEiJK7';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInquiries() {
  console.log('=== Checking Supabase inquiries table ===');

  // 1. Select all
  const { data: rows, error: selectErr } = await supabase
    .from('inquiries')
    .select('*');

  console.log('Select Error:', selectErr);
  console.log('Total Rows in inquiries table:', rows?.length || 0);
  console.log('Rows Data:', rows);

  // 2. Test insert
  const payload = {
    first_name: 'Testing',
    last_name: 'Inquiry',
    email: 'test.inquiry@globetrotter.io',
    phone: '+1 555-0199',
    destination_interest: 'Tokyo & Kyoto',
    travel_dates: '2026-10-01 to 2026-10-15',
    number_of_guests: 2,
    budget_range: '$2,500 - $5,000',
    message: 'I want to submit an inquiry from the app!',
    status: 'new'
  };

  const { data: insertedRow, error: insertErr } = await supabase
    .from('inquiries')
    .insert([payload])
    .select();

  console.log('Insert Error:', insertErr);
  console.log('Inserted Row:', insertedRow);
}

testInquiries();
