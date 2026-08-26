import { TestimonialItem } from '../types';

export interface ExtendedReviewItem extends TestimonialItem {
  companyOrSchool?: string;
  dateStr: string;
  verified: boolean;
  photoUrl?: string;
  highlightPhrase: string;
}

export const REVIEWS_DATA: ExtendedReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    role: 'Parent & PTA Committee Chair',
    companyOrSchool: 'Oakridge Elementary School',
    eventType: 'School Spring Fun Day',
    rating: 5,
    location: 'North Suburbs',
    dateStr: 'May 2026',
    verified: true,
    highlightPhrase: 'Arrived 60 minutes early with spotlessly clean equipment.',
    content:
      'EventsRentals.io made our school fun day completely painless. They provided the commercial bouncy castle and retro popcorn cart. The dispatch team arrived early, securely staked the castle into our turf, and demonstrated the quick 3-button popcorn machine operation. Everything was sanitized and the kids had a blast!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    servicesUsed: ['Commercial Bouncy Castle', 'Vintage Popcorn Cart'],
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Neighborhood Association Lead',
    companyOrSchool: 'Sunset Ridge Community',
    eventType: 'Annual Summer Block Party',
    rating: 5,
    location: 'Sunset Ridge',
    dateStr: 'June 2026',
    verified: true,
    highlightPhrase: 'Super punctual delivery and the popcorn cart was a huge hit!',
    content:
      'We rented the Bounce & Pop Combo for our neighborhood block party. The bouncy castle held up effortlessly to nonstop jumping all afternoon, and the warm popcorn aroma kept neighbors coming back. Packdown at the end was quick and professional. Booking on Calendly took less than 2 minutes.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80',
    servicesUsed: ['Commercial Bouncy Castle', 'Vintage Popcorn Cart'],
  },
  {
    id: 'rev-3',
    author: 'Elena & David Ramirez',
    role: 'Homeowners & Birthday Hosts',
    companyOrSchool: 'Private Residence',
    eventType: '7th Birthday Celebration',
    rating: 5,
    location: 'Westside Residential',
    dateStr: 'July 2026',
    verified: true,
    highlightPhrase: 'Spotless equipment, sanitized before use, and friendly crew.',
    content:
      'We booked the commercial bouncy castle and the vintage popcorn cart for our daughter’s 7th birthday. The crew arrived exactly when promised, anchored everything into our lawn with heavy-duty safety stakes, and sanitized the surfaces. When light rain was forecasted the week before, dispatch was super reassuring about their free rescheduling policy. 10/10 recommend!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    servicesUsed: ['Commercial Bouncy Castle', 'Vintage Popcorn Cart'],
  }
];
