import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CalendlyModal } from './components/CalendlyModal';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { PackagesView } from './views/PackagesView';
import { OccasionsView } from './views/OccasionsView';
import { CalculatorView } from './views/CalculatorView';
import { AboutView } from './views/AboutView';
import { SafetyView } from './views/SafetyView';
import { ReviewsView } from './views/ReviewsView';
import { GalleryView } from './views/GalleryView';
import { HowItWorksView } from './views/HowItWorksView';
import { FAQView } from './views/FAQView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';
import { SERVICES_DATA } from './data/servicesData';
import { ToastProvider } from './context/ToastContext';
import { usePageSEO } from './hooks/usePageSEO';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalServiceId, setBookingModalServiceId] = useState<string | undefined>();
  const [bookingModalDate, setBookingModalDate] = useState<string | undefined>();
  const [bookingModalServices, setBookingModalServices] = useState<string[]>([]);

  // Automatically synchronize dynamic meta tags, OpenGraph headers, Twitter Cards, and Schema.org JSON-LD
  usePageSEO(currentView, selectedServiceId);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedServiceId]);

  const handleNavigate = (view: string, serviceId?: string) => {
    setCurrentView(view);
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
  };

  const handleOpenBookingModal = (
    serviceId?: string,
    preselectedDate?: string,
    preselectedServices?: string[]
  ) => {
    setBookingModalServiceId(serviceId);
    setBookingModalDate(preselectedDate);
    if (preselectedServices && preselectedServices.length > 0) {
      setBookingModalServices(preselectedServices);
    } else if (serviceId) {
      setBookingModalServices([serviceId]);
    } else {
      setBookingModalServices(['food-truck-arrangements']);
    }
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const selectedServiceName = bookingModalServiceId
    ? SERVICES_DATA.find(s => s.id === bookingModalServiceId)?.name
    : undefined;

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[#f5f7fc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
        {/* Apple Fluid Liquid Mesh Ambient Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Liquid Orb 1 - Azure / Cyan Light */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/35 via-sky-200/30 to-indigo-200/20 rounded-full blur-[100px] animate-liquid-1" />
          
          {/* Liquid Orb 2 - Periwinkle / Violet Shimmer */}
          <div className="absolute top-1/4 -right-48 w-[650px] h-[650px] bg-gradient-to-bl from-indigo-200/35 via-blue-200/30 to-sky-100/20 rounded-full blur-[120px] animate-liquid-2" />
          
          {/* Liquid Orb 3 - Center Gentle Refraction */}
          <div className="absolute top-2/3 left-1/5 w-[550px] h-[550px] bg-gradient-to-r from-sky-200/25 via-blue-100/30 to-slate-200/30 rounded-full blur-[110px] animate-liquid-3" />
          
          {/* Specular Liquid Noise & Translucent Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/40 to-[#f5f7fc]/80 backdrop-blur-[1px]" />
        </div>

        {/* Navigation Bar */}
        <div className="relative z-40">
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">
          {currentView === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          {currentView === 'services' && (
            <ServicesView
              onNavigate={handleNavigate}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          {currentView === 'service-detail' && (
            <ServiceDetailView
              serviceId={selectedServiceId || 'food-truck-arrangements'}
              onNavigate={handleNavigate}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          {currentView === 'packages' && (
            <PackagesView
              onNavigate={handleNavigate}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          {currentView === 'occasions' && (
            <OccasionsView
              onNavigate={handleNavigate}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          {currentView === 'calculator' && (
            <CalculatorView
              onNavigate={handleNavigate}
              onOpenBookingModal={handleOpenBookingModal}
            />
          )}

          {currentView === 'about' && (
            <AboutView
              onNavigate={handleNavigate}
              onOpenBookingModal={() => handleOpenBookingModal()}
            />
          )}

          {currentView === 'safety' && (
            <SafetyView
              onNavigate={handleNavigate}
              onOpenBookingModal={() => handleOpenBookingModal()}
            />
          )}

          {currentView === 'reviews' && (
            <ReviewsView
              onNavigate={handleNavigate}
              onOpenBookingModal={() => handleOpenBookingModal()}
            />
          )}

          {currentView === 'gallery' && (
            <GalleryView
              onOpenBookingModal={() => handleOpenBookingModal()}
            />
          )}

          {currentView === 'how-it-works' && (
            <HowItWorksView
              onOpenBookingModal={handleOpenBookingModal}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'faq' && (
            <FAQView
              onOpenBookingModal={() => handleOpenBookingModal()}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'contact' && (
            <ContactView
              onOpenBookingModal={() => handleOpenBookingModal()}
            />
          )}

          {(currentView === 'privacy' || currentView === 'terms' || currentView === 'cancellation') && (
            <LegalView
              type={currentView as 'privacy' | 'terms' | 'cancellation'}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <Footer
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        </div>

        {/* Universal Calendly Booking Modal */}
        <CalendlyModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          serviceId={bookingModalServiceId}
          serviceName={selectedServiceName}
          preselectedDate={bookingModalDate}
          preselectedServices={bookingModalServices}
        />
      </div>
    </ToastProvider>
  );
}
