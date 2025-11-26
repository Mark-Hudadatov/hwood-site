/**
 * DATA SERVICE
 * =============
 * Async functions for accessing domain data.
 * 
 * Components should ALWAYS use this service instead of importing mockData directly.
 * This abstraction allows:
 * - Easy swap to real API later
 * - Simulated loading states
 * - Filtering/pagination logic
 * - Caching (future)
 * 
 * All functions return Promises to simulate async behavior.
 */

import {
  Service,
  Subservice,
  ProductCategory,
  Product,
  Story,
} from '../../domain/types';

import {
  SERVICES,
  SUBSERVICES,
  PRODUCT_CATEGORIES,
  PRODUCTS,
  STORIES,
  HERO_SLIDES,
  COMPANY_INFO,
  HeroSlide,
} from './mockData';

// Simulate network delay (set to 0 for instant, or 100-300 for realistic feel)
const SIMULATED_DELAY = 0;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// =============================================================================
// SERVICES
// =============================================================================

/**
 * Get all services
 */
export async function getServices(): Promise<Service[]> {
  await delay(SIMULATED_DELAY);
  return SERVICES;
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  await delay(SIMULATED_DELAY);
  return SERVICES.find(s => s.slug === slug);
}

/**
 * Get a single service by ID
 */
export async function getServiceById(id: string): Promise<Service | undefined> {
  await delay(SIMULATED_DELAY);
  return SERVICES.find(s => s.id === id);
}

// =============================================================================
// SUBSERVICES
// =============================================================================

/**
 * Get all subservices
 */
export async function getSubservices(): Promise<Subservice[]> {
  await delay(SIMULATED_DELAY);
  return SUBSERVICES;
}

/**
 * Get subservices for a specific service (by service ID)
 */
export async function getSubservicesByServiceId(serviceId: string): Promise<Subservice[]> {
  await delay(SIMULATED_DELAY);
  return SUBSERVICES.filter(sub => sub.serviceId === serviceId);
}

/**
 * Get subservices for a specific service (by service slug)
 */
export async function getSubservicesByServiceSlug(serviceSlug: string): Promise<Subservice[]> {
  await delay(SIMULATED_DELAY);
  const service = SERVICES.find(s => s.slug === serviceSlug);
  if (!service) return [];
  return SUBSERVICES.filter(sub => sub.serviceId === service.id);
}

/**
 * Get a single subservice by slug
 */
export async function getSubserviceBySlug(slug: string): Promise<Subservice | undefined> {
  await delay(SIMULATED_DELAY);
  return SUBSERVICES.find(sub => sub.slug === slug);
}

/**
 * Get a single subservice by ID
 */
export async function getSubserviceById(id: string): Promise<Subservice | undefined> {
  await delay(SIMULATED_DELAY);
  return SUBSERVICES.find(sub => sub.id === id);
}

/**
 * Get subservice with its parent service data
 */
export async function getSubserviceWithParent(slug: string): Promise<{
  subservice: Subservice;
  service: Service;
} | undefined> {
  await delay(SIMULATED_DELAY);
  const subservice = SUBSERVICES.find(sub => sub.slug === slug);
  if (!subservice) return undefined;
  
  const service = SERVICES.find(s => s.id === subservice.serviceId);
  if (!service) return undefined;
  
  return { subservice, service };
}

// =============================================================================
// PRODUCT CATEGORIES
// =============================================================================

/**
 * Get all product categories
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  await delay(SIMULATED_DELAY);
  return PRODUCT_CATEGORIES;
}

/**
 * Get categories for a specific subservice (by subservice ID)
 */
export async function getCategoriesBySubserviceId(subserviceId: string): Promise<ProductCategory[]> {
  await delay(SIMULATED_DELAY);
  return PRODUCT_CATEGORIES
    .filter(cat => cat.subserviceId === subserviceId)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/**
 * Get categories for a specific subservice (by subservice slug)
 */
export async function getCategoriesBySubserviceSlug(subserviceSlug: string): Promise<ProductCategory[]> {
  await delay(SIMULATED_DELAY);
  const subservice = SUBSERVICES.find(sub => sub.slug === subserviceSlug);
  if (!subservice) return [];
  return PRODUCT_CATEGORIES
    .filter(cat => cat.subserviceId === subservice.id)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
  await delay(SIMULATED_DELAY);
  return PRODUCT_CATEGORIES.find(cat => cat.slug === slug);
}

// =============================================================================
// PRODUCTS
// =============================================================================

/**
 * Get all products
 */
export async function getProducts(): Promise<Product[]> {
  await delay(SIMULATED_DELAY);
  return PRODUCTS;
}

/**
 * Get products for a specific category (by category ID)
 */
export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  await delay(SIMULATED_DELAY);
  return PRODUCTS.filter(p => p.categoryId === categoryId);
}

