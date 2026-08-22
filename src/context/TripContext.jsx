import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, INITIAL_TRIPS, POPULAR_DESTINATIONS, ACTIVITIES_CATALOG, ADMIN_METRICS } from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000/api';
const TripContext = createContext();

export const TripProvider = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('globetrotter_auth');
    return savedAuth !== null ? savedAuth === 'true' : false;
  });

  // User Profile
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('globetrotter_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Current Screen
  const [currentScreen, setCurrentScreen] = useState(() => {
    const savedAuth = localStorage.getItem('globetrotter_auth');
    return savedAuth === 'true' ? 'dashboard' : 'auth';
  });

  // Trips & Catalog State
  const [trips, setTrips] = useState(INITIAL_TRIPS);
  const [destinations, setDestinations] = useState(POPULAR_DESTINATIONS);
  const [activitiesCatalog, setActivitiesCatalog] = useState(ACTIVITIES_CATALOG);
  const [adminMetrics, setAdminMetrics] = useState(ADMIN_METRICS);

  // Active Selected Trip
  const [activeTripId, setActiveTripId] = useState("trip-japan-2026");

  // Toast Notifications System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch initial data from Backend REST API
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [tripsRes, destRes, actRes, adminRes] = await Promise.all([
          fetch(`${API_BASE_URL}/trips`),
          fetch(`${API_BASE_URL}/destinations`),
          fetch(`${API_BASE_URL}/activities`),
          fetch(`${API_BASE_URL}/admin/metrics`)
        ]);

        if (tripsRes.ok) {
          const tripsData = await tripsRes.json();
          if (tripsData.trips && tripsData.trips.length > 0) setTrips(tripsData.trips);
        }

        if (destRes.ok) {
          const destData = await destRes.json();
          if (destData.destinations) setDestinations(destData.destinations);
        }

        if (actRes.ok) {
          const actData = await actRes.json();
          if (actData.activities) setActivitiesCatalog(actData.activities);
        }

        if (adminRes.ok) {
          const adminData = await adminRes.json();
          if (adminData.metrics) setAdminMetrics(adminData.metrics);
        }
      } catch (err) {
        console.warn("⚠️ API Backend offline, falling back to client storage:", err.message);
      }
    };

    fetchBackendData();
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('globetrotter_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('globetrotter_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  // Auth API Handlers
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!data.success || !data.user) {
        return { success: false, error: data.error || 'Authentication failed' };
      }

      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('globetrotter_auth', 'true');
      addToast(`Welcome back, ${data.user.name}!`, 'success');
      setCurrentScreen(data.user.role === 'Admin' ? 'admin' : 'dashboard');
      return { success: true, user: data.user };
    } catch (e) {
      console.warn("⚠️ Authentication server offline. Logging in via client storage fallback.");
      const fallbackUser = {
        name: email.split('@')[0]?.replace('.', ' ') || 'Traveler',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        role: email.includes('admin') ? 'Admin' : 'Traveler',
        memberSince: '2024',
        homeCity: 'San Francisco, CA',
        currency: 'USD',
        travelStyle: ['Cultural Explorer'],
        stats: { countriesVisited: 12, tripsCompleted: 8, savedPlaces: 40 }
      };

      setUser(fallbackUser);
      setIsAuthenticated(true);
      localStorage.setItem('globetrotter_auth', 'true');
      addToast(`Logged in successfully! (Local Mode)`, 'info');
      setCurrentScreen(fallbackUser.role === 'Admin' ? 'admin' : 'dashboard');
      return { success: true, user: fallbackUser };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (!data.success || !data.user) {
        return { success: false, error: data.error || 'Signup failed' };
      }

      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('globetrotter_auth', 'true');
      addToast(`Account created successfully! Welcome, ${data.user.name}!`, 'success');
      setCurrentScreen('dashboard');
      return { success: true, user: data.user };
    } catch (e) {
      console.warn("⚠️ Authentication server offline. Creating account via client storage fallback.");
      const fallbackUser = {
        name: name || 'New Traveler',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        role: 'Traveler',
        memberSince: '2026',
        homeCity: 'New Destination',
        currency: 'USD',
        travelStyle: ['Explorer'],
        stats: { countriesVisited: 1, tripsCompleted: 0, savedPlaces: 5 }
      };

      setUser(fallbackUser);
      setIsAuthenticated(true);
      localStorage.setItem('globetrotter_auth', 'true');
      addToast(`Welcome, ${fallbackUser.name}! Account created!`, 'success');
      setCurrentScreen('dashboard');
      return { success: true, user: fallbackUser };
    }
  };

  const loginDemoUser = (demoUserObj) => {
    setUser(demoUserObj);
    setIsAuthenticated(true);
    localStorage.setItem('globetrotter_auth', 'true');
    addToast(`Logged in as ${demoUserObj.name}!`, 'success');
    setCurrentScreen(demoUserObj.role === 'Admin' ? 'admin' : 'dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('globetrotter_auth', 'false');
    setCurrentScreen('auth');
    addToast('You have been logged out.', 'info');
  };

  // Derived Active Trip Object
  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0] || null;

  // Active Currency Formatter
  const formatCurrency = (amount, currencyCode = user?.currency || 'USD') => {
    const symbolMap = { USD: '$', EUR: '€', JPY: '¥', GBP: '£', INR: '₹' };
    const symbol = symbolMap[currencyCode] || '$';
    return `${symbol}${amount ? amount.toLocaleString() : '0'}`;
  };

  // Trip API Operations
  const createTrip = async (newTripData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripData: newTripData, user })
      });
      const data = await res.json();
      if (data.trip) {
        setTrips((prev) => [data.trip, ...prev]);
        setActiveTripId(data.trip.id);
        addToast(`Successfully created "${data.trip.title}"!`, 'success');
        setCurrentScreen('itinerary-builder');
        return;
      }
    } catch (e) {
      console.warn("Using fallback local createTrip:", e.message);
    }

    // Fallback Client Creation
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
      currency: user?.currency || "USD",
      travelers: [
        { name: user?.name || "Traveler", avatar: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80", role: "Owner" }
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

    setTrips((prev) => [formattedTrip, ...prev]);
    setActiveTripId(tripId);
    addToast(`Successfully created "${formattedTrip.title}"!`, 'success');
    setCurrentScreen('itinerary-builder');
  };

  const deleteTrip = async (tripId) => {
    try {
      await fetch(`${API_BASE_URL}/trips/${tripId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn("Delete trip API warning:", e.message);
    }
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
    addToast("Trip deleted from database", "info");
    if (activeTripId === tripId) {
      const remaining = trips.filter((t) => t.id !== tripId);
      if (remaining.length > 0) setActiveTripId(remaining[0].id);
    }
  };

  const addActivityToTrip = async (tripId, dayNumber, activityItem) => {
    try {
      const res = await fetch(`${API_BASE_URL}/trips/${tripId}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayNumber, activity: activityItem })
      });
      const data = await res.json();
      if (data.trip) {
        setTrips((prev) => prev.map((t) => (t.id === tripId ? data.trip : t)));
        addToast(`Added "${activityItem.title}" to Day ${dayNumber}!`, 'success');
        return;
      }
    } catch (e) {
      console.warn("Add activity API warning:", e.message);
    }

    // Fallback Client Update
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const updatedItinerary = [...t.itinerary];
        let dayObj = updatedItinerary.find((d) => d.dayNumber === dayNumber);
        
        if (!dayObj) {
          dayObj = {
            dayNumber: dayNumber,
            date: t.startDate,
            city: t.cities[0]?.name || "Destination",
            title: `Day ${dayNumber} Highlights`,
            activities: []
          };
          updatedItinerary.push(dayObj);
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

        return {
          ...t,
          spentBudget: t.spentBudget + newAct.cost,
          itinerary: updatedItinerary
        };
      })
    );
    addToast(`Added "${activityItem.title}" to Day ${dayNumber}!`, 'success');
  };

  const removeActivityFromTrip = async (tripId, dayNumber, actId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/trips/${tripId}/activities/${dayNumber}/${actId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.trip) {
        setTrips((prev) => prev.map((t) => (t.id === tripId ? data.trip : t)));
        addToast("Activity removed from itinerary", "info");
        return;
      }
    } catch (e) {
      console.warn("Remove activity API warning:", e.message);
    }

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        let removedCost = 0;
        const updatedItinerary = t.itinerary.map((day) => {
          if (day.dayNumber !== dayNumber) return day;
          const target = day.activities.find((a) => a.id === actId);
          if (target) removedCost = target.cost || 0;
          return {
            ...day,
            activities: day.activities.filter((a) => a.id !== actId)
          };
        });

        return {
          ...t,
          spentBudget: Math.max(0, t.spentBudget - removedCost),
          itinerary: updatedItinerary
        };
      })
    );
    addToast("Activity removed from itinerary", "info");
  };

  return (
    <TripContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        signup,
        loginDemoUser,
        logout,
        trips,
        activeTripId,
        setActiveTripId,
        activeTrip,
        destinations,
        activitiesCatalog,
        adminMetrics,
        toasts,
        addToast,
        removeToast,
        formatCurrency,
        createTrip,
        deleteTrip,
        addActivityToTrip,
        removeActivityFromTrip
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => useContext(TripContext);
