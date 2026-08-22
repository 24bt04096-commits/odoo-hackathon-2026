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

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'No account found with this email. Please click "Need an account?" to Sign Up first!' 
    });
  }

  res.json({ success: true, user, token: `token-${Date.now()}` });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ 
      success: false, 
      error: 'An account with this email already exists. Please Sign In instead!' 
    });
  }

  const newUser = db.createUser({ name, email });
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

app.listen(PORT, () => {
  console.log(`🚀 GlobeTrotter Database REST API running at http://localhost:${PORT}`);
});
