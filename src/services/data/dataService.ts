/**
 * DATA SERVICE - SUPABASE + FALLBACK VERSION
 * ==========================================
 * Fetches data from Supabase database.
 * Falls back to mockData if Supabase is unavailable.
 * Supports bilingual content (EN/HE).
 */

import { supabase, getLocalizedField } from '../supabase';
import {
  Service,
  Subservice,
  ProductCategory,
  Product,
  Story,
} from '../../domain/types';

// Fallback imports
import {
  SERVICES as MOCK_SERVICES,
  SUBSERVICES as MOCK_SUBSERVICES,
  PRODUCT_CATEGORIES as MOCK_CATEGORIES,
  PRODUCTS as MOCK_PRODUCTS,
  STORIES as MOCK_STORIES,
  HERO_SLIDES as MOCK_HERO_SLIDES,
  COMPANY_INFO as MOCK_COMPANY_INFO,
  HeroSlide as MockHeroSlide,
} from './mockData';

// Current language - will be set by i18n
let currentLang: 'en' | 'he' = 'en';

// Flag to track if Supabase has data
let useSupabase = true;

export function setLanguage(lang: 'en' | 'he') {
  currentLang = lang;
}

export function getLanguage(): 'en' | 'he' {
  return currentLang;
}

// Transform database row to app format
function transformService(row: Record<string, unknown>): Service {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: getLocalizedField(row, 'title', currentLang),
    description: getLocalizedField(row, 'description', currentLang),
    imageUrl: String(row.image_url || ''),
    heroImageUrl: row.hero_image_url ? String(row.hero_image_url) : undefined,
    accentColor: row.accent_color ? String(row.accent_color) : undefined,
  };
}

function transformSubservice(row: Record<string, unknown>): Subservice {
  return {
    id: String(row.id),
    slug: String(row.slug),
    serviceId: String(row.service_id),
    title: getLocalizedField(row, 'title', currentLang),
    description: getLocalizedField(row, 'description', currentLang),
    imageUrl: String(row.image_url || ''),
    heroImageUrl: row.hero_image_url ? String(row.hero_image_url) : undefined,
  };
}

function transformCategory(row: Record<string, unknown>): ProductCategory {
  return {
    id: String(row.id),
    slug: String(row.slug),
    subserviceId: String(row.subservice_id),
    title: getLocalizedField(row, 'title', currentLang),
    description: getLocalizedField(row, 'description', currentLang),
    sortOrder: Number(row.sort_order) || 0,
  };
}

function transformProduct(row: Record<string, unknown>): Product {
  const featuresKey = currentLang === 'he' ? 'features_he' : 'features_en';
  const features = Array.isArray(row[featuresKey]) ? row[featuresKey] : 
                   Array.isArray(row.features_en) ? row.features_en : [];
  
  return {
    id: String(row.id),
    slug: String(row.slug),
    categoryId: String(row.category_id),
    title: getLocalizedField(row, 'title', currentLang),
    subtitle: getLocalizedField(row, 'subtitle', currentLang) || undefined,
    description: getLocalizedField(row, 'description', currentLang),
    imageUrl: String(row.image_url || ''),
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images as string[] : [],
    videoUrl: row.video_url ? String(row.video_url) : undefined,
    features: features as string[],
    specifications: Array.isArray(row.specifications) ? row.specifications as { label: string; value: string; unit?: string }[] : [],
    has3DView: Boolean(row.has_3d_view),
  };
}

function transformStory(row: Record<string, unknown>): Story {
  return {
    id: String(row.id),
    title: getLocalizedField(row, 'title', currentLang),
    date: String(row.date),
    type: row.type as 'EVENTS' | 'CUSTOMER STORY',
    imageUrl: String(row.image_url || ''),
  };
}

// =============================================================================
// SERVICES
// =============================================================================

export async function getServices(): Promise<Service[]> {
  if (!useSupabase) return MOCK_SERVICES;
  
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      console.log('Using mock data for services');
      useSupabase = false;
      return MOCK_SERVICES;
    }

    return data.map(transformService);
  } catch (e) {
    console.log('Supabase error, using mock data:', e);
    useSupabase = false;
    return MOCK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  if (!useSupabase) return MOCK_SERVICES.find(s => s.slug === slug);
  
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return MOCK_SERVICES.find(s => s.slug === slug);
    }
    return transformService(data);
  } catch {
    return MOCK_SERVICES.find(s => s.slug === slug);
  }
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  if (!useSupabase) return MOCK_SERVICES.find(s => s.id === id);
  
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return MOCK_SERVICES.find(s => s.id === id);
    }
    return transformService(data);
  } catch {
    return MOCK_SERVICES.find(s => s.id === id);
  }
}

// =============================================================================
// SUBSERVICES
// =============================================================================

export async function getSubservices(): Promise<Subservice[]> {
  if (!useSupabase) return MOCK_SUBSERVICES;
  
  try {
    const { data, error } = await supabase
      .from('subservices')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_SUBSERVICES;
    }
    return data.map(transformSubservice);
  } catch {
    return MOCK_SUBSERVICES;
  }
}

