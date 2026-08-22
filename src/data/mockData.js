// GlobeTrotter Seed & Mock Data Store

export const INITIAL_USER = {
  name: "Alex Rivera",
  email: "alex.rivera@globetrotter.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  memberSince: "March 2024",
  homeCity: "San Francisco, USA",
  currency: "USD",
  currencySymbol: "$",
  travelStyle: ["Cultural Explorer", "Foodie", "Slow Travel"],
  bio: "Passionate photographer and digital nomad exploring hidden gems and local culinary spots worldwide.",
  stats: {
    countriesVisited: 24,
    tripsCompleted: 18,
    totalMiles: 48500,
    savedPlaces: 42
  },
  preferences: {
    emailNotifications: true,
    budgetAlerts: true,
    publicProfile: true,
    theme: "light"
  }
};

export const POPULAR_DESTINATIONS = [
  {
    id: "dest-tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "East Asia",
    tagline: "Ultra-modern innovation meets ancient traditions",
    description: "Experience the vibrant energy of Shibuya Crossing, peaceful traditional shrines, world-class sushi, and neon-lit nightscapes.",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 1420,
    avgDailyCost: 165,
    currency: "JPY",
    bestSeason: "Mar - May & Sep - Nov",
    travelStyle: ["Culture", "Food", "Technology", "Shopping"],
    topSpots: ["Shinjuku Gyoen", "Senso-ji Temple", "Shibuya Sky", "Akihabara"],
    lat: 35.6762,
    lng: 139.6503
  },
  {
    id: "dest-kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    tagline: "Serene bamboo groves & historic geisha districts",
    description: "Japan's cultural heart filled with thousands of classical Buddhist temples, traditional wooden houses, and serene gardens.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 980,
    avgDailyCost: 140,
    currency: "JPY",
    bestSeason: "Spring & Autumn",
    travelStyle: ["Culture", "History", "Nature", "Photography"],
    topSpots: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kinkaku-ji", "Gion"],
    lat: 35.0116,
    lng: 135.7681
  },
  {
    id: "dest-paris",
    name: "Paris",
    country: "France",
    region: "Western Europe",
    tagline: "The City of Light, romance, and timeless art",
    description: "Iconic architecture, world-renowned museums, Parisian café culture, and haute cuisine along the Seine.",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: 4.85,
    reviewsCount: 2310,
    avgDailyCost: 195,
    currency: "EUR",
    bestSeason: "Apr - Jun & Sep - Nov",
    travelStyle: ["Romance", "Art", "Food", "Architecture"],
    topSpots: ["Eiffel Tower", "Louvre Museum", "Montmartre", "Musée d'Orsay"],
    lat: 48.8566,
    lng: 2.3522
  },
  {
    id: "dest-amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Southern Europe",
    tagline: "Cliffside villages cascading into turquoise Mediterranean waters",
    description: "Dramatic coastlines, pastel villas, lemon groves, and incredible seafood dining over cliffside terraces.",
    heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 850,
    avgDailyCost: 220,
    currency: "EUR",
    bestSeason: "May - Sep",
    travelStyle: ["Luxury", "Coastal", "Food", "Relaxation"],
    topSpots: ["Positano", "Ravello Villa Cimbrone", "Path of the Gods", "Capri Boat Excursion"],
    lat: 40.634,
    lng: 14.6027
  },
  {
    id: "dest-bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    tagline: "Tropical spiritual paradise with terraced rice fields",
    description: "Lush tropical rainforests, surf-worthy beaches, holistic wellness retreats, and vibrant Balinese culture.",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 1740,
    avgDailyCost: 85,
    currency: "IDR",
    bestSeason: "Apr - Oct",
    travelStyle: ["Wellness", "Nature", "Adventure", "Budget-Friendly"],
    topSpots: ["Tegallalang Rice Terraces", "Uluwatu Temple", "Ubud Monkey Forest", "Nusa Penida"],
    lat: -8.4095,
    lng: 115.1889
  },
  {
    id: "dest-reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    region: "Northern Europe",
    tagline: "Land of fire & ice, waterfalls and Northern Lights",
    description: "Magical landscapes featuring geothermal hot springs, volcanic glaciers, dramatic waterfalls, and aurora borealis views.",
    heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 1120,
    avgDailyCost: 240,
    currency: "ISK",
    bestSeason: "Sep - Apr (Auroras) or Jun - Aug (Midnight Sun)",
    travelStyle: ["Nature", "Adventure", "Road Trip", "Photography"],
    topSpots: ["Blue Lagoon", "Golden Circle", "Skógafoss Waterfall", "Black Sand Beach"],
    lat: 64.1466,
    lng: -21.9426
  }
];