/**
 * Get products for a specific category (by category slug)
 */
export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  await delay(SIMULATED_DELAY);
  const category = PRODUCT_CATEGORIES.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  return PRODUCTS.filter(p => p.categoryId === category.id);
}

/**
 * Get products for a specific subservice (all categories combined)
 */
export async function getProductsBySubserviceSlug(subserviceSlug: string): Promise<Product[]> {
  await delay(SIMULATED_DELAY);
  const subservice = SUBSERVICES.find(sub => sub.slug === subserviceSlug);
  if (!subservice) return [];
  
  const categoryIds = PRODUCT_CATEGORIES
    .filter(cat => cat.subserviceId === subservice.id)
    .map(cat => cat.id);
  
  return PRODUCTS.filter(p => categoryIds.includes(p.categoryId));
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await delay(SIMULATED_DELAY);
  return PRODUCTS.find(p => p.slug === slug);
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(SIMULATED_DELAY);
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Get product with full breadcrumb chain
 */
export async function getProductWithBreadcrumb(slug: string): Promise<{
  product: Product;
  category: ProductCategory;
  subservice: Subservice;
  service: Service;
} | undefined> {
  await delay(SIMULATED_DELAY);
  
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) return undefined;
  
  const category = PRODUCT_CATEGORIES.find(cat => cat.id === product.categoryId);
  if (!category) return undefined;
  
  const subservice = SUBSERVICES.find(sub => sub.id === category.subserviceId);
  if (!subservice) return undefined;
  
  const service = SERVICES.find(s => s.id === subservice.serviceId);
  if (!service) return undefined;
  
  return { product, category, subservice, service };
}

// =============================================================================
// STORIES
// =============================================================================

/**
 * Get all stories
 */
export async function getStories(): Promise<Story[]> {
  await delay(SIMULATED_DELAY);
  return STORIES;
}

/**
 * Add a new story (for AI-generated content)
 */
export async function addStory(story: Story): Promise<Story> {
  await delay(SIMULATED_DELAY);
  // In mock mode, we just return the story as-is
  // In real implementation, this would POST to an API
  return story;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Search across all products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  await delay(SIMULATED_DELAY);
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.subtitle?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get homepage data bundle (optimized single call)
 */
export async function getHomepageData(): Promise<{
  services: Service[];
  stories: Story[];
}> {
  await delay(SIMULATED_DELAY);
  return {
    services: SERVICES,
    stories: STORIES,
  };
}

/**
 * Get subservice page data bundle (optimized single call)
 */
export async function getSubservicePageData(subserviceSlug: string): Promise<{
  subservice: Subservice;
  service: Service;
  categories: ProductCategory[];
  products: Product[];
} | undefined> {
  await delay(SIMULATED_DELAY);
  
  const subservice = SUBSERVICES.find(sub => sub.slug === subserviceSlug);
  if (!subservice) return undefined;
  
  const service = SERVICES.find(s => s.id === subservice.serviceId);
  if (!service) return undefined;
  
  const categories = PRODUCT_CATEGORIES
    .filter(cat => cat.subserviceId === subservice.id)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  
  const categoryIds = categories.map(cat => cat.id);
  const products = PRODUCTS.filter(p => categoryIds.includes(p.categoryId));
  
  return { subservice, service, categories, products };
}

// =============================================================================
// HERO SLIDES
// =============================================================================

/**
 * Get all hero slides for homepage carousel
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  await delay(SIMULATED_DELAY);
  return HERO_SLIDES;
}

// =============================================================================
// COMPANY INFO
// =============================================================================

/**
 * Get company information
 */
export function getCompanyInfo() {
  return COMPANY_INFO;
}

// =============================================================================
// NAVIGATION DATA
// =============================================================================

/**
 * Get navigation menu data (services with their subservices)
 */
export async function getNavigationData(): Promise<{
  services: (Service & { subservices: Subservice[] })[];
}> {
  await delay(SIMULATED_DELAY);
  
  const servicesWithSubs = SERVICES.map(service => ({
    ...service,
    subservices: SUBSERVICES.filter(sub => sub.serviceId === service.id),
  }));
  
  return { services: servicesWithSubs };
}
