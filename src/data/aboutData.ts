export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  certifications: string[];
}

export interface FleetVehicle {
  name: string;
  type: string;
  description: string;
  capacity: string;
  image: string;
}

export interface CompanyPillar {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const ABOUT_DATA = {
  tagline: 'Delivering Clean Bouncy Castles & Vintage Popcorn Carts for Memorable Events',
  mission:
    'We founded EventsRentals.io on a simple conviction: event hosts, school organizers, and parents deserve commercial-grade reliability, transparent scheduling, and impeccably clean bouncy castles and popcorn carts without stress.',
  story:
    'Focused strictly on the two highest-impact party essentials—heavy-duty commercial bouncy castles and vintage cinema popcorn carts—our fleet delivers joy across backyards, schools, and community gatherings with an unwavering 100% on-time dispatch record.',
  warehouse: {
    location: 'Central Logistics Hub & Sanitization Facility',
    size: 'Climate-Controlled Sanitization & Maintenance Facility',
    protocol:
      'Every bouncy castle is fully inflated, inspected for seam tension, washed with non-toxic hospital-grade botanical disinfectant, and thoroughly dried before re-packing in heavy-duty vinyl storage bags. Popcorn kettles undergo complete food-grade degreasing and sanitization after every booking.',
  },
  pillars: [
    {
      title: 'Punctual Dispatch Guarantee',
      subtitle: 'Zero Delays, Ever',
      description:
        'Our dispatch crew arrives 45 to 60 minutes before your party start time so your equipment is anchored, inflated, and tested before guests arrive.',
      iconName: 'Clock',
    },
    {
      title: 'Commercial Rigging & Staking',
      subtitle: '18" Steel Stakes & Heavy Sandbags',
      description:
        'Every bouncy castle is securely anchored into turf with deep 18-inch forged steel stakes or 150 lb sandbag ballasts on hard ground.',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Hospital-Grade Sanitization',
      subtitle: 'Spotless Equipment Hygiene',
      description:
        'We sanitize our bouncy castles, popcorn kettles, and serving surfaces with EPA-certified botanical solutions that are 100% kid-safe and skin-friendly.',
      iconName: 'Sparkles',
    },
    {
      title: 'Direct Calendly Sync',
      subtitle: 'Real-Time Date Reservation',
      description:
        'Check live availability instantly on our calendar with zero double-booking risk and instant delivery confirmation.',
      iconName: 'Calendar',
    },
  ],
  team: [
    {
      name: 'Michael Brennan',
      role: 'Head of Dispatch & Operations',
      bio: 'Over 10 years leading commercial event logistics, ensuring punctual deliveries and meticulous equipment maintenance.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      certifications: ['Certified Inflatable Operations Lead', 'First Aid Certified'],
    },
    {
      name: 'Jessica Vance',
      role: 'Customer Experience & Scheduling Lead',
      bio: 'Passionate about seamless host communication, booking schedules, and ensuring every party setup is flawless.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      certifications: ['Customer Success Specialist', 'Food Safety Handler Certified'],
    },
  ],
};