export async function getSubservicesByServiceId(serviceId: string): Promise<Subservice[]> {
  if (!useSupabase) return MOCK_SUBSERVICES.filter(sub => sub.serviceId === serviceId);
  
  try {
    const { data, error } = await supabase
      .from('subservices')
      .select('*')
      .eq('service_id', serviceId)
      .order('sort_order', { ascending: true });

    if (error || !data) {
      return MOCK_SUBSERVICES.filter(sub => sub.serviceId === serviceId);
    }
    return data.map(transformSubservice);
  } catch {
    return MOCK_SUBSERVICES.filter(sub => sub.serviceId === serviceId);
  }
}

export async function getSubservicesByServiceSlug(serviceSlug: string): Promise<Subservice[]> {
  const service = await getServiceBySlug(serviceSlug);
  if (!service) return [];
  return getSubservicesByServiceId(service.id);
}

export async function getSubserviceBySlug(slug: string): Promise<Subservice | undefined> {
  if (!useSupabase) return MOCK_SUBSERVICES.find(sub => sub.slug === slug);
  
  try {
    const { data, error } = await supabase
      .from('subservices')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return MOCK_SUBSERVICES.find(sub => sub.slug === slug);
    }
    return transformSubservice(data);
  } catch {
    return MOCK_SUBSERVICES.find(sub => sub.slug === slug);
  }
}

export async function getSubserviceById(id: string): Promise<Subservice | undefined> {
  if (!useSupabase) return MOCK_SUBSERVICES.find(sub => sub.id === id);
  
  try {
    const { data, error } = await supabase
      .from('subservices')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return MOCK_SUBSERVICES.find(sub => sub.id === id);
    }
    return transformSubservice(data);
  } catch {
    return MOCK_SUBSERVICES.find(sub => sub.id === id);
  }
}

export async function getSubserviceWithParent(slug: string): Promise<{
  subservice: Subservice;
  service: Service;
} | undefined> {
  const subservice = await getSubserviceBySlug(slug);
  if (!subservice) return undefined;

  const service = await getServiceById(subservice.serviceId);
  if (!service) return undefined;

  return { subservice, service };
}

// =============================================================================
// PRODUCT CATEGORIES
// =============================================================================

export async function getProductCategories(): Promise<ProductCategory[]> {
  if (!useSupabase) return MOCK_CATEGORIES;
  
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_CATEGORIES;
    }
    return data.map(transformCategory);
  } catch {
    return MOCK_CATEGORIES;
  }
}

export async function getCategoriesBySubserviceId(subserviceId: string): Promise<ProductCategory[]> {
  if (!useSupabase) {
    return MOCK_CATEGORIES
      .filter(cat => cat.subserviceId === subserviceId)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }
  
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('subservice_id', subserviceId)
      .order('sort_order', { ascending: true });

    if (error || !data) {
      return MOCK_CATEGORIES
        .filter(cat => cat.subserviceId === subserviceId)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }
    return data.map(transformCategory);
  } catch {
    return MOCK_CATEGORIES
      .filter(cat => cat.subserviceId === subserviceId)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }
}

export async function getCategoriesBySubserviceSlug(subserviceSlug: string): Promise<ProductCategory[]> {
  const subservice = await getSubserviceBySlug(subserviceSlug);
  if (!subservice) return [];
  return getCategoriesBySubserviceId(subservice.id);
}

export async function getCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
  if (!useSupabase) return MOCK_CATEGORIES.find(cat => cat.slug === slug);
  
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return MOCK_CATEGORIES.find(cat => cat.slug === slug);
    }
    return transformCategory(data);
  } catch {
    return MOCK_CATEGORIES.find(cat => cat.slug === slug);
  }
}

export async function getCategoryById(id: string): Promise<ProductCategory | undefined> {
  if (!useSupabase) return MOCK_CATEGORIES.find(cat => cat.id === id);
  
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return MOCK_CATEGORIES.find(cat => cat.id === id);
    }
    return transformCategory(data);
  } catch {
    return MOCK_CATEGORIES.find(cat => cat.id === id);
  }
}

// =============================================================================
// PRODUCTS
// =============================================================================

export async function getProducts(): Promise<Product[]> {
  if (!useSupabase) return MOCK_PRODUCTS;
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_PRODUCTS;
    }
    return data.map(transformProduct);
  } catch {
    return MOCK_PRODUCTS;
  }
}

export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  if (!useSupabase) return MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true });

    if (error || !data) {
      return MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
    }
    return data.map(transformProduct);
  } catch {
    return MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
  }
}

export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  return getProductsByCategoryId(category.id);
}

