/**
 * ROUTER CONFIGURATION
 * ====================
 * Centralized route definitions using React Router v7.
 * 
 * ROUTES:
 * /                              → HomePage (services list)
 * /services/:serviceSlug         → ServicePage (subservices carousel)
 * /subservices/:subserviceSlug   → SubservicePage (category tabs + product grid)
 * /products/:productSlug         → ProductPage (product detail + configurator)
 * /quote/:productSlug            → QuotePage (quote request form) - future
 */

import { createBrowserRouter, RouteObject } from 'react-router-dom';

// Layout
import { MainLayout } from './layouts/MainLayout';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';
import { SubservicePage } from './pages/SubservicePage';
import { ProductPage } from './pages/ProductPage';

// Error boundary (inline for now)
const ErrorPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-8">Page not found</p>
      <a 
        href="/" 
        className="px-6 py-3 bg-[#005f5f] text-white rounded-lg hover:bg-[#004d4d] transition-colors"
      >
        Back to Home
      </a>
    </div>
  </div>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services/:serviceSlug',
        element: <ServicePage />,
      },
      {
        path: 'subservices/:subserviceSlug',
        element: <SubservicePage />,
      },
      {
        path: 'products/:productSlug',
        element: <ProductPage />,
      },
      // Future: Quote request page
      // {
      //   path: 'quote/:productSlug',
      //   element: <QuotePage />,
      // },
    ],
  },
];

export const router = createBrowserRouter(routes);

// Export route paths as constants for type-safe navigation
export const ROUTES = {
  HOME: '/',
  SERVICE: (slug: string) => `/services/${slug}`,
  SUBSERVICE: (slug: string) => `/subservices/${slug}`,
  PRODUCT: (slug: string) => `/products/${slug}`,
  QUOTE: (productSlug: string) => `/quote/${productSlug}`,
} as const;
