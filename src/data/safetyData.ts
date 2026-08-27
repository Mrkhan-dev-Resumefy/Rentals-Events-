export interface SafetyPillar {
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export const SAFETY_PILLARS: SafetyPillar[] = [
  {
    title: 'Commercial Rigging & Staking',
    description: 'Every inflatable is secured using 18-inch commercial forged steel stakes on turf or 150 lb calibrated sandbag ballasts on hard surfaces.',
    badge: 'ASTM F2374 Standard',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Hospital-Grade Sanitization',
    description: 'Units are vacuumed, power-washed, and treated with non-toxic, kid-safe EPA botanical virucide and disinfectant before and after every dispatch.',
    badge: '100% Non-Toxic & Child-Safe',
    iconName: 'Sparkles',
  },
  {
    title: 'Wind & Weather Cutoffs',
    description: 'Operation is strictly paused if sustained winds exceed 15-20 mph. Digital anemometer wind checks are performed on-site by dispatch technicians.',
    badge: '15-20 MPH Threshold',
    iconName: 'Wind',
  },
  {
    title: 'GFCI Surge Protection',
    description: 'All blowers, carts, and food warmers connect via heavy-duty waterproof 10-gauge cords with integrated Ground Fault Circuit Interrupters.',
    badge: 'Surge & Ground Protected',
    iconName: 'Zap',
  },
];

export const SAFETY_CHECKLIST = [
  'Heavy duty 18-inch commercial steel ground stakes for grass setups, or 150 lb water/sand weights for concrete/asphalt.',
  'EPA-approved botanical hospital-grade sanitization applied prior to every dispatch.',
  'GFCI surge protected commercial-grade outdoor waterproof power cords.',
  'ASTM and Australian/US certified flame-retardant lead-free commercial vinyl inflatables.',
  'Dedicated perimeter safety clearances checked by dispatch driver before handover.',
  'Emergency deflation protocols demonstrated and documented with host.',
];

export const WEATHER_POLICY = {
  headline: 'Zero-Penalty Bad-Weather Rescheduling',
  description: 'We believe you should never have to compromise child safety or event enjoyment over unexpected inclement weather.',
  windThreshold: 'Operation strictly paused if sustained winds exceed 15-20 mph (24-32 km/h) for inflatable safety.',
  rainPolicy: 'Free date rescheduling guaranteed up to 7:00 AM on event day if continuous rainfall or electrical storms are forecast.',
  temperature: 'Inflatables operate safely between 40°F and 95°F with shaded setups recommended in high summer.',
};
