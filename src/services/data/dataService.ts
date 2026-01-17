/**
 * DATA SERVICE - SUPABASE VERSION
 * ================================
 * Fetches data from Supabase database.
 * Supports bilingual content (EN/HE).
 * Only returns visible items for public site.
 */

import { supabase, getLocalizedField } from '../supabase';
import {
  Service,
  Subservice,
  ProductCategory,
  Product,
  Story,
} from '../../domain/types';

// Current language - will be set by i18n
let currentLang: 'en' | 'he' = 'en';

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
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return (data || []).map(transformService);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return undefined;
  return transformService(data);
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return transformService(data);
}

// =============================================================================
// SUBSERVICES
// =============================================================================

export async function getSubservices(): Promise<Subservice[]> {
  const { data, error } = await supabase
    .from('subservices')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching subservices:', error);
    return [];
  }

  return (data || []).map(transformSubservice);
}

export async function getSubservicesByServiceId(serviceId: string): Promise<Subservice[]> {
  const { data, error } = await supabase
    .from('subservices')
    .select('*')
    .eq('service_id', serviceId)
    .order('sort_order', { ascending: true });

  if (error) return [];
  return (data || []).map(transformSubservice);
}

export async function getSubservicesByServiceSlug(serviceSlug: string): Promise<Subservice[]> {
  const service = await getServiceBySlug(serviceSlug);
  if (!service) return [];
  return getSubservicesByServiceId(service.id);
}

export async function getSubserviceBySlug(slug: string): Promise<Subservice | undefined> {
  const { data, error } = await supabase
    .from('subservices')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return undefined;
  return transformSubservice(data);
}

export async function getSubserviceById(id: string): Promise<Subservice | undefined> {
  const { data, error } = await supabase
    .from('subservices')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return transformSubservice(data);
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
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return [];
  return (data || []).map(transformCategory);
}

export async function getCategoriesBySubserviceId(subserviceId: string): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('subservice_id', subserviceId)
    .order('sort_order', { ascending: true });

  if (error) return [];
  return (data || []).map(transformCategory);
}

export async function getCategoriesBySubserviceSlug(subserviceSlug: string): Promise<ProductCategory[]> {
  const subservice = await getSubserviceBySlug(subserviceSlug);
  if (!subservice) return [];
  return getCategoriesBySubserviceId(subservice.id);
}

export async function getCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return undefined;
  return transformCategory(data);
}

// =============================================================================
// PRODUCTS
// =============================================================================

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return [];
  return (data || []).map(transformProduct);
}

export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: true });

  if (error) return [];
  return (data || []).map(transformProduct);
}

export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  return getProductsByCategoryId(category.id);
}

export async function getProductsBySubserviceSlug(subserviceSlug: string): Promise<Product[]> {
  const categories = await getCategoriesBySubserviceSlug(subserviceSlug);
  if (categories.length === 0) return [];

  const categoryIds = categories.map(c => c.id);
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('category_id', categoryIds)
    .order('sort_order', { ascending: true });

  if (error) return [];
  return (data || []).map(transformProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return undefined;
  return transformProduct(data);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return transformProduct(data);
}

export async function getProductWithBreadcrumb(slug: string): Promise<{
  product: Product;
  category: ProductCategory;
  subservice: Subservice;
  service: Service;
} | undefined> {
  const product = await getProductBySlug(slug);
  if (!product) return undefined;

  const category = await getCategoryBySlug(
    (await supabase.from('product_categories').select('slug').eq('id', product.categoryId).single()).data?.slug || ''
  );
  if (!category) return undefined;

  const { data: catData } = await supabase
    .from('product_categories')
    .select('subservice_id')
    .eq('id', product.categoryId)
    .single();
  
  if (!catData) return undefined;

  const subservice = await getSubserviceById(catData.subservice_id);
  if (!subservice) return undefined;

  const service = await getServiceById(subservice.serviceId);
  if (!service) return undefined;

  return { product, category, subservice, service };
}

// =============================================================================
// STORIES
// =============================================================================

export async function getStories(): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('date', { ascending: false });

  if (error) return [];
  return (data || []).map(transformStory);
}

export async function addStory(story: Story): Promise<Story> {
  return story; // Placeholder - admin handles this
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
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return [];
  
  return (data || []).map(row => ({
    id: String(row.id),
    title: getLocalizedField(row, 'title', currentLang),
    subtitle: getLocalizedField(row, 'subtitle', currentLang),
    imageUrl: String(row.image_url || ''),
    ctaText: getLocalizedField(row, 'cta_text', currentLang) || undefined,
    ctaLink: row.cta_link ? String(row.cta_link) : undefined,
  }));
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

export async function getCompanyInfo(): Promise<CompanyInfo> {
  const { data, error } = await supabase
    .from('company_info')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) {
    return {
      name: 'HWOOD',
      tagline: '',
      description: '',
      phone: '',
      email: '',
      address: '',
    };
  }

  return {
    name: getLocalizedField(data, 'name', currentLang),
    tagline: getLocalizedField(data, 'tagline', currentLang),
    description: getLocalizedField(data, 'description', currentLang),
    phone: String(data.phone || ''),
    email: String(data.email || ''),
    address: getLocalizedField(data, 'address', currentLang),
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`title_en.ilike.%${query}%,title_he.ilike.%${query}%,description_en.ilike.%${query}%`)
    .order('sort_order', { ascending: true });

  if (error) return [];
  return (data || []).map(transformProduct);
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
