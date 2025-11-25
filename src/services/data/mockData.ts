/**
 * MOCK DATA
 * =========
 * Raw data arrays that simulate a database.
 * All data conforms to domain/types.ts interfaces.
 * 
 * This file is the SINGLE SOURCE OF TRUTH for mock data.
 * Components should NEVER import this directly - use dataService.ts instead.
 */

import {
  Service,
  Subservice,
  ProductCategory,
  Product,
  Story,
} from '../../domain/types';

// =============================================================================
// SERVICES (Top Level)
// =============================================================================

export const SERVICES: Service[] = [
  {
    id: 'svc-1',
    slug: 'modular-bodies-and-cabinets',
    title: 'Modular bodies and cabinets',
    description: 'Complete solutions for modular furniture production - from kitchen cabinets to wardrobes and storage systems.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    heroImageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=2000',
    accentColor: '#D48F28',
  },
  {
    id: 'svc-2',
    slug: 'cnc-processing-of-panels',
    title: 'CNC processing of panels',
    description: 'Advanced CNC machining centers for precise cutting, drilling, and shaping of wood-based panels.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    heroImageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000',
    accentColor: '#2D5A5A',
  },
  {
    id: 'svc-3',
    slug: 'furniture-fronts-production',
    title: 'Furniture fronts production',
    description: 'Specialized machinery for producing high-quality furniture fronts, doors, and decorative panels.',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800',
    heroImageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=2000',
    accentColor: '#8B4513',
  },
];

// =============================================================================
// SUBSERVICES
// =============================================================================

export const SUBSERVICES: Subservice[] = [
  // --- Modular bodies and cabinets (svc-1) ---
  {
    id: 'sub-1',
    slug: 'kitchen-modules',
    serviceId: 'svc-1',
    title: 'Kitchen modules',
    description: 'Complete production lines for kitchen cabinet bodies, from cutting to assembly.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    heroImageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'sub-2',
    slug: 'bathrooms-and-niches',
    serviceId: 'svc-1',
    title: 'Bathrooms and niches',
    description: 'Specialized solutions for bathroom furniture and built-in niche systems.',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sub-3',
    slug: 'wardrobes-and-closets',
    serviceId: 'svc-1',
    title: 'Wardrobes and closets',
    description: 'Flexible manufacturing systems for walk-in closets and wardrobe interiors.',
    imageUrl: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sub-4',
    slug: 'drawers-and-pull-out-systems',
    serviceId: 'svc-1',
    title: 'Drawers and pull-out systems',
    description: 'Precision machinery for drawer boxes and pull-out storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800',
  },

  // --- CNC processing of panels (svc-2) ---
  {
    id: 'sub-5',
    slug: 'nesting',
    serviceId: 'svc-2',
    title: 'Nesting',
    description: 'Optimized nesting solutions for maximum material utilization.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sub-6',
    slug: 'routing',
    serviceId: 'svc-2',
    title: 'Routing',
    description: 'High-speed routing for complex shapes and profiles.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sub-7',
    slug: 'drilling',
    serviceId: 'svc-2',
    title: 'Drilling',
    description: 'Range of milling units, boring units, and insertion devices for glue, dowels and hardware.',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800',
  },

  // --- Furniture fronts production (svc-3) ---
  {
    id: 'sub-8',
    slug: 'membrane-pressing',
    serviceId: 'svc-3',
    title: 'Membrane pressing',
    description: 'Vacuum membrane presses for 3D lamination of furniture fronts.',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sub-9',
    slug: 'edge-processing',
    serviceId: 'svc-3',
    title: 'Edge processing',
    description: 'Complete edge processing solutions for furniture fronts.',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800',
  },
];

// =============================================================================
// PRODUCT CATEGORIES
// =============================================================================

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  // --- Kitchen modules (sub-1) ---
  {
    id: 'cat-1',
    slug: 'upper',
    subserviceId: 'sub-1',
    title: 'Upper',
    description: 'Wall-mounted upper cabinet modules',
    sortOrder: 1,
  },
  {
    id: 'cat-2',
    slug: 'lower',
    subserviceId: 'sub-1',
    title: 'Lower',
    description: 'Base cabinet modules with various configurations',
    sortOrder: 2,
  },
  {
    id: 'cat-3',
    slug: 'base',
    subserviceId: 'sub-1',
    title: 'Base',
    description: 'Foundation and plinth systems',
    sortOrder: 3,
  },
  {
    id: 'cat-4',
    slug: 'islands',
    subserviceId: 'sub-1',
    title: 'Islands',
    description: 'Freestanding kitchen island modules',
    sortOrder: 4,
  },

  // --- Drilling (sub-7) - keeping your existing demo data ---
  {
    id: 'cat-5',
    slug: 'dowel',
    subserviceId: 'sub-7',
    title: 'Dowel',
    description: 'Boring units with insertion devices for glue and dowels',
    sortOrder: 1,
  },
  {
    id: 'cat-6',
    slug: 'routing-dowel-inserting',
    subserviceId: 'sub-7',
    title: 'Routing Dowel & Inserting',
    description: 'Boring units with insertion devices for glue, dowels and hardware',
    sortOrder: 2,
  },
  {
    id: 'cat-7',
    slug: 'throughfeed-dowel-inserting',
    subserviceId: 'sub-7',
    title: 'Throughfeed Dowel & Inserting',
    description: 'Through boring units with insertion devices for glue, dowels and hardware',
    sortOrder: 3,
  },

  // --- Wardrobes and closets (sub-3) ---
  {
    id: 'cat-8',
    slug: 'shelving-systems',
    subserviceId: 'sub-3',
    title: 'Shelving systems',
    description: 'Adjustable shelving and storage solutions',
    sortOrder: 1,
  },
  {
    id: 'cat-9',
    slug: 'hanging-rails',
    subserviceId: 'sub-3',
    title: 'Hanging rails',
    description: 'Clothes rail and hanger systems',
    sortOrder: 2,
  },
];

