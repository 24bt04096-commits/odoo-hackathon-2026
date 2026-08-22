import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Search, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  Share2, 
  Plus, 
  Star, 
  MapPin, 
  Calendar,
  Users,
  Compass,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

export const CommunityTab = () => {
  const { setCurrentScreen, addToast } = useTripContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Trip Experience');
  const [filterBy, setFilterBy] = useState('All');
  const [sortBy, setSortBy] = useState('Most Liked');

  // Community posts data matching Screen 10 layout
  const [posts, setPosts] = useState([
    {
      id: 'post-1',
      authorName: 'Elena Rostova',
      authorHandle: '@elena_travels',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      location: 'Interlaken & Zermatt, Switzerland',
      postDate: '2 hours ago',
      rating: 5.0,
      tripTag: 'Swiss Alps & Rhine Express',
      experienceText: 'Community section where all the users can share their experience about a certain trip or activity: Tandem paragliding over the Lauterbrunnen Valley was the highlight of our 10-day Swiss trip! The views of Eiger and Jungfrau were completely surreal. Highly recommend booking early morning slots for calmest winds.',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
      likes: 342,
      comments: 28,
      isLiked: false
    },
    {
      id: 'post-2',
      authorName: 'Marcus Vance',
      authorHandle: '@marcus_vance',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      location: 'Tokyo & Kyoto, Japan',
      postDate: '5 hours ago',
      rating: 4.9,
      tripTag: 'Grand Japan Sakura Odyssey',
      experienceText: 'Community section where all the users can share their experience about a certain trip or activity: Taking the early morning Nozomi Shinkansen from Tokyo Station to Kyoto gave us stunning views of Mount Fuji on the right-hand window side (seats E/D). Don’t miss Shibuya Sky sunset!',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      likes: 512,
      comments: 45,
      isLiked: true
    },
    {
      id: 'post-3',
      authorName: 'Sophia Chen',
      authorHandle: '@sophia_explore',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      location: 'Positano & Capri, Italy',
      postDate: '1 day ago',
      rating: 4.8,
      tripTag: 'Mediterranean Coastal Sunset Tour',
      experienceText: 'Community section where all the users can share their experience about a certain trip or activity: Renting a private wooden gozzo boat in Capri for 3 hours allowed us to swim inside the Green Cave and White Grotto without the crowded ferry tours.',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      likes: 289,
      comments: 19,
      isLiked: false
    },
    {
      id: 'post-4',
      authorName: 'David & Sarah Miller',
      authorHandle: '@miller_adventures',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      location: 'Reykjavik & Vik, Iceland',
      postDate: '2 days ago',
      rating: 5.0,
      tripTag: 'Icelandic Northern Lights Expedition',
      experienceText: 'Community section where all the users can share their experience about a certain trip or activity: We caught the Aurora Borealis right over Skógafoss waterfall around 11:30 PM! Tip: Keep camera shutter speed around 4-6 seconds with ISO 1600.',
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80',
      likes: 674,
      comments: 54,
      isLiked: true
    }
  ]);

  const handleLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 font-sans">
      
      {/* Header Tag */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-brand-600" />
          Community tab Screen (Screen 10)
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Traveler Community & Shared Experiences</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Connect with global adventurers, explore authentic trip reviews, and copy top community itineraries.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TOP CONTROL BAR MATCHING WIREFRAME                        */}
      {/* [ Search bar ......               ] | Group by | Filter | Sort by... */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center gap-3">
        
        {/* Search bar ...... */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search bar ......"
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
            <option value="Trip Experience">Group by: Experience</option>
            <option value="Activity">Group by: Activity</option>
            <option value="Destination">Group by: Destination</option>
            <option value="Author">Group by: Author</option>
          </select>
        </div>

        {/* Filter */}
        <div className="w-full md:w-auto">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="All">Filter: All Posts</option>
            <option value="Top Rated">Filter: Top Rated</option>
            <option value="Recent Stories">Filter: Recent Stories</option>
          </select>
        </div>

        {/* Sort by... */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="Most Liked">Sort by: Most Liked</option>
            <option value="Newest First">Sort by: Newest First</option>
            <option value="Highest Rating">Sort by: Rating</option>
          </select>
        </div>

      </div>

      {/* ========================================================= */}
      {/* WIREFRAME DESCRIPTION BANNER & SECTION TITLE               */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        <div className="lg:col-span-4 bg-gradient-to-br from-brand-600 to-indigo-700 text-white rounded-3xl p-6 shadow-glow space-y-2">
          <h2 className="text-2xl font-black tracking-tight">Community tab</h2>
          <p className="text-xs text-brand-100 font-medium leading-relaxed">
            Community section where all the users can share their experience about a certain trip or activity. Using the search, groupby or filter and sortby option, the user can narrow down the result that he is looking for...
          </p>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900">Share Your Experience</h3>
            <p className="text-xs text-slate-500">Post photos, tips, and budget insights for travelers worldwide.</p>
          </div>
          <button
            type="button"
            onClick={() => addToast('Share experience dialog coming soon!', 'info')}
            className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-glow transition-all hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Create Community Post</span>
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* COMMUNITY POSTS LIST (CIRCULAR AVATAR ◯ + POST BOX [ ])  */}
      {/* ========================================================= */}
      <div className="space-y-6">
        
        {posts.map((post) => (
          <div 
            key={post.id}
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group"
          >
            
            {/* Left: Circular User Avatar (◯ matching wireframe) */}
            <div className="shrink-0 mx-auto sm:mx-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-md ring-4 ring-brand-500/20 bg-slate-900">
                <img 
                  src={post.authorAvatar} 
                  alt={post.authorName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Rectangular Post Box ([ ] matching wireframe) */}
            <div className="flex-1 w-full bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card transition-all space-y-4">
              
              {/* Post Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-slate-900">{post.authorName}</h4>
                    <span className="text-xs font-bold text-slate-400">{post.authorHandle}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    {post.location} • <span className="text-slate-400">{post.postDate}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-black px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {post.rating}
                  </span>
                </div>
              </div>

              {/* Trip Tag */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  {post.tripTag}
                </span>
              </div>

              {/* Experience Text */}
              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                {post.experienceText}
              </p>

              {/* Attached Experience Image */}
              {post.image && (
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                  <img 
                    src={post.image} 
                    alt={post.tripTag} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Interactive Footer Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-all px-3 py-1.5 rounded-xl ${
                      post.isLiked 
                        ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addToast('Comments drawer opening...', 'info')}
                    className="flex items-center gap-1.5 font-bold text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    <span>{post.comments} Comments</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addToast('Trip itinerary copied to your dashboard!', 'success');
                      setCurrentScreen('create-trip');
                    }}
                    className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition-all hover:scale-105 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Copy Trip</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
