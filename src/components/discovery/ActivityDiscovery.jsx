import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Search, 
  Sparkles, 
  Clock, 
  MapPin, 
  Plus, 
  Star, 
  DollarSign, 
  SlidersHorizontal,
  ArrowUpDown,
  Filter as FilterIcon,
  ChevronRight,
  Compass
} from 'lucide-react';

export const ActivityDiscovery = () => {
  const { activitiesCatalog, activeTrip, addActivityToTrip, formatCurrency, setCurrentScreen } = useTripContext();

  const [searchQuery, setSearchQuery] = useState('Paragliding');
  const [groupBy, setGroupBy] = useState('Category');
  const [filterBy, setFilterBy] = useState('All');
  const [sortBy, setSortBy] = useState('Highest Rated');

  // Option and its details list matching wireframe "Results" section
  const searchResults = [
    {
      id: 'act-1',
      title: 'Paragliding & Tandem Sky Flights',
      category: 'Outdoor & Adventure',
      location: 'Interlaken / Zermatt, Switzerland',
      duration: '3.5 Hours',
      rating: 4.9,
      reviewsCount: 342,
      cost: 180,
      image: 'https://images.unsplash.com/photo-1516592673884-4a382711d961?auto=format&fit=crop&w=600&q=80',
      description: 'Experience exhilarating tandem paragliding over snow-capped alpine peaks and crystal turquoise lakes with certified instructors.'
    },
    {
      id: 'act-2',
      title: 'High Altitude Alpine Paragliding',
      category: 'Outdoor & Adventure',
      location: 'Chamonix-Mont-Blanc, France',
      duration: '4.0 Hours',
      rating: 4.8,
      reviewsCount: 215,
      cost: 220,
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
      description: 'Thermal soaring flight from 2,000 meters altitude offering panoramic views of Mont Blanc massif and Glacier des Bossons.'
    },
    {
      id: 'act-3',
      title: 'Coastal Cliff Paragliding Adventure',
      category: 'Extreme Sports',
      location: 'Oludeniz / Fethiye, Turkey',
      duration: '2.5 Hours',
      rating: 4.9,
      reviewsCount: 512,
      cost: 150,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      description: 'Glide directly off Babadag Mountain over the famous Blue Lagoon with HD action camera footage included.'
    },
    {
      id: 'act-4',
      title: 'Sunset Glider Flight & Video Package',
      category: 'Romantic & Scenic',
      location: 'Pokhara, Nepal',
      duration: '2.0 Hours',
      rating: 4.7,
      reviewsCount: 189,
      cost: 130,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      description: 'Golden hour aerial gliding flight taking in breathtaking reflections over Phewa Lake and Annapurna Himalayan range.'
    },
    {
      id: 'act-5',
      title: 'Thermal Soaring & Aerial Photography',
      category: 'Photography & Tours',
      location: 'Innsbruck, Austria',
      duration: '3.0 Hours',
      rating: 4.8,
      reviewsCount: 164,
      cost: 195,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
      description: 'Learn thermal navigation principles from professional pilots while capturing professional high-resolution aerial imagery.'
    },
    {
      id: 'act-6',
      title: 'Cross-Country Tandem Gliding Flight',
      category: 'Adventure & Nature',
      location: 'Queenstown, New Zealand',
      duration: '4.5 Hours',
      rating: 5.0,
      reviewsCount: 278,
      cost: 240,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80',
      description: 'Long-distance cross-country flight soaring over Lake Wakatipu and Remarkables mountain range with acrobatic maneuvers option.'
    },
    {
      id: 'act-7',
      title: 'Beginner Paragliding Workshop & Trial Flight',
      category: 'Instructional & Fun',
      location: 'Lake Garda, Italy',
      duration: '3.0 Hours',
      rating: 4.6,
      reviewsCount: 142,
      cost: 160,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      description: 'Introductory ground training followed by a safe 20-minute dual-control trial flight over the scenic Italian lakes.'
    }
  ];

  // Filter & Search Logic
  const filteredResults = searchResults.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterBy === 'All') return true;
    if (filterBy === 'Outdoor' && act.category.includes('Outdoor')) return true;
    if (filterBy === 'Scenic' && (act.category.includes('Scenic') || act.category.includes('Photography'))) return true;

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          Activity Search Pages / City Search Page (Screen 8)
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Activity & City Discovery</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Find top-rated travel activities, adventures, and city experiences to add into your custom itineraries.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TOP CONTROL BAR MATCHING WIREFRAME                        */}
      {/* [ Paragliding                    ] | Group by | Filter | Sort by... */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center gap-3">
        
        {/* Search bar with typed query 'Paragliding' */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
          />
        </div>

        {/* Group by */}
        <div className="w-full md:w-auto">
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="Category">Group by: Category</option>
            <option value="City">Group by: Location</option>
            <option value="Cost">Group by: Cost</option>
          </select>
        </div>

        {/* Filter */}
        <div className="w-full md:w-auto">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="All">Filter: All Types</option>
            <option value="Outdoor">Filter: Outdoor</option>
            <option value="Scenic">Filter: Scenic</option>
          </select>
        </div>

        {/* Sort by... */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="Highest Rated">Sort by: Rating</option>
            <option value="PriceLow">Sort by: Price (Low)</option>
            <option value="PriceHigh">Sort by: Price (High)</option>
          </select>
        </div>

      </div>

      {/* ========================================================= */}
      {/* RESULTS SECTION (STACKED OPTION AND ITS DETAILS CARDS)    */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Results</h2>
          <span className="text-xs font-bold text-slate-500">{filteredResults.length} Options Found</span>
        </div>

        {/* Stacked 7 Full-Width Option Cards */}
        <div className="space-y-4">
          {filteredResults.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              
              {/* Option Image & Details */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1">
                <div className="relative w-full sm:w-48 h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/20">
                    {item.category}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-slate-950" /> {item.rating} ({item.reviewsCount})
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-brand-500" /> {item.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                    Option: {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    Option and its details: {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      {formatCurrency(item.cost)} / person
                    </span>
                  </div>
                </div>
              </div>

              {/* Right CTA Button */}
              <div className="shrink-0 pt-3 md:pt-0 md:border-l md:border-slate-100 md:pl-6 flex md:flex-col items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (activeTrip) {
                      addActivityToTrip(activeTrip.id, 1, item);
                      setCurrentScreen('itinerary-builder');
                    } else {
                      setCurrentScreen('create-trip');
                    }
                  }}
                  className="w-full md:w-40 py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-glow transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Add to Trip</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