export async function getProductsBySubserviceSlug(subserviceSlug: string): Promise<Product[]> {
  const categories = await getCategoriesBySubserviceSlug(subserviceSlug);
  if (categories.length === 0) return [];

  if (!useSupabase) {
    const categoryIds = categories.map(c => c.id);
    return MOCK_PRODUCTS.filter(p => categoryIds.includes(p.categoryId));
  }

  const categoryIds = categories.map(c => c.id);
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('category_id', categoryIds)
      .order('sort_order', { ascending: true });

    if (error || !data) {
      return MOCK_PRODUCTS.filter(p => categoryIds.includes(p.categoryId));
    }
    return data.map(transformProduct);
  } catch {
    return MOCK_PRODUCTS.filter(p => categoryIds.includes(p.categoryId));
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!useSupabase) return MOCK_PRODUCTS.find(p => p.slug === slug);
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return MOCK_PRODUCTS.find(p => p.slug === slug);
    }
    return transformProduct(data);
  } catch {
    return MOCK_PRODUCTS.find(p => p.slug === slug);
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!useSupabase) return MOCK_PRODUCTS.find(p => p.id === id);
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return MOCK_PRODUCTS.find(p => p.id === id);
    }
    return transformProduct(data);
  } catch {
    return MOCK_PRODUCTS.find(p => p.id === id);
  }
}

export async function getProductWithBreadcrumb(slug: string): Promise<{
  product: Product;
  category: ProductCategory;
  subservice: Subservice;
  service: Service;
} | undefined> {
  const product = await getProductBySlug(slug);
  if (!product) return undefined;

  const category = await getCategoryById(product.categoryId);
  if (!category) return undefined;

  const subservice = await getSubserviceById(category.subserviceId);
  if (!subservice) return undefined;

  const service = await getServiceById(subservice.serviceId);
  if (!service) return undefined;

  return { product, category, subservice, service };
}

// =============================================================================
// STORIES
// =============================================================================

export async function getStories(): Promise<Story[]> {
  if (!useSupabase) return MOCK_STORIES;
  
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('date', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_STORIES;
    }
    return data.map(transformStory);
  } catch {
    return MOCK_STORIES;
  }
}

export async function addStory(story: Story): Promise<Story> {
  return story;
}

// =============================================================================
// HERO SLIDES
// =============================================================================

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  if (!useSupabase) return MOCK_HERO_SLIDES;
  
  try {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_HERO_SLIDES;
    }
    
    return data.map(row => ({
      id: String(row.id),
      title: getLocalizedField(row, 'title', currentLang),
      subtitle: getLocalizedField(row, 'subtitle', currentLang),
      imageUrl: String(row.image_url || ''),
      ctaText: getLocalizedField(row, 'cta_text', currentLang) || undefined,
      ctaLink: row.cta_link ? String(row.cta_link) : undefined,
    }));
  } catch {
    return MOCK_HERO_SLIDES;
  }
}

// =============================================================================
// COMPANY INFO
// =============================================================================

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
}

// Keep sync version for backward compatibility
export function getCompanyInfo(): CompanyInfo {
  return MOCK_COMPANY_INFO;
}

// Async version that uses Supabase
export async function getCompanyInfoAsync(): Promise<CompanyInfo> {
  if (!useSupabase) return MOCK_COMPANY_INFO;
  
  try {
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('id', 1)
      .single();

    if (error || !data) {
      return MOCK_COMPANY_INFO;
    }

    return {
      name: getLocalizedField(data, 'name', currentLang) || MOCK_COMPANY_INFO.name,
      tagline: getLocalizedField(data, 'tagline', currentLang) || MOCK_COMPANY_INFO.tagline,
      description: getLocalizedField(data, 'description', currentLang) || MOCK_COMPANY_INFO.description,
      phone: String(data.phone || MOCK_COMPANY_INFO.phone),
      email: String(data.email || MOCK_COMPANY_INFO.email),
      address: getLocalizedField(data, 'address', currentLang) || MOCK_COMPANY_INFO.address,
    };
  } catch {
    return MOCK_COMPANY_INFO;
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export async function searchProducts(query: string): Promise<Product[]> {
  const lowerQuery = query.toLowerCase();
  
  if (!useSupabase) {
    return MOCK_PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.subtitle?.toLowerCase().includes(lowerQuery)
    );
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`title_en.ilike.%${query}%,title_he.ilike.%${query}%,description_en.ilike.%${query}%`)
      .order('sort_order', { ascending: true });

    if (error || !data) {
      return MOCK_PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }
    return data.map(transformProduct);
  } catch {
    return MOCK_PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
}

export async function getHomepageData(): Promise<{
  services: Service[];
  stories: Story[];
}> {
  const [services, stories] = await Promise.all([
    getServices(),
    getStories(),
  ]);
  return { services, stories };
}

export async function getSubservicePageData(subserviceSlug: string): Promise<{
  subservice: Subservice;
  service: Service;
  categories: ProductCategory[];
  products: Product[];
} | undefined> {
  const result = await getSubserviceWithParent(subserviceSlug);
  if (!result) return undefined;

  const categories = await getCategoriesBySubserviceId(result.subservice.id);
  const products = await getProductsBySubserviceSlug(subserviceSlug);

  return {
    ...result,
    categories,
    products,
  };
}

export async function getNavigationData(): Promise<{
  services: (Service & { subservices: Subservice[] })[];
}> {
  const services = await getServices();
  const subservices = await getSubservices();

  const servicesWithSubs = services.map(service => ({
    ...service,
    subservices: subservices.filter(sub => sub.serviceId === service.id),
  }));

  return { services: servicesWithSubs };
}
