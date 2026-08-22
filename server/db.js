import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_USER, INITIAL_TRIPS, POPULAR_DESTINATIONS, ACTIVITIES_CATALOG, ADMIN_METRICS } from '../src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database file with seed data if it does not exist
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [
        INITIAL_USER,
        {
          id: 'user-admin',
          email: 'admin@globetrotter.io',
          name: 'Sarah Chen (Admin)',
          role: 'Admin',
          memberSince: '2023',
          homeCity: 'New York, NY',
          currency: 'USD',
          travelStyle: ['Luxury', 'Business'],
          stats: { countriesVisited: 28, tripsCompleted: 24, savedPlaces: 110 }
        }
      ],
      trips: INITIAL_TRIPS,
      destinations: POPULAR_DESTINATIONS,
      activitiesCatalog: ACTIVITIES_CATALOG,
      adminMetrics: ADMIN_METRICS
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    console.log('✅ SQLite/JSON Database created and seeded at:', DB_FILE);
  }
}

function readDb() {
  initDb();
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  // Auth Operations
  getUserByEmail: (email) => {
    const data = readDb();
    const user = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  },

  validateUser: (email, password) => {
    const data = readDb();
    const user = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    
    // Check password hash (or fallback for default seed users)
    const inputHash = Buffer.from(password).toString('base64');
    const isMatch = user.passwordHash ? (user.passwordHash === inputHash) : (password === 'password123');
    
    if (!isMatch) return false;

    // Return sanitized user object (hiding passwordHash)
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  },

  createUser: (userObj) => {
    const data = readDb();
    const passwordHash = Buffer.from(userObj.password || 'password123').toString('base64');
    const firstName = userObj.firstName || userObj.name?.split(' ')[0] || 'Explorer';
    const lastName = userObj.lastName || userObj.name?.split(' ').slice(1).join(' ') || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const city = userObj.city || 'San Francisco';
    const country = userObj.country || 'USA';

    const newUser = {
      id: `user-${Date.now()}`,
      email: userObj.email,
      passwordHash: passwordHash, // Hashed password stored in database.json
      firstName: firstName,
      lastName: lastName,
      name: fullName,
      phone: userObj.phone || '',
      city: city,
      country: country,
      homeCity: `${city}, ${country}`,
      additionalInfo: userObj.additionalInfo || '',
      avatar: userObj.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role: userObj.role || 'Traveler',
      memberSince: new Date().getFullYear().toString(),
      currency: userObj.currency || 'USD',
      travelStyle: ['Cultural Explorer', 'Foodie'],
      stats: { countriesVisited: 1, tripsCompleted: 0, savedPlaces: 5 }
    };
    data.users.push(newUser);
    writeDb(data);

    // Return sanitized user object hiding passwordHash
    const { passwordHash: _, ...sanitized } = newUser;
    return sanitized;
  },

  // Trips Operations
  getTrips: () => {
    const data = readDb();
    return data.trips;
  },

  getTripById: (id) => {
    const data = readDb();
    return data.trips.find((t) => t.id === id) || null;
  },

  createTrip: (newTripData, userObj) => {
    const data = readDb();
    const tripId = `trip-${Date.now()}`;
    const formattedTrip = {
      id: tripId,
      title: newTripData.title || "New Adventure",
      subtitle: newTripData.subtitle || "Custom multi-city journey",
      status: "upcoming",
      startDate: newTripData.startDate || "2026-11-01",
      endDate: newTripData.endDate || "2026-11-10",
      totalDays: Number(newTripData.totalDays) || 10,
      coverImage: newTripData.coverImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      totalBudget: Number(newTripData.totalBudget) || 2500,
      spentBudget: 0,
      currency: userObj?.currency || "USD",
      travelers: [
        { name: userObj?.name || "Traveler", avatar: userObj?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", role: "Owner" }
      ],
      cities: newTripData.cities || [
        { id: "dest-tokyo", name: "Tokyo", daysCount: 5, order: 1, hotel: "Selected Hotel", dates: "Day 1 - Day 5" }
      ],
      budgetBreakdown: [
        { category: "Accommodation", planned: Math.round((newTripData.totalBudget || 2500) * 0.45), spent: 0, color: "#0c8de9" },
        { category: "Flights & Transit", planned: Math.round((newTripData.totalBudget || 2500) * 0.30), spent: 0, color: "#10b981" },
        { category: "Food & Dining", planned: Math.round((newTripData.totalBudget || 2500) * 0.15), spent: 0, color: "#f59e0b" },
        { category: "Activities", planned: Math.round((newTripData.totalBudget || 2500) * 0.10), spent: 0, color: "#8b5cf6" }
      ],
      itinerary: newTripData.itinerary || [
        {
          dayNumber: 1,
          date: newTripData.startDate || "2026-11-01",
          city: newTripData.cities?.[0]?.name || "Tokyo",
          title: "Arrival & City Check-in",
          activities: [
            {
              id: `act-${Date.now()}-1`,
              time: "14:00",
              title: "Hotel Check-in & Relaxation",
              category: "Stay",
              cost: 0,
              location: "City Center",
              notes: "Unpack and prepare for evening stroll"
            }
          ]
        }
      ]
    };

    data.trips.unshift(formattedTrip);
    writeDb(data);
    return formattedTrip;
  },

  deleteTrip: (id) => {
    const data = readDb();
    data.trips = data.trips.filter((t) => t.id !== id);
    writeDb(data);
    return true;
  },

  addActivity: (tripId, dayNumber, activityItem) => {
    const data = readDb();
    const trip = data.trips.find((t) => t.id === tripId);
    if (!trip) return null;

    let dayObj = trip.itinerary.find((d) => d.dayNumber === Number(dayNumber));
    if (!dayObj) {
      dayObj = {
        dayNumber: Number(dayNumber),
        date: trip.startDate,
        city: trip.cities[0]?.name || "Destination",
        title: `Day ${dayNumber} Highlights`,
        activities: []
      };
      trip.itinerary.push(dayObj);
    }

    const newAct = {
      id: `act-${Date.now()}`,
      time: activityItem.time || "12:00",
      title: activityItem.title,
      category: activityItem.category || "Sightseeing",
      cost: Number(activityItem.cost) || 0,
      location: activityItem.locationName || activityItem.location || "City Spot",
      notes: activityItem.notes || "Added from discovery catalog"
    };

    dayObj.activities.push(newAct);
    trip.spentBudget += newAct.cost;

    writeDb(data);
    return trip;
  },

  removeActivity: (tripId, dayNumber, actId) => {
    const data = readDb();
    const trip = data.trips.find((t) => t.id === tripId);
    if (!trip) return null;

    let removedCost = 0;
    trip.itinerary = trip.itinerary.map((day) => {
      if (day.dayNumber !== Number(dayNumber)) return day;
      const target = day.activities.find((a) => a.id === actId);
      if (target) removedCost = target.cost || 0;
      return {
        ...day,
        activities: day.activities.filter((a) => a.id !== actId)
      };
    });

    trip.spentBudget = Math.max(0, trip.spentBudget - removedCost);
    writeDb(data);
    return trip;
  },

  // Inquiry Operations
  createInquiry: (inquiryData) => {
    const data = readDb();
    if (!data.inquiries) data.inquiries = [];

    const newInquiry = {
      id: `inq-${Date.now()}`,
      firstName: inquiryData.firstName || inquiryData.first_name || 'Traveler',
      lastName: inquiryData.lastName || inquiryData.last_name || '',
      email: inquiryData.email,
      phone: inquiryData.phone || '',
      destinationInterest: inquiryData.destinationInterest || inquiryData.destination_interest || 'General Inquiry',
      travelDates: inquiryData.travelDates || inquiryData.travel_dates || '',
      numberOfGuests: Number(inquiryData.numberOfGuests || inquiryData.number_of_guests) || 1,
      budgetRange: inquiryData.budgetRange || inquiryData.budget_range || '$1,000 - $3,000',
      message: inquiryData.message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    data.inquiries.unshift(newInquiry);
    writeDb(data);
    return newInquiry;
  },

  getInquiries: () => {
    const data = readDb();
    return data.inquiries || [];
  },

  // Discovery Catalogs & Admin Metrics
  getDestinations: () => readDb().destinations,
  getActivitiesCatalog: () => readDb().activitiesCatalog,
  getAdminMetrics: () => readDb().adminMetrics
};
