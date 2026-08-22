import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzryhazxwabzkpajabam.supabase.co';
const supabaseAnonKey = 'sb_publishable_ZgkbrSk4Vcs7BquS9M-v5g_JvcEiJK7';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log('--- Testing Supabase Connection ---');
  
  // 1. Test Inquiries Table Read
  try {
    const { data: inquiries, error: inqError } = await supabase.from('inquiries').select('*');
    if (inqError) {
      console.error('❌ Inquiries Table Error:', inqError.message);
    } else {
      console.log('✅ Inquiries Table Connected Successfully! Found', inquiries.length, 'records.');
    }
  } catch (err) {
    console.error('❌ Exception querying inquiries table:', err.message);
  }

  // 2. Test Inserting a Test Inquiry into Supabase
  try {
    const testPayload = {
      first_name: 'Test',
      last_name: 'Explorer',
      email: 'test.explorer@globetrotter.io',
      phone: '+1 555-0199',
      destination_interest: 'Swiss Alps & Tokyo',
      travel_dates: '2026-10-15 to 2026-10-25',
      number_of_guests: 2,
      budget_range: '$3,000 - $5,000',
      message: 'Automated verification test inquiry for Supabase database validation.',
      status: 'new'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('inquiries')
      .insert([testPayload])
      .select();

    if (insertError) {
      console.error('❌ Supabase Inquiry Insert Error:', insertError.message);
    } else {
      console.log('🎉 Successfully inserted test inquiry record into Supabase inquiries table!');
      console.log('Inserted Record ID:', insertData?.[0]?.id);
    }
  } catch (err) {
    console.error('❌ Exception inserting inquiry:', err.message);
  }

  // 3. Test Auth Users check
  try {
    const { data: authSession, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('❌ Supabase Auth Error:', authError.message);
    } else {
      console.log('✅ Supabase Auth Endpoint active! Session check response ok.');
    }
  } catch (err) {
    console.error('❌ Exception checking Auth:', err.message);
  }
}

testSupabase();
