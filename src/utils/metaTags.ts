import { BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';
import { PACKAGES_DATA } from '../data/packagesData';

export interface MetaTagConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80';
const BASE_URL = 'https://eventsrentals.io';

/**
 * Helper to update or inject meta tag by attribute (name or property)
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string | undefined): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;

  if (!content) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Helper to update or inject canonical link tag
 */
function setCanonicalLink(href: string | undefined): void {
  if (typeof document === 'undefined') return;

  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!href) {
    if (link) link.remove();
    return;
  }

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

/**
 * Helper to update or inject Schema.org JSON-LD script
 */
function setJsonLdScript(data: Record<string, unknown> | Array<Record<string, unknown>> | undefined): void {
  if (typeof document === 'undefined') return;

  const scriptId = 'dynamic-seo-ldjson';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!data) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

/**
 * Injects and synchronizes all meta tags, OpenGraph properties, and Twitter cards into the document head.
 */
export function updateMetaTags(config: MetaTagConfig): void {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = config.title;

  // 2. Standard Search Meta
  setMetaTag('name', 'description', config.description);
  if (config.keywords) {
    setMetaTag('name', 'keywords', config.keywords);
  }
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // 3. Canonical URL
  const canonicalUrl = config.canonical || (config.ogUrl ? `${BASE_URL}${config.ogUrl.startsWith('/') ? config.ogUrl : `/${config.ogUrl}`}` : BASE_URL);
  setCanonicalLink(canonicalUrl);

  // 4. OpenGraph Tags
  setMetaTag('property', 'og:title', config.ogTitle || config.title);
  setMetaTag('property', 'og:description', config.ogDescription || config.description);
  setMetaTag('property', 'og:image', config.ogImage || DEFAULT_OG_IMAGE);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', config.ogType || 'website');
  setMetaTag('property', 'og:site_name', 'EventsRentals.io');
  setMetaTag('property', 'og:locale', 'en_US');

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:card', config.twitterCard || 'summary_large_image');
  setMetaTag('name', 'twitter:title', config.twitterTitle || config.ogTitle || config.title);
  setMetaTag('name', 'twitter:description', config.twitterDescription || config.ogDescription || config.description);
  setMetaTag('name', 'twitter:image', config.twitterImage || config.ogImage || DEFAULT_OG_IMAGE);
  setMetaTag('name', 'twitter:site', '@eventsrentals');

  // 6. Schema.org Structured Data
  if (config.structuredData) {
    setJsonLdScript(config.structuredData);
  } else {
    // Default Organization & LocalBusiness Structured Data
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'EventsRentals.io',
      'image': DEFAULT_OG_IMAGE,
      'description': config.description,
      'url': BASE_URL,
      'telephone': BUSINESS_CONFIG.phonePlaceholder,
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': BUSINESS_CONFIG.serviceAreaPlaceholder,
        'addressCountry': 'US',
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          'opens': '07:00',
          'closes': '21:00',
        },
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5.0',
        'reviewCount': '142',
      },
    };
    setJsonLdScript(defaultStructuredData);
  }
}

/**
 * Builds comprehensive page-specific metadata, OpenGraph tags, and Schema.org JSON-LD objects
 * according to active view and service identifier.
 */