export const ACTIVITIES_CATALOG = [
  {
    id: "act-tokyo-1",
    cityId: "dest-tokyo",
    cityName: "Tokyo",
    title: "Shibuya Sky Sunset & Citylights View",
    category: "Sightseeing",
    durationHours: 2,
    cost: 18,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80",
    description: "360-degree open-air rooftop observation deck providing breathtaking views over Tokyo and Mount Fuji.",
    locationName: "Shibuya Scramble Square",
    recommendedTimeSlot: "17:00 - 19:00"
  },
  {
    id: "act-tokyo-2",
    cityId: "dest-tokyo",
    cityName: "Tokyo",
    title: "Tsukiji Outer Market Food & Omakase Tour",
    category: "Food & Drink",
    durationHours: 3.5,
    cost: 75,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    description: "Guided morning walk tasting fresh tamagoyaki, wagyu skewers, sea urchin, and authentic sushi.",
    locationName: "Tsukiji Outer Market",
    recommendedTimeSlot: "09:00 - 12:30"
  },
  {
    id: "act-kyoto-1",
    cityId: "dest-kyoto",
    cityName: "Kyoto",
    title: "Fushimi Inari Early Morning Torii Gate Hike",
    category: "Nature & Hiking",
    durationHours: 3,
    cost: 0,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    description: "Be the first to hike through thousands of vermilion torii gates stretching up Mount Inari before crowds arrive.",
    locationName: "Fushimi Inari Taisha",
    recommendedTimeSlot: "06:30 - 09:30"
  },
  {
    id: "act-kyoto-2",
    cityId: "dest-kyoto",
    cityName: "Kyoto",
    title: "Traditional Tea Ceremony & Kimono Experience",
    category: "Culture",
    durationHours: 2.5,
    cost: 55,
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=600&q=80",
    description: "Dress in authentic silk kimono and learn the art of matcha preparation with a master tea host in Gion.",
    locationName: "Gion District",
    recommendedTimeSlot: "14:00 - 16:30"
  },
  {
    id: "act-paris-1",
    cityId: "dest-paris",
    cityName: "Paris",
    title: "Skip-the-Line Louvre Museum Masterpieces Tour",
    category: "Culture",
    durationHours: 3,
    cost: 65,
    rating: 4.89,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
    description: "Expert guided walkthrough seeing the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace.",
    locationName: "Louvre Museum",
    recommendedTimeSlot: "10:00 - 13:00"
  },
  {
    id: "act-paris-2",
    cityId: "dest-paris",
    cityName: "Paris",
    title: "Sunset Seine River Cruise with Champagne",
    category: "Relaxation",
    durationHours: 1.5,
    cost: 42,
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    description: "Glide past illuminated landmarks including Notre-Dame, Grand Palais, and the sparkling Eiffel Tower.",
    locationName: "Pont Neuf",
    recommendedTimeSlot: "19:30 - 21:00"
  }
];

