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
      <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
        {/* Subtle Ambient Background Gradients for Clean Trust Theme */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-10 right-0 w-[450px] h-[450px] bg-slate-200/40 rounded-full blur-3xl opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-slate-100/40" />
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