// =============================================================================
// PRODUCTS
// =============================================================================

export const PRODUCTS: Product[] = [
  // --- Kitchen modules > Upper (cat-1) ---
  {
    id: 'prod-1',
    slug: 'n1-upper-module',
    categoryId: 'cat-1',
    title: 'N1 Upper Module',
    subtitle: 'Standard wall cabinet',
    description: 'A versatile wall-mounted cabinet module designed for maximum storage efficiency. Features adjustable shelving and soft-close hinges as standard.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&q=80&w=800',
    ],
    features: [
      'Soft-close hinges included',
      'Adjustable shelf positions',
      'Multiple width options',
      'Compatible with all door styles',
    ],
    specifications: [
      { label: 'Width', value: '300-900', unit: 'mm' },
      { label: 'Height', value: '720', unit: 'mm' },
      { label: 'Depth', value: '320', unit: 'mm' },
    ],
    has3DView: true,
  },
  {
    id: 'prod-2',
    slug: 'n2-upper-module',
    categoryId: 'cat-1',
    title: 'N2 Upper Module',
    subtitle: 'Corner wall cabinet',
    description: 'Optimized corner solution that maximizes storage in L-shaped kitchen layouts. Features a rotating carousel system for easy access.',
    imageUrl: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&q=80&w=800',
    features: [
      'Rotating carousel system',
      'Bi-fold door option',
      'Maximum corner utilization',
    ],
    specifications: [
      { label: 'Width', value: '600x600', unit: 'mm' },
      { label: 'Height', value: '720', unit: 'mm' },
    ],
    has3DView: true,
  },
  {
    id: 'prod-3',
    slug: 'n3-upper-module',
    categoryId: 'cat-1',
    title: 'N3 Upper Module',
    subtitle: 'Tall wall cabinet',
    description: 'Extended height wall cabinet for maximizing vertical storage space. Ideal for pantry items and less frequently used items.',
    imageUrl: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&q=80&w=800',
    features: [
      'Extended height design',
      'Multiple shelf configurations',
      'Top access panel option',
    ],
    specifications: [
      { label: 'Width', value: '300-600', unit: 'mm' },
      { label: 'Height', value: '900', unit: 'mm' },
      { label: 'Depth', value: '320', unit: 'mm' },
    ],
    has3DView: false,
  },

  // --- Kitchen modules > Lower (cat-2) ---
  {
    id: 'prod-4',
    slug: 'b1-base-cabinet',
    categoryId: 'cat-2',
    title: 'B1 Base Cabinet',
    subtitle: 'Standard base unit',
    description: 'Foundational base cabinet with drawer and door configuration. Built for durability with moisture-resistant materials.',
    imageUrl: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=800',
    features: [
      'Moisture-resistant construction',
      'Adjustable legs',
      'Soft-close drawers',
    ],
    specifications: [
      { label: 'Width', value: '400-900', unit: 'mm' },
      { label: 'Height', value: '720', unit: 'mm' },
      { label: 'Depth', value: '560', unit: 'mm' },
    ],
    has3DView: true,
  },
  {
    id: 'prod-5',
    slug: 'b2-sink-cabinet',
    categoryId: 'cat-2',
    title: 'B2 Sink Cabinet',
    subtitle: 'Under-sink unit',
    description: 'Specially designed cabinet for sink installation with waterproof base and flexible internal configuration.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&q=80&w=800',
    features: [
      'Waterproof aluminum base',
      'Flexible pipe routing',
      'Waste bin integration ready',
    ],
    specifications: [
      { label: 'Width', value: '600-900', unit: 'mm' },
      { label: 'Height', value: '720', unit: 'mm' },
    ],
    has3DView: true,
  },

  // --- Kitchen modules > Islands (cat-4) ---
  {
    id: 'prod-6',
    slug: 'island-standard',
    categoryId: 'cat-4',
    title: 'Island Standard',
    subtitle: 'Freestanding kitchen island',
    description: 'Versatile kitchen island base that can be configured with various tops, storage options, and integrated appliances.',
    imageUrl: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&q=80&w=800',
    features: [
      'Modular design',
      'Appliance integration ready',
      'Multiple configuration options',
    ],
    specifications: [
      { label: 'Width', value: '1200-2400', unit: 'mm' },
      { label: 'Height', value: '900', unit: 'mm' },
      { label: 'Depth', value: '600-900', unit: 'mm' },
    ],
    has3DView: true,
  },

  // --- Drilling > Dowel (cat-5) - your existing demo data ---
  {
    id: 'prod-7',
    slug: 'rover-drill-up-d-h',
    categoryId: 'cat-5',
    title: 'Rover Drill Up D H',
    subtitle: 'Compact drilling center',
    description: 'A compact, versatile drilling center that occupies minimum floor space. The Rover Drill Up D H is designed to meet the needs of flexible production, combining high performance with extreme precision. Ideal for small batches and just-in-time manufacturing.',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    ],
    features: [
      'Compact footprint',
      'High-speed spindle',
      'Automatic tool change',
      'Integrated dust extraction',
    ],
    specifications: [
      { label: 'Working Field', value: '3000', unit: 'mm' },
      { label: 'Spindle Speed', value: '24000', unit: 'rpm' },
      { label: 'Tool Positions', value: '12', unit: '' },
    ],
    has3DView: true,
  },
  {
    id: 'prod-8',
    slug: 'rover-drill-go-d-h',
    categoryId: 'cat-5',
    title: 'Rover Drill Go D H',
    subtitle: 'Entry-level drilling',
    description: 'Entry-level drilling solution offering professional results at accessible investment. Perfect for growing workshops.',
    imageUrl: 'https://images.unsplash.com/photo-1618386345638-348e3582dbf0?auto=format&fit=crop&q=80&w=800',
    features: [
      'Easy operation',
      'Quick setup',
      'Reliable performance',
    ],
    specifications: [
      { label: 'Working Field', value: '2500', unit: 'mm' },
      { label: 'Spindle Speed', value: '18000', unit: 'rpm' },
    ],
    has3DView: false,
  },

  // --- Drilling > Routing Dowel & Inserting (cat-6) ---
  {
    id: 'prod-9',
    slug: 'stream-drill-pro-r-v',
    categoryId: 'cat-6',
    title: 'Stream Drill Pro R V',
    subtitle: 'Professional routing & drilling',
    description: 'Professional-grade routing and drilling center with vertical configuration for optimal chip evacuation.',
    imageUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=800',
    features: [
      'Vertical spindle configuration',
      'Automatic dowel insertion',
      'Glue application system',
    ],
    specifications: [
      { label: 'Working Field', value: '3500', unit: 'mm' },
      { label: 'Drilling Heads', value: '6', unit: '' },
    ],
    has3DView: true,
  },
  {
    id: 'prod-10',
    slug: 'rover-drill-up-r-v',
    categoryId: 'cat-6',
    title: 'Rover Drill Up R V',
    subtitle: 'Advanced routing system',
    description: 'Advanced routing and drilling system with integrated hardware insertion capabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
    features: [
      'Hardware insertion ready',
      'Multi-axis capability',
      'High precision',
    ],
    specifications: [
      { label: 'Working Field', value: '3000', unit: 'mm' },
    ],
    has3DView: true,
  },

  // --- Drilling > Throughfeed (cat-7) ---
  {
    id: 'prod-11',
    slug: 'insiders-m',
    categoryId: 'cat-7',
    title: 'Insiders M',
    subtitle: 'Medium throughfeed system',
    description: 'Medium-capacity throughfeed drilling and inserting machine for continuous production flows.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800',
    features: [
      'Continuous operation',
      'High throughput',
      'Automatic feeding',
    ],
    specifications: [
      { label: 'Feed Speed', value: '25', unit: 'm/min' },
      { label: 'Panel Width', value: '60-1200', unit: 'mm' },
    ],
    has3DView: false,
  },
  {
    id: 'prod-12',
    slug: 'insiders-l',
    categoryId: 'cat-7',
    title: 'Insiders L',
    subtitle: 'Large throughfeed system',
    description: 'Large-capacity throughfeed system for high-volume industrial production environments.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    features: [
      'Industrial capacity',
      'Heavy-duty construction',
      'Line integration ready',
    ],
    specifications: [
      { label: 'Feed Speed', value: '40', unit: 'm/min' },
      { label: 'Panel Width', value: '60-1500', unit: 'mm' },
    ],
    has3DView: false,
  },
];

// =============================================================================
// STORIES (What's Next section)
// =============================================================================

export const STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Embrace the evolution',
    date: '03/25/2025',
    type: 'EVENTS',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'story-2',
    title: 'Brema Vektor: Custom Furniture Efficiently Produced – Visiting Kettnaker',
    date: '01/12/2025',
    type: 'CUSTOMER STORY',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'story-3',
    title: 'The future of glass, from innovation to sustainability',
    date: '12/31/2024',
    type: 'CUSTOMER STORY',
    imageUrl: 'https://images.unsplash.com/photo-1516666877960-e0705a61678c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'story-4',
    title: 'Biesse and Dunstable Laminates – future proofing joinery and laminate production',
    date: '12/15/2024',
    type: 'CUSTOMER STORY',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'story-5',
    title: 'Advanced Robotics in Modern Manufacturing',
    date: '11/20/2024',
    type: 'EVENTS',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
];
