import { BusinessInfo } from '../types';

export const BUSINESS_CONFIG: BusinessInfo = {
  name: 'EventsRentals.io',
  domain: 'EventsRentals.io',
  tagline: 'Commercial Bouncy Castles & Vintage Popcorn Cart Rentals',
  // Clearly marked editable placeholders as specified in project rules
  phonePlaceholder: '+1 (800) 555-RENT [Configurable Phone]',
  emailPlaceholder: 'hello@eventsrentals.io [Configurable Email]',
  serviceAreaPlaceholder: 'Metro Area & Surrounding Suburbs [Configurable Region]',
  operatingHours: 'Mon - Sun: 7:00 AM – 9:00 PM (Setup & Support)',
  defaultCalendlyUrl: 'https://calendly.com/eventsrentals/event-consultation',
};

export const CALENDLY_CONFIG = {
  // Base URLs for specific Calendly routing flows
  baseUrl: 'https://calendly.com/eventsrentals',
  serviceFlows: {
    'standard-jumping-castle': 'https://calendly.com/eventsrentals/jumping-castles',
    'standard-popcorn-cart': 'https://calendly.com/eventsrentals/popcorn-cart',
    'ultimate-bounce-and-pop-combo': 'https://calendly.com/eventsrentals/party-combo',
    'consultation': 'https://calendly.com/eventsrentals/event-consultation',
    'packages': 'https://calendly.com/eventsrentals/party-combo',
  },
};
