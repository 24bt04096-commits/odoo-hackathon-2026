import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
});

// Authentication Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  const existing = db.getUserByEmail(email);
  if (!existing) {
    return res.status(404).json({ 
      success: false, 
      error: 'No account found with this email. Please click "Need an account?" to Sign Up first!' 
    });
  }

  const user = db.validateUser(email, password);
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      error: 'Incorrect password. Please verify your credentials and try again.' 
    });
  }

  res.json({ success: true, user, token: `token-${Date.now()}` });
});

app.post('/api/auth/signup', (req, res) => {
  const { firstName, lastName, email, phone, city, country, additionalInfo, avatar, password } = req.body;
  if (!email || !password || (!firstName && !req.body.name)) {
    return res.status(400).json({ success: false, error: 'First Name, Email Address, and Password are required' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ 
      success: false, 
      error: 'An account with this email already exists. Please Sign In instead!' 
    });
  }

  const newUser = db.createUser({
    firstName,
    lastName,
    name: req.body.name || `${firstName || ''} ${lastName || ''}`.trim(),
    email,
    phone,
    city,
    country,
    additionalInfo,
    avatar,
    password
  });
  res.status(201).json({ success: true, user: newUser, token: `token-${Date.now()}` });
});

// Trips Endpoints
app.get('/api/trips', (req, res) => {
  const trips = db.getTrips();
  res.json({ success: true, trips });
});

app.get('/api/trips/:id', (req, res) => {
  const trip = db.getTripById(req.params.id);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json({ success: true, trip });
});

app.post('/api/trips', (req, res) => {
  const { tripData, user } = req.body;
  const newTrip = db.createTrip(tripData || req.body, user);
  res.status(201).json({ success: true, trip: newTrip });
});

app.delete('/api/trips/:id', (req, res) => {
  const success = db.deleteTrip(req.params.id);
  res.json({ success });
});

app.post('/api/trips/:id/activities', (req, res) => {
  const { dayNumber, activity } = req.body;
  if (!dayNumber || !activity) {
    return res.status(400).json({ error: 'dayNumber and activity are required' });
  }

  const updatedTrip = db.addActivity(req.params.id, dayNumber, activity);
  if (!updatedTrip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  res.json({ success: true, trip: updatedTrip });
});

app.delete('/api/trips/:id/activities/:dayNumber/:actId', (req, res) => {
  const { id, dayNumber, actId } = req.params;
  const updatedTrip = db.removeActivity(id, dayNumber, actId);
  if (!updatedTrip) {
    return res.status(404).json({ error: 'Trip or activity not found' });
  }

  res.json({ success: true, trip: updatedTrip });
});

// Discovery Catalog Endpoints
app.get('/api/destinations', (req, res) => {
  res.json({ success: true, destinations: db.getDestinations() });
});

app.get('/api/activities', (req, res) => {
  res.json({ success: true, activities: db.getActivitiesCatalog() });
});

// Admin Metrics Endpoint
app.get('/api/admin/metrics', (req, res) => {
  res.json({ success: true, metrics: db.getAdminMetrics() });
});

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://xzryhazxwabzkpajabam.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZgkbrSk4Vcs7BquS9M-v5g_JvcEiJK7';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Inquiry Form Submissions Endpoints
app.get('/api/inquiries', async (req, res) => {
  try {
    const { data: supaInquiries, error: supaErr } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!supaErr && supaInquiries) {
      return res.json({ success: true, inquiries: supaInquiries });
    }

    const inquiries = db.getInquiries();
    res.json({ success: true, inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/inquiries', async (req, res) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email and message are required fields' });
  }

  try {
    const newInquiry = db.createInquiry(req.body);

    // Save to Supabase public.inquiries table
    try {
      const payload = {
        first_name: req.body.firstName || req.body.first_name || 'Traveler',
        last_name: req.body.lastName || req.body.last_name || '',
        email: email,
        phone: req.body.phone || '',
        destination_interest: req.body.destinationInterest || req.body.destination_interest || 'General Inquiry',
        travel_dates: req.body.travelDates || req.body.travel_dates || '',
        number_of_guests: Number(req.body.numberOfGuests || req.body.number_of_guests) || 1,
        budget_range: req.body.budgetRange || req.body.budget_range || '$1,000 - $3,000',
        message: message,
        status: 'new'
      };
      await supabase.from('inquiries').insert([payload]);
      console.log('✅ Inquiry saved to Supabase public.inquiries table!');
    } catch (supaErr) {
      console.warn('Supabase inquiry insert notice:', supaErr.message);
    }

    res.json({ success: true, inquiry: newInquiry, message: 'Inquiry submitted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GlobeTrotter Database REST API running at http://localhost:${PORT}`);
});
