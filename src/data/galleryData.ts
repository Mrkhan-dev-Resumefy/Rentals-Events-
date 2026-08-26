import { GalleryItem } from '../types';
import standardJumpingCastleImg from '../assets/images/regenerated_image_1787122229756.jpg';
import largeJumpingCastleImg from '../assets/images/regenerated_image_1787122231069.jpg';
import standardPopcornCartImg from '../assets/images/regenerated_image_1787122232972.jpg';
import largePopcornCartImg from '../assets/images/regenerated_image_1787122234234.jpg';

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Backyard Birthday Castle Setup',
    category: 'jumping-castles',
    categoryLabel: 'Bouncy Castles',
    image: standardJumpingCastleImg,
    serviceName: 'Commercial Bouncy Castle',
    eventType: 'Birthday Party',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-2',
    title: 'Vintage Retro Popcorn Cart Station',
    category: 'popcorn-carts',
    categoryLabel: 'Popcorn Carts',
    image: standardPopcornCartImg,
    serviceName: 'Vintage Popcorn Cart',
    eventType: 'Family Celebration',
    aspectRatio: 'square'
  },
  {
    id: 'gal-3',
    title: 'Park Lawn Commercial Bouncy Castle',
    category: 'jumping-castles',
    categoryLabel: 'Bouncy Castles',
    image: largeJumpingCastleImg,
    serviceName: 'Commercial Bouncy Castle',
    eventType: 'School Fun Day',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-4',
    title: 'Fresh Hot Popcorn Service Station',
    category: 'popcorn-carts',
    categoryLabel: 'Popcorn Carts',
    image: largePopcornCartImg,
    serviceName: 'Vintage Popcorn Cart',
    eventType: 'Community Event',
    aspectRatio: 'square'
  },
  {
    id: 'gal-5',
    title: 'Sunny Garden Party Jump Arena',
    category: 'jumping-castles',
    categoryLabel: 'Bouncy Castles',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
    serviceName: 'Commercial Bouncy Castle',
    eventType: 'Birthday Celebration',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-6',
    title: 'Freshly Popped Theater Popcorn in Bags',
    category: 'popcorn-carts',
    categoryLabel: 'Popcorn Carts',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=1000&q=80',
    serviceName: 'Vintage Popcorn Cart',
    eventType: 'Movie Night & Party',
    aspectRatio: 'square'
  }
];