export const INITIAL_TRIPS = [
  {
    id: "trip-japan-2026",
    title: "Grand Japan Odyssey: Tokyo & Kyoto",
    subtitle: "Modern metropolis & ancient zen sanctuaries",
    status: "upcoming", // upcoming, active, draft, completed
    startDate: "2026-10-10",
    endDate: "2026-10-20",
    totalDays: 10,
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    totalBudget: 3500,
    spentBudget: 2150,
    currency: "USD",
    travelers: [
      { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", role: "Owner" },
      { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", role: "Editor" }
    ],
    cities: [
      { id: "dest-tokyo", name: "Tokyo", daysCount: 5, order: 1, hotel: "TRUNK Hotel Shibuya", dates: "Oct 10 - Oct 15" },
      { id: "dest-kyoto", name: "Kyoto", daysCount: 5, order: 2, hotel: "Sowaka Ryokan Gion", dates: "Oct 15 - Oct 20" }
    ],
    budgetBreakdown: [
      { category: "Accommodation", planned: 1600, spent: 1200, color: "#0c8de9" },
      { category: "Flights & Shinkansen", planned: 1100, spent: 650, color: "#10b981" },
      { category: "Food & Omakase", planned: 500, spent: 220, color: "#f59e0b" },
      { category: "Activities & Passes", planned: 300, spent: 80, color: "#8b5cf6" }
    ],
    itinerary: [
      {
        dayNumber: 1,
        date: "2026-10-10",
        city: "Tokyo",
        title: "Arrival in Shibuya & Sunset Skylines",
        activities: [
          {
            id: "act-101",
            time: "14:00",
            title: "Hotel Check-in at TRUNK Hotel Shibuya",
            category: "Stay",
            cost: 0,
            location: "Shibuya",
            notes: "Confirmation #TK-99201"
          },
          {
            id: "act-102",
            time: "17:00",
            title: "Shibuya Sky Sunset Observation Deck",
            category: "Sightseeing",
            cost: 18,
            location: "Shibuya Scramble Square",
            notes: "Tickets booked for 17:15 slot"
          },
          {
            id: "act-103",
            time: "19:30",
            title: "Dinner at Ichiran Ramen Shibuya",
            category: "Food & Drink",
            cost: 15,
            location: "Shibuya Crossing",
            notes: "Solo booth ramen experience"
          }
        ]
      },
      {
        dayNumber: 2,
        date: "2026-10-11",
        city: "Tokyo",
        title: "Old & New Tokyo: Asakusa & Akihabara",
        activities: [
          {
            id: "act-104",
            time: "09:00",
            title: "Senso-ji Temple & Nakamise Street",
            category: "Culture",
            cost: 0,
            location: "Asakusa",
            notes: "Try fresh melonpan bakery"
          },
          {
            id: "act-105",
            time: "14:00",
            title: "Akihabara Gaming & Vintage Tech Exploration",
            category: "Shopping",
            cost: 45,
            location: "Akihabara Electric Town",
            notes: "Visit Super Potato for retro games"
          }
        ]
      },
      {
        dayNumber: 6,
        date: "2026-10-15",
        city: "Kyoto",
        title: "Bullet Train to Kyoto & Gion Sunset",
        activities: [
          {
            id: "act-106",
            time: "09:30",
            title: "Shinkansen Nozomi (Tokyo Station -> Kyoto Station)",
            category: "Transport",
            cost: 95,
            location: "Tokyo Station",
            notes: "Reserved Mt. Fuji view seats E on right side"
          },
          {
            id: "act-107",
            time: "16:00",
            title: "Gion District Evening Walking Tour",
            category: "Culture",
            cost: 0,
            location: "Gion, Kyoto",
            notes: "Spot geikos and admire traditional machiya wooden buildings"
          }
        ]
      }
    ]
  },
  {
    id: "trip-europe-2026",
    title: "European Romance: Paris & Amalfi Coast",
    subtitle: "Art galleries, croissants, and cliffside Mediterranean views",
    status: "draft",
    startDate: "2026-06-12",
    endDate: "2026-06-22",
    totalDays: 10,
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    totalBudget: 4800,
    spentBudget: 850,
    currency: "USD",
    travelers: [
      { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", role: "Owner" }
    ],
    cities: [
      { id: "dest-paris", name: "Paris", daysCount: 5, order: 1, hotel: "Le Marais Boutique Hotel", dates: "Jun 12 - Jun 17" },
      { id: "dest-amalfi", name: "Amalfi Coast", daysCount: 5, order: 2, hotel: "Cliffside Positano Villa", dates: "Jun 17 - Jun 22" }
    ],
    budgetBreakdown: [
      { category: "Accommodation", planned: 2400, spent: 500, color: "#0c8de9" },
      { category: "Flights", planned: 1400, spent: 350, color: "#10b981" },
      { category: "Food & Wine", planned: 700, spent: 0, color: "#f59e0b" },
      { category: "Activities", planned: 300, spent: 0, color: "#8b5cf6" }
    ],
    itinerary: []
  }
];

export const ADMIN_METRICS = {
  totalUsers: 28450,
  activeTripsCount: 3920,
  totalTripsCreated: 84120,
  grossBookingValue: "$4.82M",
  monthlyGrowthRate: "+18.4%",
  userGrowthData: [
    { month: "Jan", users: 18200 },
    { month: "Feb", users: 20100 },
    { month: "Mar", users: 22400 },
    { month: "Apr", users: 24900 },
    { month: "May", users: 26800 },
    { month: "Jun", users: 28450 }
  ],
  popularDestinationsChart: [
    { city: "Tokyo", count: 8420, percent: 32 },
    { city: "Paris", count: 6810, percent: 26 },
    { city: "Bali", count: 4950, percent: 19 },
    { city: "Amalfi Coast", count: 3210, percent: 12 },
    { city: "Reykjavik", count: 2860, percent: 11 }
  ]
};
