import React, { useEffect } from 'react';
import { TripProvider, useTripContext } from './context/TripContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';

import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { CreateTripWizard } from './components/trip-create/CreateTripWizard';
import { MyTripsPage } from './components/trips/MyTripsPage';
import { ItineraryBuilder } from './components/itinerary/ItineraryBuilder';
import { ItineraryView } from './components/itinerary/ItineraryView';
import { CityDiscovery } from './components/discovery/CityDiscovery';
import { ActivityDiscovery } from './components/discovery/ActivityDiscovery';
import { BudgetDashboard } from './components/budget/BudgetDashboard';
import { CalendarView } from './components/calendar/CalendarView';
import { PublicSharedTrip } from './components/shared/PublicSharedTrip';
import { ProfileSettings } from './components/profile/ProfileSettings';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CommunityTab } from './components/community/CommunityTab';

const MainContent = () => {
  const { currentScreen, isAuthenticated } = useTripContext();

  // Scroll to the top of the page on every screen/page transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentScreen]);

  const renderScreen = () => {
    // Unauthenticated user attempting to open website or access protected screens gets redirected to AuthPage
    if (!isAuthenticated && currentScreen !== 'public-share') {
      return <AuthPage />;
    }

    switch (currentScreen) {
      case 'landing':
        return <LandingPage />;
      case 'auth':
        return <AuthPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'create-trip':
        return <CreateTripWizard />;
      case 'my-trips':
        return <MyTripsPage />;
      case 'itinerary-builder':
        return <ItineraryBuilder />;
      case 'itinerary-view':
        return <ItineraryView />;
      case 'city-discovery':
        return <CityDiscovery />;
      case 'activity-discovery':
        return <ActivityDiscovery />;
      case 'community':
        return <CommunityTab />;
      case 'budget':
        return <BudgetDashboard />;
      case 'calendar':
        return <CalendarView />;
      case 'public-share':
        return <PublicSharedTrip />;
      case 'profile':
        return <ProfileSettings />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return isAuthenticated ? <DashboardPage /> : <AuthPage />;
    }
  };

  const isFullscreenAuth = currentScreen === 'auth' || (!isAuthenticated && currentScreen !== 'landing' && currentScreen !== 'public-share');

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {!isFullscreenAuth && <Navbar />}
      <main className="flex-grow">
        {renderScreen()}
      </main>
      {!isFullscreenAuth && <Footer />}
      {!isFullscreenAuth && isAuthenticated && <MobileNav />}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <TripProvider>
      <MainContent />
    </TripProvider>
  );
}
