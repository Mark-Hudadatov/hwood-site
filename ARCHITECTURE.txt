# Project Architecture & Scalability Guide

This document defines the high-level architecture, domain model, and directory structure for the "H-Wood" Biesse application. It serves as a blueprint for migrating from the current prototype to a production-ready, multi-layered application.

## 1. Domain Model

The application follows a strict hierarchical structure. `types.ts` must always remain in sync with these definitions.

### Entities
*   **Service**: Top-level offering (e.g., "Wood", "Glass", "Stone").
*   **Subservice**: Specific technological process (e.g., "Drilling", "Cutting", "Edging").
*   **ProductCategory**: Grouping of machines within a subservice (e.g., "Dowel", "Throughfeed").
*   **Product**: Actual machine/SKU (e.g., "Rover Drill Up D H").

### Relationships
*   **Service** `1` — `*` **Subservice**
*   **Subservice** `1` — `*` **ProductCategory**
*   **ProductCategory** `1` — `*` **Product**

## 2. Navigation & Routing (Future State)

The application will transition from state-based views to a URL-driven router (React Router) to support deep linking and SEO.

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Dashboard with "Industries" and "What's Next" |
| `/services` | `ServicesListPage` | List of all services (Wood, Glass, etc.) |
| `/services/:serviceSlug` | `ServicePage` | Hero + Carousel of Subservices (e.g., Wood page) |
| `/subservices/:subserviceSlug` | `SubservicePage` | Tabs for Categories + Product Grid (e.g., Drilling page) |
| `/products/:productSlug` | `ProductPage` | Split layout: Visuals + Configurator (e.g., Rover Drill page) |
| `/admin/*` | `AdminLayout` | Protected routes for CMS |

## 3. Directory Structure

This structure separates concerns between UI, Business Logic, and Data.

```text
src/
  main.tsx              # ReactDOM + <BrowserRouter>
  App.tsx               # Root component, only renders <RouterProvider>
  router.tsx            # All route definitions

  types.ts              # Canonical domain model (MUST be always in context for AI)

  pages/
    HomePage.tsx
    ServicePage.tsx             # /services/:serviceSlug
    SubservicePage.tsx          # /subservices/:subserviceSlug
    ProductPage.tsx             # /products/:productSlug
    AboutPage.tsx
    ContactPage.tsx

    admin/
      AdminLayout.tsx
      AdminDashboardPage.tsx
      AdminProductsPage.tsx     # later

  components/
    layout/
      Header.tsx
      Footer.tsx
      MainLayout.tsx            # Public layout with header + footer + <Outlet/>
    navigation/
      Breadcrumbs.tsx
      ServiceNav.tsx
    service/
      ServiceCard.tsx
      ServiceList.tsx
    subservice/
      SubserviceCard.tsx
      SubserviceList.tsx
      ProductCategoryTabs.tsx   # tabs for upper/base/tall/islands
    product/
      ProductCard.tsx
      ProductGrid.tsx
    common/
      Button.tsx
      Section.tsx               # “one screen – one idea” container

  services/
    data/
      mockData.ts               # raw arrays for services/subservices/categories/products
      dataService.ts            # async functions wrapping mockData
    api/
      # future: real DB / WordPress / Supabase client

  features/
    productConfigurator/
      ProductConfiguratorContext.tsx
      useProductConfigurator.ts
      steps/
        StepService.tsx
        StepSubservice.tsx
        StepCategory.tsx
        StepParameters.tsx
        StepSummary.tsx

  lib/
    validation/
      productSchemas.ts         # Zod schemas (later)

  styles/
    globals.css
```

## 4. Key Engineering Principles

### State Management
*   **Global UI State**: Use React Context (e.g., `ProductConfiguratorContext`) for multi-step flows where data needs to persist across different URL segments.
*   **Server State**: Use React Query (TanStack Query) when fetching data from the real API to handle caching and loading states automatically.

### The "Memory" Strategy for AI
When requesting changes, provide the AI with limited context to avoid hallucinations:
1.  **Always** provide `types.ts`.
2.  **Only** provide the components relevant to the specific feature (e.g., only `SubservicePage.tsx` and `ProductCard.tsx` when styling the grid).
3.  **Never** dump the entire codebase into the prompt.

### Data Layer
*   Start with `mockData.ts` (arrays).
*   Access data via `dataService.ts` (async functions).
*   This abstraction allows swapping the backend (e.g., to Supabase) without rewriting React components.