export function getRouteMetadata(view: string, serviceId?: string): MetaTagConfig {
  switch (view) {
    case 'home':
      return {
        title: 'Commercial Bouncy Castles & Vintage Popcorn Carts | EventsRentals.io',
        description: 'Sanitized commercial bouncy castles and vintage retro popcorn cart rentals. Delivered, securely anchored, and tested on-site with real-time Calendly booking.',
        keywords: 'bouncy castle rental, popcorn machine rental, commercial bounce house, jumping castle hire, party popcorn cart, birthday party rentals',
        ogTitle: 'EventsRentals.io — Commercial Bouncy Castles & Popcorn Carts',
        ogDescription: 'Sanitized heavy-duty bouncy castles and vintage popcorn carts for kids parties and community events. Live date reservation on Calendly.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/',
        twitterCard: 'summary_large_image',
      };

    case 'services':
      return {
        title: 'Rentals & Technical Specs — Bouncy Castle & Popcorn Cart | EventsRentals.io',
        description: 'Explore full dimensions, electrical requirements, and setup specifications for our commercial bouncy castle and vintage cinema popcorn cart.',
        keywords: 'bouncy castle specs, jumping castle dimensions, popcorn cart rental, party equipment specs',
        ogTitle: 'Equipment Specifications & Rentals | EventsRentals.io',
        ogDescription: 'Browse dimensions, power draw, capacity, and sanitized equipment options for your upcoming event.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/services',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'itemListElement': SERVICES_DATA.map((s, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': s.name,
            'description': s.shortDescription,
            'image': typeof s.heroImage === 'string' ? s.heroImage : DEFAULT_OG_IMAGE,
          })),
        },
      };

    case 'service-detail': {
      const targetService = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];
      const imageUrl = typeof targetService.heroImage === 'string' ? targetService.heroImage : DEFAULT_OG_IMAGE;

      return {
        title: `${targetService.name} — Specs & Booking | EventsRentals.io`,
        description: targetService.shortDescription || targetService.fullDescription.slice(0, 160),
        keywords: `${targetService.name.toLowerCase()}, ${targetService.category} rental, event setup, party equipment specs`,
        ogTitle: `${targetService.name} | EventsRentals.io`,
        ogDescription: targetService.shortDescription,
        ogImage: imageUrl,
        ogType: 'product',
        ogUrl: `/services/${targetService.slug || targetService.id}`,
        twitterCard: 'summary_large_image',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': targetService.name,
          'image': imageUrl,
          'description': targetService.fullDescription,
          'category': targetService.category,
          'brand': {
            '@type': 'Brand',
            'name': 'EventsRentals.io',
          },
          'offers': {
            '@type': 'AggregateOffer',
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': `${BASE_URL}/services/${targetService.slug || targetService.id}`,
          },
        },
      };
    }

    case 'packages':
      return {
        title: 'Party Packages — Ultimate Bounce & Pop Combo | EventsRentals.io',
        description: 'Save with our bundled Bounce & Pop Party Combo. Includes sanitized commercial bouncy castle, vintage popcorn cart, supplies for 100 servings, and full setup.',
        keywords: 'party combo package, bouncy castle and popcorn machine bundle, kids birthday party package',
        ogTitle: 'Ultimate Bounce & Pop Party Combo | EventsRentals.io',
        ogDescription: 'The complete children entertainment bundle. Commercial bouncy castle + retro popcorn cart.',
        ogImage: PACKAGES_DATA[0]?.image || DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/packages',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'itemListElement': PACKAGES_DATA.map((p, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': p.name,
            'description': p.description,
            'image': p.image,
          })),
        },
      };

    case 'gallery':
      return {
        title: 'Real Event Photos — Bouncy Castles & Popcorn Carts | EventsRentals.io',
        description: 'Browse verified photos of our commercial bouncy castles and vintage popcorn carts set up at real birthday parties and school events.',
        keywords: 'event photos, jumping castle gallery, popcorn cart setups, party setup photos',
        ogTitle: 'Photo Gallery | EventsRentals.io',
        ogDescription: 'See our sanitized commercial bouncy castles and popcorn carts in action at real events.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/gallery',
      };

    case 'how-it-works':
      return {
        title: 'How It Works — Booking, Delivery & Setup Timeline | EventsRentals.io',
        description: 'Learn our simple 4-step rental process: Choose equipment, hold your date in Calendly, confirm venue specs, and enjoy punctual on-site delivery.',
        keywords: 'how event rental works, bouncy castle setup process, popcorn machine delivery timeline',
        ogTitle: 'How Event Booking Works | EventsRentals.io',
        ogDescription: '4 simple steps from Calendly date hold to certified on-site rigging and packdown.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/how-it-works',
      };

    case 'reviews':
      return {
        title: 'Verified Customer Reviews & Ratings | EventsRentals.io',
        description: 'Read 5.0-star reviews from parents, school organizers, and event hosts who trust EventsRentals.io for punctual delivery and sanitized equipment.',
        keywords: 'party rental reviews, bouncy castle testimonials, popcorn machine rental rating',
        ogTitle: 'Verified Client Reviews (5.0★) | EventsRentals.io',
        ogDescription: 'Real testimonials from parents and school organizers praising clean equipment and punctual dispatch.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/reviews',
      };

    case 'safety':
      return {
        title: 'Sanitization & Safety Standards | EventsRentals.io',
        description: 'Learn about our commercial equipment standards: 18-inch forged steel ground stakes, 100% child-safe EPA botanical sanitization, and free weather rescheduling.',
        keywords: 'inflatable safety standards, bouncy castle sanitization, event ground anchoring, bad weather policy',
        ogTitle: 'Safety & Sanitization Standards | EventsRentals.io',
        ogDescription: 'Heavy-duty commercial vinyl, hospital-grade botanical sanitization, and free weather rescheduling.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/safety',
      };

    case 'faq':
      return {
        title: 'Frequently Asked Questions & Rental Logistics | EventsRentals.io',
        description: 'Got questions about power outlets, grass vs concrete setup, popcorn supplies, or rain policies? Find detailed answers in our FAQ.',
        keywords: 'party rental faq, bounce house power requirements, popcorn cart questions, weather rescheduling faq',
        ogTitle: 'Frequently Asked Questions | EventsRentals.io',
        ogDescription: 'Clear answers on equipment dimensions, electrical power draw, and cancellation terms.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/faq',
      };

    case 'contact':
      return {
        title: 'Contact Dispatch — Reservations & Questions | EventsRentals.io',
        description: 'Connect directly with our dispatch team for venue logistics, custom requests, and date availability.',
        keywords: 'contact event rentals, dispatch telephone, party equipment inquiry',
        ogTitle: 'Contact EventsRentals.io Dispatch',
        ogDescription: 'Reach our team 7 days a week for immediate dispatch help and venue consultations.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/contact',
      };

    case 'privacy':
      return {
        title: 'Privacy Policy | EventsRentals.io',
        description: 'Our commitment to protecting your personal information and event details.',
        ogTitle: 'Privacy Policy | EventsRentals.io',
        ogDescription: 'Information protection and data handling policies.',
        ogType: 'article',
        ogUrl: '/privacy',
      };

    case 'terms':
      return {
        title: 'Rental Terms & Conditions | EventsRentals.io',
        description: 'Standard equipment hire terms, adult supervision rules, and venue requirements.',
        ogTitle: 'Rental Terms & Conditions | EventsRentals.io',
        ogDescription: 'Commercial equipment hire terms and site guidelines.',
        ogType: 'article',
        ogUrl: '/terms',
      };

    case 'cancellation':
      return {
        title: 'Inclement Weather & Reschedule Policy | EventsRentals.io',
        description: 'Zero-penalty bad-weather rescheduling and advance cancellation guidelines.',
        ogTitle: 'Weather & Cancellation Policy | EventsRentals.io',
        ogDescription: 'Free date rescheduling for wind, rain, or storms on your party day.',
        ogType: 'article',
        ogUrl: '/cancellation',
      };

    default:
      return {
        title: 'EventsRentals.io — Commercial Bouncy Castles & Popcorn Carts',
        description: 'Commercial bouncy castles and vintage popcorn cart rentals for parties and community events.',
        ogTitle: 'EventsRentals.io',
        ogDescription: 'Commercial party equipment rentals.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        ogUrl: '/',
      };
  }
}
