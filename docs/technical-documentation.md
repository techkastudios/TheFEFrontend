# The Financial Express - Technical Documentation

## 1. Project Overview

### Purpose
The Financial Express is a news website focused on financial, economic, and business news from Bangladesh and around the world. It serves as a digital platform for delivering news content across multiple categories including economy, stock market, trade, national politics, and international affairs.

### Target Users
- General readers interested in financial and economic news
- Investors and traders seeking market updates
- Professionals in the business and finance sector
- Researchers and students

### Core Business Domain
- Financial news and market analysis
- Stock market reporting (Dhaka Stock Exchange, global markets)
- Economic policy and trends
- Business and trade news
- Political and national news

### Application Type
- **Nuxt 2 SSR (Server-Side Rendering)** application
- Supports PWA (Progressive Web App) features
- Multi-language support (English and Bangla)
- Responsive design for mobile and desktop

### Key Technologies
- **Framework**: Nuxt 2.15.7
- **Language**: TypeScript
- **State Management**: Pinia 2.0.14
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Shadcn Vue, Bootstrap Vue, Headless UI
- **Icons**: FontAwesome 6.1.1
- **Date Handling**: Day.js
- **Animations**: Anime.js, Typed.js
- **Carousel**: Vue Slick Carousel
- **Social Sharing**: Vue Social Sharing
- **Ads**: Google AdSense, custom ad management
- **PWA**: @nuxtjs/pwa
- **Internationalization**: @nuxtjs/i18n
- **HTTP Client**: @nuxtjs/axios
- **Composition API**: @nuxtjs/composition-api
- **VueUse**: @vueuse/core

### Deployment Assumptions
- Production server: Node.js environment
- CDN: DigitalOcean Spaces for static assets
- API: RESTful API at `https://api.thefinancialexpress.com.bd`
- PM2 for process management
- SSL certificate required
- Environment variables for configuration

---

## 2. Architecture Overview

### 2.1 Nuxt Mode
- **Rendering Mode**: SSR (Server-Side Rendering)
- **Static Generation**: Not actively used (generate command available but not primary mode)
- **Runtime Config**: Uses both public and private runtime config for environment variables
- **Auto-imports**: Enabled for components and composables
- **File-based Routing**: Pages directory structure defines routes

### 2.2 Folder Structure Explanation

#### `pages/`
Contains all page-level components and routes. Nuxt automatically generates routes based on file structure:
- **Static pages**: `about-us.vue`, `contact-us.vue`, `privacy-policy.vue`, etc.
- **Category pages**: Dynamic routes for categories like `/economy`, `/stock`, `/national`
- **Subcategory pages**: Dynamic routes for subcategories
- **Post pages**: Dynamic routes for individual articles
- **Reporter pages**: Dynamic routes for reporter profiles

**Custom Pattern**: The project uses a special `-category/`, `-subcategory/`, and `-post/` directory structure for dynamic routes, which is extended in `nuxt.config.js` router.extendRoutes.

#### `components/`
Organized into subdirectories by feature area:
- **Global components**: `TheHeader.vue`, `TheFooter.vue`, `TheSidebar.vue`, `TheScrollBar.vue`
- **Home components**: `home/` directory with layout components
- **Category components**: `category/` directory with category-specific layouts
- **Common components**: `common/` directory with reusable UI elements
- **Ad components**: `VAds.vue`, `VModalAds.vue`, `VAdsCarousel.vue`

**Custom Pattern**: Components are organized by feature area with clear naming conventions. Some components use lazy loading (`LazyHomeCategoryBangla`, `LazyHomeMainLeftColumn`).

#### `layouts/`
Contains layout templates:
- **default.vue**: Main layout with header, sidebar, main content area, and footer

#### `store/`
Pinia store modules for state management:
- **ads/**: Multiple store modules for different ad positions (home, category, modal, global, adTrack)
- **index.ts**: Root store (minimal, mostly unused)

**Custom Pattern**: Ad management is split into multiple stores based on page context, following a feature-based organization.

#### `plugins/`
Global plugins and configuration:
- **fontawesome.ts**: FontAwesome icon library setup
- **global-components.js**: Global component registration
- **mixins.js**: Vue mixins for shared functionality (date formatting)
- **vue-click-outside.js**: Click-outside directive
- **vue-slick-carousel.client.js**: Carousel plugin
- **vue-google-adsense.client.js**: Google AdSense integration

**Custom Pattern**: Uses both TypeScript and JavaScript plugins, with client-side only plugins marked with `.client` suffix.

#### `assets/`
Static assets:
- **css/**: Custom CSS files (common.css, fonts.css, style.scss, tailwind.css)
- **fonts/**: Custom font files (Avenir, Avenir LT Std, Merriweather Sans, Richmond)
- **images/**: Images and logos
- **ads/**: Ad images

**Custom Pattern**: Custom font system with multiple font families for different use cases (display, text, sans-serif).

#### `static/`
Static files served at root level:
- `favicon.ico`
- `robots.txt`
- `js/analitics.js` (custom analytics script)
- `maintanance.html` (maintenance page)

#### `types/`
TypeScript type definitions:
- `ads.ts`: Advertisement and ad position types
- `posts.ts`: Post, category, and reporter types
- `category.ts`: Category-specific types
- `filter.ts`: Filter types
- `slider.ts`: Slider types
- `latest-post.ts`: Latest post types
- `media.ts`: Media types

**Custom Pattern**: Comprehensive TypeScript types for all data structures.

#### `locales/`
Internationalization files:
- `en.js`: English translations
- `bn.js`: Bangla translations

**Custom Pattern**: Extensive translation files with nested structure for menus, headings, and other UI elements.

#### `middleware/`
No middleware files found. Authentication and route guards are not implemented.

#### `server/`
No server directory found. All API calls are made from the client side.

#### `utils/` (if exists)
No utils directory found. Utility functions are either in plugins or inline in components.

#### `services/` (if exists)
No services directory found. API calls are made directly from components using `$axios`.

---

## 3. Feature Documentation

### 3.1 News Feed and Content Display
**Business Purpose**: Display news articles organized by categories and subcategories

**Pages Involved**:
- `pages/index.vue` (Home page)
- `pages/-category/*.vue` (Category pages)
- `pages/-subcategory/index.vue` (Subcategory pages)
- `pages/-post/index.vue` (Single post page)

**Components Involved**:
- `Post.vue` (Article card component)
- `VCard.vue` (Reusable card component)
- `VCategory.vue` (Category display)
- `VCategoryTime.vue` (Category with timestamp)
- `CategoryMediaLeftRight.vue` (Media layout)
- `CategoryMediaTopLeft.vue` (Media layout)
- `CategoryPostTitle.vue` (Title-only layout)
- `CategoryMediaLeftRightV2.vue` (Alternative media layout)

**Store Modules Used**:
- `ads/home.ts` (Home page ads)
- `ads/category.ts` (Category page ads)
- `ads/modal.ts` (Modal ads)

**APIs Used**:
- `api/{lang}/home/post/column4` (Home page posts)
- `api/{lang}/category/{category}/slider` (Category slider)
- `api/{lang}/category/{category}/{subcategory}` (Subcategory posts)

**Middleware Used**: None

**Dependencies**:
- `@nuxtjs/axios` for API calls
- `@vueuse/core` for intersection observer

**Potential Risks or Weaknesses**:
- Direct API calls in components (no service layer)
- No error handling visible in components
- No loading states for API calls
- No pagination implementation visible

### 3.2 Ad Management System
**Business Purpose**: Display and track advertisements across the website

**Pages Involved**:
- All pages (ads injected via components and layout)

**Components Involved**:
- `VAds.vue` (Ad display component)
- `VModalAds.vue` (Modal ad component)
- `VAdsCarousel.vue` (Carousel ad component)
- `VTopModalAds.vue` (Top modal ads)
- `VFooterModalAds.vue` (Footer modal ads)

**Store Modules Used**:
- `ads/home.ts` (Home page ad positions)
- `ads/category.ts` (Category page ad positions)
- `ads/modal.ts` (Modal ad positions)
- `ads/global.ts` (Global page ads)
- `ads/adTrack.ts` (Ad tracking)

**APIs Used**:
- `https://api.thefinancialexpress.com.bd/api/revenue/home` (Home ads)
- `https://api.thefinancialexpress.com.bd/api/revenue/category` (Category ads)
- `https://api.thefinancialexpress.com.bd/api/revenue/modal_ad` (Modal ads)
- `https://api.thefinancialexpress.com.bd/api/revenue/global` (Global ads)
- `https://api.thefinancialexpress.com.bd/api/ads/{id}/view` (Track view)
- `https://api.thefinancialexpress.com.bd/api/ads/{id}/click` (Track click)

**Middleware Used**: None

**Dependencies**:
- Google AdSense (client-side)
- Custom ad tracking system

**Potential Risks or Weaknesses**:
- Ad tracking uses direct fetch calls (no axios)
- No fallback to Google AdSense when custom ads fail
- Modal ads may block content
- No ad refresh strategy

### 3.3 Multi-language Support
**Business Purpose**: Provide content in both English and Bangla

**Pages Involved**:
- All pages

**Components Involved**:
- `LanguageToggleButton.vue` (Language switcher)
- `components/home/category/Bangla.vue` (Bangla category component)

**Store Modules Used**: None

**APIs Used**: None

**Middleware Used**: None

**Dependencies**:
- `@nuxtjs/i18n` for internationalization
- `locales/en.js` and `locales/bn.js` for translations

**Potential Risks or Weaknesses**:
- Language toggle redirects to external site (not implemented in code)
- No language persistence across pages
- No translation coverage tracking
- Bangla content is placeholder only

### 3.4 Search Functionality
**Business Purpose**: Allow users to search for news articles

**Pages Involved**:
- `pages/old-search.vue` (Search page - legacy)
- `pages/search/index.vue` (Search page)

**Components Involved**:
- `components/JustInPost.vue` (Just-in news component)

**Store Modules Used**: None

**APIs Used**:
- Search API endpoints (not visible in analyzed code)

**Middleware Used**: None

**Dependencies**:
- Google Custom Search Engine (CSE) integration in head

**Potential Risks or Weaknesses**:
- Legacy search page exists but not used
- No search history or suggestions
- No advanced search filters

### 3.5 Election Countdown
**Business Purpose**: Display countdown to national election

**Pages Involved**:
- `components/VElectionCountDown.vue` (Countdown component)

**Components Involved**:
- `VElectionCountDown.vue` (Countdown display)

**Store Modules Used**: None

**APIs Used**: None

**Middleware Used**: None

**Dependencies**:
- None (hardcoded date)

**Potential Risks or Weaknesses**:
- Hardcoded date (2026-02-12)
- No API integration for dynamic dates
- No localization for Bangla

### 3.6 Social Sharing
**Business Purpose**: Enable users to share content on social media

**Pages Involved**:
- `pages/-post/index.vue` (Single post page)

**Components Involved**:
- `Post.vue` (Social share buttons)

**Store Modules Used**: None

**APIs Used**: None

**Middleware Used**: None

**Dependencies**:
- `vue-social-sharing` module
- `vue-google-adsense` for ad placement

**Potential Risks or Weaknesses**:
- No share tracking
- Limited social platforms
- No share count display

### 3.7 PWA Features
**Business Purpose**: Provide offline access and app-like experience

**Pages Involved**:
- All pages

**Components Involved**:
- None (PWA features are global)

**Store Modules Used**: None

**APIs Used**: None

**Middleware Used**: None

**Dependencies**:
- `@nuxtjs/pwa` module

**Potential Risks or Weaknesses**:
- No service worker caching strategy defined
- No offline fallback page
- No manifest customization

### 3.8 Analytics and Tracking
**Business Purpose**: Track user behavior and website performance

**Pages Involved**:
- All pages

**Components Involved**:
- None (analytics are global)

**Store Modules Used**:
- `ads/adTrack.ts` (Ad tracking)

**APIs Used**:
- Ad tracking APIs
- Google Analytics (via head script)

**Middleware Used**: None

**Dependencies**:
- Google Analytics (G-S2JHL9S4HZ)
- Custom `analitics.js` script
- Google Custom Search Engine

**Potential Risks or Weaknesses**:
- No user behavior tracking (page views, events)
- No conversion tracking
- No error tracking

---

## 4. Component Inventory

### 4.1 Global Components

#### TheHeader.vue
**Purpose**: Main navigation header with logo, menus, and language toggle

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsModalStore()` for modal ads

**External Dependencies**:
- FontAwesome icons
- Bootstrap Vue components

**Reusability**: High

**Key Features**:
- Responsive navigation
- Dropdown menus for categories
- Language toggle button
- Mobile menu toggle
- Search functionality

---

#### TheFooter.vue
**Purpose**: Main footer with links, social media, and copyright

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsModalStore()` for modal ads

**External Dependencies**:
- FontAwesome icons
- Bootstrap Vue components

**Reusability**: High

**Key Features**:
- Multi-column layout
- Social media links
- Newsletter signup
- Copyright information
- Quick links

---

#### TheSidebar.vue
**Purpose**: Sidebar navigation with category links

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- FontAwesome icons

**Reusability**: High

**Key Features**:
- Category navigation
- Dropdown menus
- Responsive design
- Mobile-friendly

---

#### TheScrollBar.vue
**Purpose**: Scroll-to-top button

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**: None

**Reusability**: High

**Key Features**:
- Scroll detection
- Smooth scroll animation
- Fade in/out effects

---

#### VAds.vue
**Purpose**: Display advertisements

**Props**:
- `ads` (Object): Advertisement data

**Emits**:
- None

**Pinia Usage**: Uses `useAdTrackStore()` for tracking

**External Dependencies**:
- None (custom ad display)

**Reusability**: High

**Key Features**:
- Multiple ad types (image, video, document, iframe)
- Mobile/desktop responsive
- Click tracking
- View tracking

---

#### VModalAds.vue
**Purpose**: Display modal advertisements

**Props**:
- `ads` (Object): Advertisement data

**Emits**:
- `toggleModal` (Boolean): Modal visibility state

**Pinia Usage**: Uses `useAdTrackStore()` for tracking

**External Dependencies**:
- None (custom modal)

**Reusability**: Medium

**Key Features**:
- Modal overlay
- Close button
- Click tracking
- View tracking

---

#### VCard.vue
**Purpose**: Reusable card component for displaying content

**Props**:
- `tag` (String): HTML tag (default: 'article')
- `title` (String): Card title
- `titleClass` (Array): Custom title classes
- `url` (String): Navigation link
- `image` (String): Image URL
- `imageClass` (Array): Custom image classes
- `text` (String): Card text content
- `categoryOnly` (Boolean): Show category only (default: true)
- `category` (String/Object): Category data
- `datetime` (String): Date/time
- `textfixedheight` (String): Fixed height class
- `customClass` (Object): Custom CSS classes

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VImg.vue`
- `VCategory.vue`
- `VCategoryTime.vue`
- `VHeading.vue`

**Reusability**: High

**Key Features**:
- Flexible content display
- Category and timestamp display
- Image support
- Custom styling options

---

#### VCategory.vue
**Purpose**: Display category information

**Props**:
- `category` (String/Object): Category data

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Category name display
- Category color support

---

#### VCategoryTime.vue
**Purpose**: Display category with timestamp

**Props**:
- `category` (String/Object): Category data
- `time` (String): Date/time

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Category and timestamp display
- Date formatting

---

#### VHeading.vue
**Purpose**: Display heading text

**Props**:
- None (uses default slot)

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Customizable heading styling
- Slot-based content

---

#### VImg.vue
**Purpose**: Image component with lazy loading

**Props**:
- `src` (String): Image URL
- `alt` (String): Alt text

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Lazy loading
- Responsive sizing

---

#### VSlider.vue
**Purpose**: Image slider/carousel component

**Props**:
- `category` (String): Category for slider content
- `slidertype` (String): Slider type (default: 'image')
- `bgcolor` (String): Background color (default: 'bg-amber-300')
- `slidestoshow` (Number): Number of slides to show (default: 1)

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- Vue Slick Carousel

**Reusability**: Medium

**Key Features**:
- Auto-play
- Responsive breakpoints
- Image captions
- Category-based content

---

#### LanguageToggleButton.vue
**Purpose**: Toggle between English and Bangla

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Toggle button UI
- Language persistence
- **Note**: Currently redirects to external site (not implemented)

---

#### VDialog.vue
**Purpose**: Dialog/modal component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- Headless UI

**Reusability**: High

**Key Features**:
- Dialog functionality
- Headless UI integration

---

#### VTabs.vue
**Purpose**: Tab component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- Headless UI

**Reusability**: High

**Key Features**:
- Tab navigation
- Headless UI integration

---

#### VThemeSwitch.vue
**Purpose**: Dark/light theme toggle

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Theme switching
- Local storage persistence

---

#### VContainer.vue
**Purpose**: Container component for layout

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Responsive container
- Padding management

---

#### VSlideUpDown.vue
**Purpose**: Slide up/down animation component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Medium

**Key Features**:
- Animation effects
- Toggle functionality

---

#### VTopModalAds.vue
**Purpose**: Top modal advertisement

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsModalStore()`

**External Dependencies**:
- None

**Reusability**: Medium

**Key Features**:
- Modal ad display
- Tracking integration

---

#### VFooterModalAds.vue
**Purpose**: Footer modal advertisement

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsModalStore()`

**External Dependencies**:
- None

**Reusability**: Medium

**Key Features**:
- Modal ad display
- Tracking integration

---

#### VAdsCarousel.vue
**Purpose**: Carousel advertisement component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsModalStore()`

**External Dependencies**:
- None

**Reusability**: Medium

**Key Features**:
- Carousel layout
- Ad display

---

#### JustInPost.vue
**Purpose**: "Just In" news component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Medium

**Key Features**:
- Latest news display
- Time-based sorting

---

#### ReporterMore.vue
**Purpose**: Reporter profile page component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- Reporter information
- Post listing

---

#### SubCategoryMore.vue
**Purpose**: Subcategory page component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- Subcategory content
- Post listing

---

#### SubCategoryInfinite.vue
**Purpose**: Infinite scroll subcategory component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- Infinite scroll
- Lazy loading

---

#### SubOne.vue
**Purpose**: Subcategory page component (variant)

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- Subcategory content
- Post listing

---

#### SubTwo.vue
**Purpose**: Subcategory page component (variant)

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- Subcategory content
- Post listing

---

#### ViewsChild.vue
**Purpose**: Views category page component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- Views content
- Post listing

---

### 4.2 Layout Components

#### default.vue
**Purpose**: Main application layout

**Props**: None

**Emits**: None

**Pinia Usage**:
- `useAdsGlobalStore()` for global ads
- `useAdsCategoryStore()` for category ads

**External Dependencies**:
- `TheHeader.vue`
- `TheSidebar.vue`
- `TheScrollBar.vue`
- `TheFooter.vue`

**Reusability**: High

**Key Features**:
- Header, sidebar, main content, footer layout
- SEO metadata (JSON-LD schema)
- Global ad injection
- Scroll to top button

---

### 4.3 Page-Level Components

#### index.vue (Home Page)
**Purpose**: Main homepage displaying news feed

**Props**: None

**Emits**: None

**Pinia Usage**:
- `useAdsHomeStore()` for home page ads

**External Dependencies**:
- Multiple home category components
- Ad components
- Lazy-loaded components

**Reusability**: Low (page-specific)

**Key Features**:
- Multi-column layout
- Category-based content
- Ad injection
- Responsive design
- Bangla placeholder content

---

#### -category/index.vue (Category Page)
**Purpose**: Generic category page

**Props**: None

**Emits**: None

**Pinia Usage**:
- `useAdsCategoryStore()` for category ads

**External Dependencies**:
- Category-specific components

**Reusability**: Low (page-specific)

**Key Features**:
- Dynamic category routing
- Ad injection
- Content display

---

#### -post/index.vue (Single Post Page)
**Purpose**: Display single article with related content

**Props**: None

**Emits**: None

**Pinia Usage**:
- `useAdsModalStore()` for modal ads

**External Dependencies**:
- `Post.vue`
- Social sharing components
- Ad components

**Reusability**: Low (page-specific)

**Key Features**:
- Article display
- Related posts
- Social sharing
- Ad injection
- Mobile optimization

---

#### -reporter/index.vue (Reporter Page)
**Purpose**: Display reporter profile and articles

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low (page-specific)

**Key Features**:
- Reporter information
- Article listing

---

#### -subcategory/index.vue (Subcategory Page)
**Purpose**: Display subcategory content

**Props**: None

**Emits**: None

**Pinia Usage**:
- `useAdsCategoryStore()` for category ads

**External Dependencies**:
- None

**Reusability**: Low (page-specific)

**Key Features**:
- Subcategory content
- Ad injection

---

### 4.4 Shared UI Components

#### home/main/LeftColumn.vue
**Purpose**: Left column component for home page

**Props**:
- `ads` (Object): Advertisement data

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`
- `VCategoryTime.vue`

**Reusability**: Medium

**Key Features**:
- Column layout
- Ad injection
- Post display

---

#### home/main/RightColumn.vue
**Purpose**: Right column component for home page

**Props**:
- `ads1` (Object): Advertisement data
- `ads2` (Object): Advertisement data

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VElectionCountDown.vue`
- `VAds.vue`
- `VCard.vue`

**Reusability**: Medium

**Key Features**:
- Column layout
- Ad injection
- Post display
- Intersection observer for lazy loading

---

#### home/main/ColumnTwo.vue
**Purpose**: Second column component for home page

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Medium

**Key Features**:
- Column layout
- Ad injection
- Post display

---

#### home/main/ColumnThree.vue
**Purpose**: Third column component for home page

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Medium

**Key Features**:
- Column layout
- Ad injection
- Post display

---

#### home/main/Slider.vue
**Purpose**: Slider component for home page

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VSlider.vue`

**Reusability**: Medium

**Key Features**:
- Image slider
- Auto-play
- Responsive design

---

#### home/main/LiveMedia.vue
**Purpose**: Live media component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- Live media display

---

#### home/CategoryHeading.vue
**Purpose**: Category heading component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Category title display
- Custom styling

---

#### home/CategoryMediaLeftRight.vue
**Purpose**: Category media layout component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VCard.vue`
- `VAds.vue`

**Reusability**: Medium

**Key Features**:
- Media layout
- Ad injection

---

#### home/CategoryMediaLeftRightV2.vue
**Purpose**: Alternative category media layout

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VCard.vue`
- `VAds.vue`

**Reusability**: Medium

**Key Features**:
- Media layout
- Ad injection

---

#### home/CategoryMediaTopLeft.vue
**Purpose**: Category media layout with top-left image

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VCard.vue`
- `VAds.vue`

**Reusability**: Medium

**Key Features**:
- Media layout
- Ad injection

---

#### home/CategoryPostTitle.vue
**Purpose**: Category post title only component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VCard.vue`

**Reusability**: Medium

**Key Features**:
- Title-only display
- Compact layout

---

#### home/Media.vue
**Purpose**: Media component for home page

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VCard.vue`

**Reusability**: Medium

**Key Features**:
- Media display
- Post listing

---

#### home/MostRead.vue
**Purpose**: Most read component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- `VCard.vue`
- `VAds.vue`

**Reusability**: Medium

**Key Features**:
- Most read posts
- Ad injection

---

#### home/category/Bangla.vue
**Purpose**: Bangla category component

**Props**:
- `ads1` (Object): Advertisement data
- `ads2` (Object): Advertisement data
- `ads3` (Object): Advertisement data

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Bangla content
- Ad injection

---

#### home/category/Economy.vue
**Purpose**: Economy category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Economy content
- Ad injection

---

#### home/category/Education.vue
**Purpose**: Education category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Education content
- Ad injection

---

#### home/category/Finance.vue
**Purpose**: Finance category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Finance content
- Ad injection

---

#### home/category/LifeStyle.vue
**Purpose**: Lifestyle category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Lifestyle content
- Ad injection

---

#### home/category/More.vue
**Purpose**: More category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- More content
- Ad injection

---

#### home/category/National.vue
**Purpose**: National category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- National content
- Ad injection

---

#### home/category/Sport.vue
**Purpose**: Sport category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Sports content
- Ad injection

---

#### home/category/Stock.vue
**Purpose**: Stock category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Stock market content
- Ad injection

---

#### home/category/Trade.vue
**Purpose**: Trade category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Trade content
- Ad injection

---

#### home/category/Views.vue
**Purpose**: Views category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Views content
- Ad injection

---

#### home/category/ViewsViews.vue
**Purpose**: Views views category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Views views content
- Ad injection

---

#### home/category/World.vue
**Purpose**: World category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- World content
- Ad injection

---

#### home/category/YouthExpress.vue
**Purpose**: Youth Express category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsHomeStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Youth Express content
- Ad injection

---

#### category/Home.vue
**Purpose**: Category home component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Category home content
- Ad injection

---

#### category/MediaLeftRight.vue
**Purpose**: Category media left-right layout

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Media layout
- Ad injection

---

#### category/More.vue
**Purpose**: Category more component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- More content
- Ad injection

---

#### category/SingleParent.vue
**Purpose**: Single parent category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Single parent content
- Ad injection

---

#### category/SubChild.vue
**Purpose**: Sub-child category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Sub-child content
- Ad injection

---

#### category/SubChildInfinite.vue
**Purpose**: Sub-child infinite scroll component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Infinite scroll
- Ad injection

---

#### category/SubOne.vue
**Purpose**: Sub-one category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Sub-one content
- Ad injection

---

#### category/SubTwo.vue
**Purpose**: Sub-two category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Sub-two content
- Ad injection

---

#### category/ViewsChild.vue
**Purpose**: Views child category component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Views child content
- Ad injection

---

#### category/lifestyle/Culture.vue
**Purpose**: Lifestyle culture component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Culture content
- Ad injection

---

#### category/lifestyle/Entertainment.vue
**Purpose**: Lifestyle entertainment component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Entertainment content
- Ad injection

---

#### category/lifestyle/Food.vue
**Purpose**: Lifestyle food component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Food content
- Ad injection

---

#### category/lifestyle/Gallery.vue
**Purpose**: Lifestyle gallery component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Gallery content
- Ad injection

---

#### category/lifestyle/Home.vue
**Purpose**: Lifestyle home component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Lifestyle home content
- Ad injection

---

#### category/lifestyle/Living.vue
**Purpose**: Lifestyle living component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Living content
- Ad injection

---

#### category/lifestyle/Others.vue
**Purpose**: Lifestyle others component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Others content
- Ad injection

---

#### category/views/Analysis.vue
**Purpose**: Views analysis component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Analysis content
- Ad injection

---

#### category/views/Columns.vue
**Purpose**: Views columns component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Columns content
- Ad injection

---

#### category/views/EconomicTrends.vue
**Purpose**: Views economic trends component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Economic trends content
- Ad injection

---

#### category/views/Letters.vue
**Purpose**: Views letters component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Letters content
- Ad injection

---

#### category/views/Opinions.vue
**Purpose**: Views opinions component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Opinions content
- Ad injection

---

#### category/views/Review.vue
**Purpose**: Views review component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Review content
- Ad injection

---

#### category/views/Views.vue
**Purpose**: Views views component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Views content
- Ad injection

---

#### category/More.vue
**Purpose**: Category more component (generic)

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- More content
- Ad injection

---

#### category/SubCategoryMore.vue
**Purpose**: Subcategory more component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Subcategory more content
- Ad injection

---

#### category/SubCategoryInfinite.vue
**Purpose**: Subcategory infinite scroll component

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Infinite scroll
- Ad injection

---

#### category/SubOne.vue
**Purpose**: Sub-one category component (generic)

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Sub-one content
- Ad injection

---

#### category/SubTwo.vue
**Purpose**: Sub-two category component (generic)

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Sub-two content
- Ad injection

---

#### category/ViewsChild.vue
**Purpose**: Views child category component (generic)

**Props**: None

**Emits**: None

**Pinia Usage**: Uses `useAdsCategoryStore()`

**External Dependencies**:
- `VAds.vue`
- `VCard.vue`

**Reusability**: Low

**Key Features**:
- Views child content
- Ad injection

---

#### common/LoderSpinner.vue
**Purpose**: Loading spinner component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: High

**Key Features**:
- Loading indicator
- Customizable size

---

#### JSONLDComponent.vue
**Purpose**: JSON-LD structured data component

**Props**: None

**Emits**: None

**Pinia Usage**: None

**External Dependencies**:
- None

**Reusability**: Low

**Key Features**:
- SEO structured data
- Schema.org markup

---

---

## 5. State Management (Pinia)

### 5.1 Store Modules Overview

The project uses Pinia for state management with a focus on ad management. There are 6 store modules:

1. **ads/home.ts** - Home page ads
2. **ads/category.ts** - Category page ads
3. **ads/modal.ts** - Modal ads
4. **ads/global.ts** - Global page ads
5. **ads/adTrack.ts** - Ad tracking
6. **index.ts** - Root store (minimal)

### 5.2 Store Module Details

#### ads/home.ts
**State Structure**:
```typescript
interface AdsState {
  positions: AdsPosition[]
}
```

**Getters**:
- `heroLeftBottom`: Hero section left bottom ad
- `hero3rdColumnBottom`: Hero section 3rd column bottom ad
- `heroRightTop`: Hero section right top ad
- `heroRightBottom`: Hero section right bottom ad
- `heroUnderSlider`: Ad under main slider
- `heroLeaderboard`: Ad between hero and economy section
- `bellowMainMenuAds1-4`: Ads below main menu
- `underHeroSectionAd1-2`: Ads under hero section
- `economyAds`: Economy section ad
- `mostReadAds`: Most read section ad
- `stockAds`: Stock section ad
- `banglaAds1-3`: Bangla section ads

**Actions**:
- `getHomePageAds()`: Fetches home page ads from API

**API Dependencies**:
- `https://api.thefinancialexpress.com.bd/api/revenue/home`

**Cross-module Coupling**: None

**Anti-patterns**: None

---

#### ads/category.ts
**State Structure**:
```typescript
interface AdsState {
  positions: AdsPosition[]
}
```

**Getters**:
- `adsRight`: Right column ad
- `adsMain`: Main section ad
- `adsChild1-5`: Ads between child categories

**Actions**:
- `getCategoryPageAds()`: Fetches category page ads from API

**API Dependencies**:
- `https://api.thefinancialexpress.com.bd/api/revenue/category`

**Cross-module Coupling**: None

**Anti-patterns**: None

---

#### ads/modal.ts
**State Structure**:
```typescript
interface AdsState {
  positions: AdsPosition[]
}
```

**Getters**:
- `topModalAds`: Top modal ad
- `centerModalAds`: Center modal ad
- `footerModalAds`: Footer modal ad

**Actions**:
- `getModalPageAds()`: Fetches modal ads from API

**API Dependencies**:
- `https://api.thefinancialexpress.com.bd/api/revenue/modal_ad`

**Cross-module Coupling**: None

**Anti-patterns**: None

---

#### ads/global.ts
**State Structure**:
```typescript
interface AdsState {
  positions: AdsPosition[]
}
```

**Getters**:
- `globalLeaderboard`: Global leaderboard ad

**Actions**:
- `getGlobalPageAds()`: Fetches global page ads from API

**API Dependencies**:
- `https://api.thefinancialexpress.com.bd/api/revenue/global`

**Cross-module Coupling**: None

**Anti-patterns**: None

---

#### ads/adTrack.ts
**State Structure**: No state (only actions)

**Actions**:
- `trackAdView(adId: number)`: Tracks ad view count
- `trackAdClick(adId: number)`: Tracks ad click count

**API Dependencies**:
- `https://api.thefinancialexpress.com.bd/api/ads/{id}/view`
- `https://api.thefinancialexpress.com.bd/api/ads/{id}/click`

**Cross-module Coupling**: None

**Anti-patterns**: None

---

#### index.ts
**State Structure**:
```typescript
interface State {
  counter: number
}
```

**Getters**: None

**Actions**: None

**API Dependencies**: None

**Cross-module Coupling**: None

**Anti-patterns**: Minimal state (counter) that appears unused

---

### 5.3 Data Flow Patterns

1. **Ad Loading Pattern**:
   - Components call store actions in `setup()` or `onMounted()`
   - Store actions fetch data from API
   - Data is stored in state
   - Components access data via getters

2. **Ad Tracking Pattern**:
   - Components track views on mount (`onMounted`)
   - Components track clicks on interaction
   - Store actions send tracking requests to API
   - No error handling visible

3. **Language Pattern**:
   - Components check `i18n.locale` to determine language
   - API calls use language prefix (`api/{lang}/...`)
   - No centralized language state

---

## 6. Routing & Navigation

### 6.1 Route Structure

#### Static Routes
- `/` - Home page
- `/about-us` - About us page
- `/contact-us` - Contact us page
- `/all-news` - All news page
- `/media` - Media page
- `/privacy-policy` - Privacy policy page
- `/sitemap` - Sitemap page
- `/terms-of-service` - Terms of service page
- `/search` - Search page

#### Dynamic Category Routes
- `/economy` - Economy category
- `/stock` - Stock category
- `/trade` - Trade category
- `/national` - National category
- `/world` - World category
- `/education` - Education category
- `/sci-tech` - Science & Technology category
- `/health` - Health category
- `/sports` - Sports category
- `/lifestyle` - Lifestyle category
- `/entertainment` - Entertainment category
- `/environment` - Environment category
- `/jobs-and-opportunities` - Jobs & Opportunities category
- `/others` - Others category
- `/youth-and-entrepreneurship` - Youth & Entrepreneurship category
- `/special-issues` - Special Issues category
- `/personal-finance` - Personal Finance category
- `/editorial` - Editorial category
- `/views` - Views category
- `/bn` - Bangla category

#### Dynamic Parameter Routes
- `/:category` - Generic category route
- `/:category/:subcategory` - Subcategory route
- `/:category/:slug` - Category post route
- `/reporter/:username` - Reporter profile route
- `/:category/:subcategory/:slug` - Subcategory post route

#### Nested Routes
- `/page/economy/bangladesh` - Economy Bangladesh subcategory
- `/page/economy/global` - Economy Global subcategory
- `/page/stock/bangladesh` - Stock Bangladesh subcategory
- `/page/stock/global` - Stock Global subcategory
- `/page/national/politics` - National Politics subcategory
- `/page/national/country` - National Country subcategory
- `/page/national/crime` - National Crime subcategory
- `/page/world/america` - World America subcategory
- `/page/world/asia` - World Asia subcategory
- `/page/world/europe` - World Europe subcategory
- `/page/world/africa` - World Africa subcategory

### 6.2 Dynamic Routes

The project uses dynamic routes extensively for:
- Categories (20+ categories)
- Subcategories (nested under categories)
- Individual posts (with slugs)
- Reporter profiles (with usernames)

**Route Naming Convention**:
- Static routes: PascalCase (e.g., `CategoryEconomy`)
- Dynamic routes: PascalCase with parameter names (e.g., `CategoryPost`)

### 6.3 Nested Routes

The project uses nested routes for:
- Category pages with subcategories
- Category pages with posts
- Reporter pages with posts

**Route Structure**:
```
pages/
├── index.vue (Home)
├── -category/
│   ├── index.vue (Generic category)
│   ├── economy.vue (Static economy)
│   ├── stock.vue (Static stock)
│   └── [category].vue (Dynamic category)
├── -subcategory/
│   └── index.vue (Dynamic subcategory)
├── -post/
│   └── index.vue (Dynamic post)
└── -reporter/
    └── index.vue (Dynamic reporter)
```

### 6.4 Middleware Usage

**No middleware files found** in the project. This means:
- No authentication guards
- No route-based access control
- No route-level data fetching
- No custom navigation guards

### 6.5 Auth Guards

**No authentication system implemented**. The project does not have:
- User authentication
- Role-based access control
- Protected routes
- Login/logout functionality

### 6.6 Route-based Code Splitting

The project uses lazy loading for components:
- `LazyHomeCategoryBangla`
- `LazyHomeMainLeftColumn`
- `LazyHomeMainRightColumn`
- `LazyHomeMainColumnTwo`
- `LazyHomeMainColumnThree`

This provides automatic code splitting for better performance.

### 6.7 Navigation Risks

1. **No Error Handling**: No route error pages
2. **No 404 Handling**: Custom 404 page not implemented
3. **No Navigation Guards**: No protection against unauthorized access
4. **No Route Transition Handling**: No page transition animations
5. **No Back Button Handling**: No history management for navigation

---

## 7. API & External Integrations

### 7.1 API Services

**No dedicated API service layer** exists. API calls are made directly from components using `$axios`.

#### API Endpoints

**Home Page**:
- `api/{lang}/home/post/column4` - Get home page posts for right column

**Category Pages**:
- `api/{lang}/category/{category}/slider` - Get category slider images
- `api/{lang}/category/{category}/{subcategory}` - Get subcategory posts

**Ad Management**:
- `https://api.thefinancialexpress.com.bd/api/revenue/home` - Home page ads
- `https://api.thefinancialexpress.com.bd/api/revenue/category` - Category ads
- `https://api.thefinancialexpress.com.bd/api/revenue/modal_ad` - Modal ads
- `https://api.thefinancialexpress.com.bd/api/revenue/global` - Global ads

**Ad Tracking**:
- `https://api.thefinancialexpress.com.bd/api/ads/{id}/view` - Track ad view
- `https://api.thefinancialexpress.com.bd/api/ads/{id}/click` - Track ad click

### 7.2 Authentication Mechanism

**No authentication mechanism implemented**. The project does not have:
- User authentication
- API authentication
- Session management
- Token-based authentication

### 7.3 Axios Configuration

**Configuration** (from `nuxt.config.js`):
```javascript
axios: {
  baseURL: process.env.API_BASE_URL,
  debug: process.env.NODE_ENV !== 'production',
  proxy: false,
}
```

**Proxy Configuration**:
```javascript
proxy: {
  '/api/': process.env.API_BASE_URL,
  '/api-fake/': {
    target: process.env.API_FAKE_URL,
    pathRewrite: { '^/api-fake/': '' },
  },
}
```

**Features**:
- Debug mode enabled in development
- No proxy enabled
- Custom proxy for fake API

### 7.4 Error Handling Pattern

**No centralized error handling**. Components handle errors individually:
- Try-catch blocks in async functions
- No error boundaries
- No global error handler
- No error logging

**Example** (from `store/ads/global.ts`):
```typescript
try {
  const response = await fetch(`https://api.thefinancialexpress.com.bd/api/revenue/global`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const { data } = await response.json()
  this.positions = data
} catch (e) {}
```

**Issues**:
- Empty catch blocks (errors are silently ignored)
- No error logging
- No user feedback
- No retry logic

### 7.5 Environment Variable Usage

**Public Runtime Config** (from `nuxt.config.js`):
```javascript
publicRuntimeConfig: {
  baseURL: process.env.APP_URL,
  banglaAppUrl: process.env.BANGLA_APP_URL,
  banglaApiUrl: process.env.BANGLA_API_URL,
  axios: {
    browserBaseURL: process.env.API_BASE_URL,
  },
}
```

**Private Runtime Config**:
```javascript
privateRuntimeConfig: {
  banglaAppUrl: process.env.BANGLA_APP_URL,
  banglaApiUrl: process.env.BANGLA_API_URL,
}
```

**Environment Variables** (from `.env.example`):
```
APP_NAME="The Financial Express"
APP_SHORT_NAME="FinancialExpress"
APP_URL=http://localhost:3000
CDN_URL=https://tfe-bd.sgp1.cdn.digitaloceanspaces.com/_nuxt
API_BASE_URL=https://api.thefinancialexpress.com.bd
```

### 7.6 Third-party Services

#### Google Analytics
- **Tracking ID**: G-S2JHL9S4HZ
- **Implementation**: Global script in `nuxt.config.js`
- **Purpose**: Website analytics

#### Google Custom Search Engine
- **CX ID**: 03edde0e03b6143f7
- **Implementation**: Global script in `nuxt.config.js`
- **Purpose**: Search functionality

#### Google AdSense
- **Client ID**: ca-pub-3438694616169600
- **Slots**: Multiple ad slots configured
- **Implementation**: Client-side components (`VAds.vue`)
- **Fallback**: Custom ads when AdSense fails

#### FontAwesome
- **Version**: 6.1.1
- **Implementation**: Plugin (`plugins/fontawesome.ts`)
- **Icons**: Solid and brand icons

#### Vue Slick Carousel
- **Version**: 1.0.6
- **Implementation**: Plugin (`plugins/vue-slick-carousel.client.js`)
- **Purpose**: Image slider component

#### Vue Social Sharing
- **Version**: 3.0.8
- **Implementation**: Module (`vue-social-sharing/nuxt`)
- **Purpose**: Social media sharing

#### Anime.js
- **Version**: 3.2.1
- **Implementation**: Direct dependency
- **Purpose**: Animations

#### Typed.js
- **Version**: 2.0.12
- **Implementation**: Direct dependency
- **Purpose**: Typing animations

#### Day.js
- **Version**: 1.10.7
- **Implementation**: Direct dependency
- **Purpose**: Date formatting

#### Bootstrap Vue
- **Version**: 2.21.2
- **Implementation**: Module (`bootstrap-vue/nuxt`)
- **Components**: BDropdown, BSidebar, BModal, BCollapse
- **Directives**: VBToggle, VBModal

#### Headless UI
- **Version**: 1.4.2
- **Implementation**: Direct dependency
- **Components**: Dialog, Tabs

#### VueUse
- **Version**: 8.5.0
- **Implementation**: Module (`@vueuse/core`)
- **Features**: Composition API utilities

### 7.7 Security Concerns

1. **No Authentication**: No user authentication or authorization
2. **No CSRF Protection**: No CSRF token implementation
3. **No Input Validation**: No validation on user inputs
4. **No XSS Protection**: No sanitization of user-generated content
5. **No Rate Limiting**: No API rate limiting
6. **No HTTPS Enforcement**: No forced HTTPS
7. **No Content Security Policy**: No CSP headers
8. **No Helmet**: No security headers

---

## 8. Plugins & Global Configuration

### 8.1 Custom Plugins

#### fontawesome.ts
**Purpose**: Configure FontAwesome icon library

**Configuration**:
- Auto-add CSS disabled
- Solid icons: Mobile, CalendarDay, Fire, Sun, Moon, ChevronDown, ChevronUp, Print, Search, Plus
- Brand icons: FacebookF, FacebookMessenger, Instagram, Linkedin, Twitter, Whatsapp, Youtube

**Global Registration**: FontAwesomeIcon component

---

#### global-components.js
**Purpose**: Register global components

**Registered Components**:
- `LanguageToggleButton`

---

#### mixins.js
**Purpose**: Provide shared Vue mixins

**Mixins**:
- **getFormattedDateTime(date, lang)**: Format date and time for Bangla or English
- **getFullDate(date, lang)**: Get full date in Bangla or English
- **getDayName(date)**: Get day name
- **getDate(date)**: Get date only
- **getTimeFormat(date)**: Get time format (AM/PM)
- **getTime(date)**: Get time only

**Dependencies**:
- Day.js with UTC plugin

---

#### vue-click-outside.js
**Purpose**: Provide click-outside directive

**Usage**: Not visible in analyzed code

---

#### vue-slick-carousel.client.js
**Purpose**: Configure Vue Slick Carousel plugin

**Usage**: Not visible in analyzed code

---

#### vue-google-adsense.client.js
**Purpose**: Configure Google AdSense plugin

**Usage**: Not visible in analyzed code

---

### 8.2 Global Mixins

**Mixin**: `mixins.js`

**Methods**:
- Date formatting for Bangla and English
- Time formatting
- Day name extraction

**Issues**:
- Mixin approach is deprecated in Vue 3
- Should be migrated to composables
- No TypeScript support

---

### 8.3 Injected Services

**No services injected globally**. Components access services directly:
- `$axios` for API calls
- `$config` for configuration
- `$i18n` for internationalization
- `$nuxt` for Nuxt context

---

### 8.4 Nuxt Modules Used

#### @nuxtjs/axios
**Purpose**: HTTP client for API requests

**Configuration**:
- Base URL from environment variable
- Debug mode in development
- No proxy enabled

---

#### @nuxtjs/pwa
**Purpose**: Progressive Web App features

**Configuration**:
- Manifest with app name and short name
- Meta tags for SEO and social sharing
- Theme color: #009244

---

#### @nuxtjs/i18n
**Purpose**: Internationalization

**Configuration**:
- Locales: English (en-US), Bangla (bn-BD)
- Default locale: English
- Lazy loading enabled
- Fallback locale: English, Bangla

---

#### bootstrap-vue/nuxt
**Purpose**: Bootstrap Vue integration

**Configuration**:
- Bootstrap CSS disabled
- Bootstrap Vue CSS disabled
- Components: BDropdown, BSidebar, BModal, BCollapse
- Directives: VBToggle, VBModal

---

#### vue-social-sharing/nuxt
**Purpose**: Social media sharing

**Configuration**: Not visible in analyzed code

---

### 8.5 Global CSS Strategy

**CSS Files** (from `nuxt.config.js`):
1. `@fortawesome/fontawesome-svg-core/styles.css` - FontAwesome icons
2. `~/assets/css/tailwind.css` - Tailwind CSS
3. `~/assets/css/style.scss` - Custom styles
4. `~/assets/css/common.css` - Common styles
5. `~/assets/css/fonts.css` - Font imports

**Tailwind Configuration**:
- Content paths: components, layouts, pages, plugins, nuxt.config
- Dark mode: class-based
- Custom colors: body, header, h1-h4, p, gray, menu, search, op, media, footer, blue, red, bg1-bg2

**PostCSS Configuration**:
- Tailwind CSS
- Autoprefixer

**PurgeCSS Configuration**:
- Whitelist patterns: `/svg.*/`, `/fa.*/`

---

### 8.6 i18n (Internationalization)

**Configuration** (from `nuxt.config.js`):
```javascript
i18n: {
  locales: [
    { code: 'en', iso: 'en-US', file: 'en.js', name: 'English' },
    { code: 'bangla', iso: 'bn-BD', file: 'bn.js', name: 'বাংলা' }
  ],
  defaultLocale: 'en',
  lazy: true,
  langDir: '~/locales/',
  vueI18n: {
    fallbackLocale: ['en', 'bangla']
  }
}
```

**Translation Files**:
- `locales/en.js`: English translations (menus, headings, etc.)
- `locales/bn.js`: Bangla translations (menus, headings, etc.)

**Usage**:
- `$t()` function for translations
- `$i18n.locale` for current locale
- `$nuxtI18nHead()` for SEO

**Issues**:
- Language toggle redirects to external site (not implemented)
- No language persistence across pages
- No translation coverage tracking
- Bangla content is placeholder only

---

## 9. Performance & Technical Debt Analysis

### 9.1 Anti-patterns

#### High Severity

1. **No Service Layer**
   - **Issue**: Direct API calls in components
   - **Impact**: Code duplication, hard to maintain, no centralized error handling
   - **Location**: Multiple components (e.g., `RightColumn.vue`, `VSlider.vue`)
   - **Example**:
     ```typescript
     const url = `api/${lang}/home/post/column4`
     const items: Posts[] = await $axios.$get(url)
     ```

2. **Empty Error Handling**
   - **Issue**: Catch blocks with no error handling
   - **Impact**: Silent failures, no user feedback, debugging difficulty
   - **Location**: Multiple stores (e.g., `ads/global.ts`, `ads/modal.ts`)
   - **Example**:
     ```typescript
     } catch (e) {}
     ```

3. **No Authentication System**
   - **Issue**: No user authentication or authorization
   - **Impact**: Security vulnerability, no access control
   - **Location**: Entire application
   - **Impact**: Anyone can access all content

4. **No Error Boundaries**
   - **Issue**: No Vue error boundaries
   - **Impact**: Unhandled errors crash entire app
   - **Location**: Entire application
   - **Impact**: Poor user experience

5. **No 404 Handling**
   - **Issue**: No custom 404 page
   - **Impact**: Poor user experience, SEO issues
   - **Location**: Entire application
   - **Impact**: Users see Nuxt error page

#### Medium Severity

6. **Mixins Instead of Composables**
   - **Issue**: Using Vue mixins for shared logic
   - **Impact**: Mixins are deprecated in Vue 3, hard to debug
   - **Location**: `plugins/mixins.js`
   - **Recommendation**: Migrate to composables

7. **No Centralized State Management**
   - **Issue**: State is scattered across components
   - **Impact**: Hard to maintain, no single source of truth
   - **Location**: Multiple components
   - **Example**: Language detection in every component

8. **No Loading States**
   - **Issue**: No loading indicators for async operations
   - **Impact**: Poor user experience, confusion
   - **Location**: Multiple components
   - **Example**: API calls without loading states

9. **No Retry Logic**
   - **Issue**: No retry mechanism for failed API calls
   - **Impact**: Poor reliability
   - **Location**: Multiple stores
   - **Example**: Ad tracking API calls

10. **No Caching Strategy**
    - **Issue**: No caching for API responses
    - **Impact**: Unnecessary API calls, poor performance
    - **Location**: Multiple components
    - **Example**: Ad fetching on every page load

11. **No Pagination Implementation**
    - **Issue**: No pagination for post listings
    - **Impact**: Poor performance, poor UX
    - **Location**: Category and subcategory pages
    - **Example**: All posts loaded at once

12. **No Image Optimization**
    - **Issue**: No image optimization (WebP, lazy loading)
    - **Impact**: Poor performance, high bandwidth usage
    - **Location**: Multiple components
    - **Example**: Images loaded without optimization

13. **No SEO Optimization**
    - **Issue**: Limited SEO optimization
    - **Impact**: Poor search engine rankings
    - **Location**: Limited use of `useHead` and `useSeoMeta`
    - **Example**: Only basic meta tags

14. **No Analytics Integration**
    - **Issue**: No user behavior tracking
    - **Impact**: No insights into user behavior
    - **Location**: Entire application
    - **Example**: No page view tracking, no event tracking

15. **No Error Logging**
    - **Issue**: No centralized error logging
    - **Impact**: Difficult to debug issues
    - **Location**: Entire application
    - **Example**: No Sentry or similar integration

#### Low Severity

16. **Hardcoded Dates**
    - **Issue**: Election countdown has hardcoded date
    - **Impact**: No dynamic date management
    - **Location**: `VElectionCountDown.vue`
    - **Example**: `new Date('2026-02-12T00:00:00')`

17. **No TypeScript Strict Mode**
    - **Issue**: TypeScript not in strict mode
    - **Impact**: Potential runtime errors
    - **Location**: `tsconfig.json`
    - **Example**: No `strict: true`

18. **No ESLint Rules for Async/Await**
    - **Issue**: No ESLint rules for async/await
    - **Impact**: Potential unhandled promise rejections
    - **Location**: Entire codebase

19. **No Component Documentation**
    - **Issue**: No JSDoc or TypeScript documentation
    - **Impact**: Hard to understand component purpose
    - **Location**: Multiple components

20. **No Unit Tests**
    - **Issue**: No unit tests
    - **Impact**: No test coverage, regression risks
    - **Location**: Entire codebase

---

### 9.2 Tight Coupling

1. **Component-Axios Coupling**
   - Components directly use `$axios`
   - No abstraction layer
   - Hard to test and maintain

2. **Component-Store Coupling**
   - Components directly call store actions
   - No dependency injection
   - Hard to mock for testing

3. **Component-Plugin Coupling**
   - Components directly use global plugins
   - No dependency injection
   - Hard to test and maintain

---

### 9.3 Large Components

1. **Post.vue** (~23,641 chars)
   - Too many props (11 props)
   - Business logic mixed with UI
   - Should be split into smaller components

2. **TheHeader.vue** (~35,125 chars)
   - Large component with many responsibilities
   - Should be split into smaller components

3. **TheFooter.vue** (~22,035 chars)
   - Large component with many responsibilities
   - Should be split into smaller components

4. **index.vue** (~23,788 chars)
   - Large home page component
   - Should be split into smaller components

---

### 9.4 Business Logic Inside UI

1. **Date Formatting in Mixins**
   - Business logic in UI layer
   - Should be in composables or services

2. **API Calls in Components**
   - Business logic in UI layer
   - Should be in services

3. **Ad Tracking in Components**
   - Business logic in UI layer
   - Should be in services

---

### 9.5 Direct API Calls Inside Components

**Examples**:
- `RightColumn.vue`: Direct API call to `api/${lang}/home/post/column4`
- `VSlider.vue`: Direct API call to `api/${lang}/category/{category}/slider`
- `VElectionCountDown.vue`: No API call (hardcoded date)

**Issues**:
- Code duplication
- No centralized error handling
- No retry logic
- No caching
- Hard to test

---

### 9.6 Missing Abstraction Layers

1. **No Service Layer**
   - API calls should be in services
   - No abstraction for API operations

2. **No Repository Pattern**
   - No data access layer
   - Direct database/API access

3. **No Factory Pattern**
   - No component factory for creating components
   - Hardcoded component instantiation

---

### 9.7 Duplicate Logic

1. **Language Detection**
   - Repeated in multiple components
   - Should be in a composable

2. **Date Formatting**
   - Repeated in mixins
   - Should be in a composable

3. **Ad Fetching**
   - Repeated in multiple stores
   - Should be centralized

---

### 9.8 Missing Error Handling

1. **No Global Error Handler**
   - No centralized error handling
   - No error boundaries

2. **No Error Logging**
   - No Sentry or similar integration
   - No error tracking

3. **No User Feedback**
   - No error messages to users
   - Silent failures

---

### 9.9 Missing Loading States

1. **No Loading Indicators**
   - No loading states for async operations
   - Poor user experience

2. **No Skeleton Screens**
   - No skeleton screens for content loading
   - Poor user experience

---

### 9.10 Missing Performance Optimizations

1. **No Image Optimization**
   - No WebP format
   - No lazy loading
   - No responsive images

2. **No Code Splitting**
   - No route-based code splitting (except lazy components)
   - No component-level code splitting

3. **No Tree Shaking**
   - No PurgeCSS configuration (only whitelist patterns)
   - No tree shaking for unused code

---

### 9.11 Categorization Summary

#### High Severity (Critical)
- No Service Layer
- Empty Error Handling
- No Authentication System
- No Error Boundaries
- No 404 Handling

#### Medium Severity
- Mixins Instead of Composables
- No Centralized State Management
- No Loading States
- No Retry Logic
- No Caching Strategy
- No Pagination Implementation
- No Image Optimization
- No SEO Optimization
- No Analytics Integration
- No Error Logging

#### Low Severity
- Hardcoded Dates
- No TypeScript Strict Mode
- No ESLint Rules for Async/Await
- No Component Documentation
- No Unit Tests

---

## 10. Improvement & Refactoring Roadmap

### 10.1 Quick Wins (1–3 Days)

#### 1. Add Error Boundaries
**Description**: Add Vue error boundaries to catch and handle errors gracefully

**Implementation**:
```typescript
// components/ErrorBoundary.vue
<script lang="ts">
import { defineComponent, onErrorCaptured } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ErrorBoundary',
  setup() {
    onErrorCaptured((err) => {
      console.error('Error captured:', err)
      return false
    })
  }
})
</script>

<template>
  <slot />
</template>
```

**Benefits**:
- Prevents app crashes
- Better error handling
- Improved user experience

**Effort**: 2–3 hours

---

#### 2. Add Loading States
**Description**: Add loading indicators for async operations

**Implementation**:
```typescript
// composables/useAsyncState.ts
export function useAsyncState<T>(
  asyncFn: () => Promise<T>,
  initialState: T
) {
  const state = ref<T>(initialState)
  const loading = ref(true)
  const error = ref<Error | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      state.value = await asyncFn()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return { state, loading, error, execute }
}
```

**Benefits**:
- Better user experience
- Clear feedback
- Reduced confusion

**Effort**: 4–6 hours

---

#### 3. Add Retry Logic
**Description**: Add retry mechanism for failed API calls

**Implementation**:
```typescript
// composables/useRetry.ts
export function useRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
) {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const retries = ref(0)

  const execute = async () => {
    loading.value = true
    error.value = null
    retries.value = 0

    while (retries.value < maxRetries) {
      try {
        return await fn()
      } catch (err) {
        error.value = err as Error
        retries.value++
        if (retries.value < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * retries.value))
        }
      }
    }

    throw error.value
  }

  return { loading, error, execute }
}
```

**Benefits**:
- Improved reliability
- Better error recovery
- Reduced manual intervention

**Effort**: 2–3 hours

---

#### 4. Add 404 Page
**Description**: Create custom 404 page

**Implementation**:
```vue
<!-- pages/404.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-xl mb-8">Page not found</p>
    <nuxt-link to="/" class="text-blue-500 hover:underline">
      Go home
    </nuxt-link>
  </div>
</template>
```

**Benefits**:
- Better user experience
- Improved SEO
- Professional appearance

**Effort**: 30 minutes

---

#### 5. Add Error Logging
**Description**: Integrate Sentry for error logging

**Implementation**:
```typescript
// plugins/sentry.client.ts
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.APP_VERSION,
})
```

**Benefits**:
- Better error tracking
- Easier debugging
- Improved reliability

**Effort**: 1–2 hours

---

#### 6. Add TypeScript Strict Mode
**Description**: Enable TypeScript strict mode

**Implementation**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

**Benefits**:
- Catch more errors at compile time
- Better type safety
- Improved code quality

**Effort**: 2–3 hours

---

#### 7. Add ESLint Rules for Async/Await
**Description**: Add ESLint rules for async/await

**Implementation**:
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'no-return-await': 'error',
    'require-await': 'error',
    'no-async-promise-executor': 'error',
  }
}
```

**Benefits**:
- Catch async/await issues
- Better code quality
- Improved performance

**Effort**: 30 minutes

---

#### 8. Add Component Documentation
**Description**: Add JSDoc or TypeScript documentation to components

**Implementation**:
```typescript
/**
 * VCard - Reusable card component for displaying content
 *
 * @component
 * @example
 * <v-card
 *   title="Article Title"
 *   url="/article"
 *   image="/image.jpg"
 *   category="Economy"
 *   datetime="2024-01-01T00:00:00Z"
 * />
 */
export default defineComponent({
  name: 'VCard',
  // ...
})
```

**Benefits**:
- Better code documentation
- Easier onboarding
- Improved maintainability

**Effort**: 4–6 hours

---

### 10.2 Mid-term Improvements (1–2 Weeks)

#### 9. Create Service Layer
**Description**: Create a service layer for API calls

**Implementation**:
```typescript
// services/api.ts
export class ApiService {
  private axios = $axios

  async getHomePosts(lang: string) {
    return this.axios.$get(`api/${lang}/home/post/column4`)
  }

  async getCategoryPosts(category: string, subcategory: string, lang: string) {
    return this.axios.$get(`api/${lang}/category/${category}/${subcategory}`)
  }

  async getAds(type: string) {
    return this.axios.$get(`api/revenue/${type}`)
  }
}

export const apiService = new ApiService()
```

**Benefits**:
- Centralized API calls
- Better error handling
- Easier testing
- Reduced code duplication

**Effort**: 1–2 days

---

#### 10. Create Composables for Shared Logic
**Description**: Extract shared logic into composables

**Implementation**:
```typescript
// composables/useLanguage.ts
export function useLanguage() {
  const { i18n } = useContext()
  const lang = computed(() => i18n?.locale === 'bangla' ? 'bn' : 'en')
  const selectedLanguage = computed(() => lang.value)

  return {
    lang,
    selectedLanguage
  }
}

// composables/useDate.ts
export function useDate() {
  const { i18n } = useContext()
  const lang = computed(() => i18n?.locale === 'bangla' ? 'bn' : 'en')

  const formatDate = (date: Date) => {
    if (lang.value === 'bn') {
      return dayjs(date).format('MMM DD, YYYY HH:mm')
    }
    return dayjs(date).format('MMM DD, YYYY HH:mm')
  }

  return {
    formatDate
  }
}
```

**Benefits**:
- Reusable logic
- Better testability
- Improved maintainability
- Follows Vue 3 best practices

**Effort**: 2–3 days

---

#### 11. Implement Pagination
**Description**: Add pagination for post listings

**Implementation**:
```typescript
// composables/usePagination.ts
export function usePagination<T>(items: Ref<T[]>) {
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return items.value.slice(start, end)
  })

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage
  }
}
```

**Benefits**:
- Better performance
- Improved UX
- Reduced bandwidth usage

**Effort**: 2–3 days

---

#### 12. Implement Image Optimization
**Description**: Add image optimization with WebP format and lazy loading

**Implementation**:
```typescript
// composables/useImage.ts
export function useImage(src: string) {
  const optimizedSrc = computed(() => {
    return src.replace(/\.(jpg|jpeg|png)$/, '.webp')
  })

  const loading = ref(false)

  return {
    optimizedSrc,
    loading
  }
}

// components/VImg.vue
<template>
  <img
    :src="optimizedSrc"
    :loading="loading ? 'lazy' : 'eager'"
    :alt="alt"
    @load="loading = false"
  />
</template>
```

**Benefits**:
- Better performance
- Reduced bandwidth usage
- Improved user experience

**Effort**: 1–2 days

---

#### 13. Implement SEO Optimization
**Description**: Add comprehensive SEO optimization

**Implementation**:
```typescript
// composables/useSeo.ts
export function useSeo(title: string, description: string, image: string) {
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
    ]
  })
}

// pages/-post/index.vue
<script lang="ts">
export default defineComponent({
  setup() {
    const { post } = useRoute().params
    useSeo(post.title, post.excerpt, post.image)
  }
})
</script>
```

**Benefits**:
- Better search engine rankings
- Improved social sharing
- Better user experience

**Effort**: 2–3 days

---

#### 14. Implement Analytics Integration
**Description**: Add comprehensive analytics tracking

**Implementation**:
```typescript
// composables/useAnalytics.ts
export function useAnalytics() {
  const trackPageView = (page: string) => {
    if (process.client) {
      window.gtag('event', 'page_view', {
        page_path: page
      })
    }
  }

  const trackEvent = (eventName: string, params: Record<string, any>) => {
    if (process.client) {
      window.gtag('event', eventName, params)
    }
  }

  return {
    trackPageView,
    trackEvent
  }
}

// pages/index.vue
<script lang="ts">
export default defineComponent({
  setup() {
    const { trackPageView } = useAnalytics()
    trackPageView('/')
  }
})
</script>
```

**Benefits**:
- Better insights into user behavior
- Improved decision making
- Better user experience

**Effort**: 1–2 days

---

#### 15. Refactor Large Components
**Description**: Split large components into smaller, focused components

**Implementation**:
```typescript
// Before: Post.vue (23,641 chars)
// After: Split into multiple components

// components/PostHeader.vue
// components/PostContent.vue
// components/PostRelated.vue
// components/PostSocialShare.vue
// components/PostAds.vue
```

**Benefits**:
- Better maintainability
- Improved testability
- Better code organization
- Easier to understand

**Effort**: 3–5 days

---

#### 16. Implement Caching Strategy
**Description**: Add caching for API responses

**Implementation**:
```typescript
// composables/useCache.ts
export function useCache<T>(key: string, ttl = 5 * 60 * 1000) {
  const cache = ref<Map<string, { data: T; timestamp: number }>>(new Map())

  const get = (): T | null => {
    const cached = cache.value.get(key)
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data
    }
    return null
  }

  const set = (data: T) => {
    cache.value.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  const clear = () => {
    cache.value.clear()
  }

  return { get, set, clear }
}
```

**Benefits**:
- Better performance
- Reduced API calls
- Improved user experience

**Effort**: 2–3 days

---

### 10.3 Long-term Architecture Improvements (1–2 Months)

#### 17. Migrate to Nuxt 3
**Description**: Migrate from Nuxt 2 to Nuxt 3

**Implementation**:
- Update dependencies
- Migrate from Options API to Composition API
- Migrate from Vuex to Pinia
- Update plugins and modules
- Update routing
- Update SEO

**Benefits**:
- Better performance
- Modern features
- Future-proof
- Better TypeScript support

**Effort**: 2–4 weeks

---

#### 18. Implement Authentication System
**Description**: Add user authentication and authorization

**Implementation**:
```typescript
// composables/useAuth.ts
export function useAuth() {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: LoginCredentials) => {
    const response = await apiService.login(credentials)
    user.value = response.user
    localStorage.setItem('token', response.token)
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = await apiService.getCurrentUser()
      user.value = user
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
```

**Benefits**:
- Better security
- User personalization
- Access control
- Better user experience

**Effort**: 1–2 weeks

---

#### 19. Implement Unit Tests
**Description**: Add unit tests for components and composables

**Implementation**:
```typescript
// tests/components/VCard.spec.ts
import { mount } from '@vue/test-utils'
import VCard from '@/components/VCard.vue'

describe('VCard', () => {
  it('renders title correctly', () => {
    const wrapper = mount(VCard, {
      propsData: {
        title: 'Test Title'
      }
    })
    expect(wrapper.text()).toContain('Test Title')
  })
})
```

**Benefits**:
- Better code quality
- Reduced bugs
- Easier refactoring
- Better documentation

**Effort**: 2–3 weeks

---

#### 20. Implement Integration Tests
**Description**: Add integration tests for API calls and flows

**Implementation**:
```typescript
// tests/api/posts.spec.ts
import { apiService } from '@/services/api'

describe('ApiService', () => {
  it('fetches home posts', async () => {
    const posts = await apiService.getHomePosts('en')
    expect(posts).toBeDefined()
    expect(posts.length).toBeGreaterThan(0)
  })
})
```

**Benefits**:
- Better reliability
- Reduced bugs
- Better documentation
- Easier refactoring

**Effort**: 1–2 weeks

---

#### 21. Implement End-to-End Tests
**Description**: Add end-to-end tests for critical user flows

**Implementation**:
```typescript
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test'

test('home page loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('nav')).toBeVisible()
})
```

**Benefits**:
- Better reliability
- Reduced bugs
- Better user experience
- Easier onboarding

**Effort**: 1–2 weeks

---

#### 22. Implement CI/CD Pipeline
**Description**: Set up CI/CD pipeline for automated testing and deployment

**Implementation**:
```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: yarn install
      - run: yarn lint
      - run: yarn test
      - run: yarn build
```

**Benefits**:
- Better code quality
- Automated testing
- Faster deployment
- Reduced errors

**Effort**: 3–5 days

---

#### 23. Implement Monitoring and Alerting
**Description**: Set up monitoring and alerting for production

**Implementation**:
```typescript
// plugins/monitoring.client.ts
import * as Sentry from '@sentry/browser'
import * as LogRocket from 'logrocket'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})

if (process.env.NODE_ENV === 'production') {
  LogRocket.init(process.env.LOGROCKET_ID)
}
```

**Benefits**:
- Better error tracking
- Better performance monitoring
- Faster issue resolution
- Better user experience

**Effort**: 2–3 days

---

#### 24. Implement API Rate Limiting
**Description**: Add rate limiting for API calls

**Implementation**:
```typescript
// server/api/rate-limit.ts
export default defineEventHandler((event) => {
  const ip = event.node.req.socket.remoteAddress
  const key = `rate-limit:${ip}`

  const count = await redis.incr(key)
  if (count === 1) {
    await redis.expire(key, 60)
  }

  if (count > 100) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests'
    })
  }
})
```

**Benefits**:
- Better security
- Reduced API abuse
- Better performance
- Better user experience

**Effort**: 2–3 days

---

#### 25. Implement Content Management System (CMS)
**Description**: Integrate a CMS for content management

**Implementation**:
- Use Strapi, Contentful, or Sanity
- Create admin panel for content management
- Integrate with existing API

**Benefits**:
- Better content management
- Non-technical content editing
- Better collaboration
- Faster content updates

**Effort**: 2–4 weeks

---

#### 26. Implement Headless CMS
**Description**: Migrate to headless CMS for better content management

**Implementation**:
- Choose headless CMS (Strapi, Contentful, Sanity)
- Migrate existing content
- Update API integration
- Create admin panel

**Benefits**:
- Better content management
- Better performance
- Better scalability
- Better developer experience

**Effort**: 3–4 weeks

---

#### 27. Implement Microservices Architecture
**Description**: Break down monolithic architecture into microservices

**Implementation**:
- Identify microservices boundaries
- Create separate services for:
  - Content management
  - User management
  - Ad management
  - Analytics
  - Search
- Implement API gateway
- Implement service discovery

**Benefits**:
- Better scalability
- Better maintainability
- Better fault isolation
- Better team collaboration

**Effort**: 4–8 weeks

---

#### 28. Implement GraphQL API
**Description**: Add GraphQL API for better data fetching

**Implementation**:
- Set up GraphQL server (Apollo Server)
- Create GraphQL schema
- Implement resolvers
- Update client-side queries

**Benefits**:
- Better data fetching
- Reduced over-fetching
- Better developer experience
- Better performance

**Effort**: 2–3 weeks

---

#### 29. Implement WebSockets for Real-time Updates
**Description**: Add WebSockets for real-time updates

**Implementation**:
- Set up WebSocket server
- Implement real-time features:
  - Live news updates
  - Real-time ad updates
  - User notifications
- Update client-side connection

**Benefits**:
- Better user experience
- Real-time updates
- Better engagement
- Better performance

**Effort**: 2–3 weeks

---

#### 30. Implement Progressive Web App (PWA) Enhancements
**Description**: Enhance PWA features

**Implementation**:
- Implement service worker caching strategy
- Add offline fallback page
- Implement push notifications
- Implement app shortcuts
- Implement app install prompt

**Benefits**:
- Better offline experience
- Better user experience
- Better engagement
- Better performance

**Effort**: 1–2 weeks

---

## 11. Onboarding Guide for New Developers

### 11.1 Installation

```bash
# Clone the repository
git clone https://github.com/your-org/financial-express.git
cd financial-express

# Install dependencies
yarn install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# APP_URL=http://localhost:3000
# API_BASE_URL=https://api.thefinancialexpress.com.bd
```

### 11.2 Running Locally

```bash
# Development server (hot reload)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Generate static site
yarn generate
```

### 11.3 Environment Variables

Create a `.env` file in the root directory:

```env
# App Configuration
APP_NAME="The Financial Express"
APP_SHORT_NAME="FinancialExpress"
APP_URL=http://localhost:3000

# CDN Configuration
CDN_URL=https://tfe-bd.sgp1.cdn.digitaloceanspaces.com/_nuxt

# API Configuration
API_BASE_URL=https://api.thefinancialexpress.com.bd
API_FAKE_URL=https://fake-api.thefinancialexpress.com.bd

# Analytics
SENTRY_DSN=your-sentry-dsn
LOGROCKET_ID=your-logrocket-id

# Other
NODE_ENV=development
```

### 11.4 Project Conventions

#### File Structure
- **Components**: Organized by feature area in `components/` directory
- **Pages**: File-based routing in `pages/` directory
- **Stores**: Pinia stores in `store/` directory
- **Types**: TypeScript types in `types/` directory
- **Composables**: Shared logic in `composables/` directory (to be created)

#### Naming Conventions
- **Components**: PascalCase (e.g., `VCard.vue`, `TheHeader.vue`)
- **Files**: kebab-case (e.g., `use-auth.ts`, `api-service.ts`)
- **Variables**: camelCase (e.g., `isLoading`, `hasError`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

#### Code Style
- Use TypeScript for all code
- Use Composition API with `<script setup>` syntax
- Use arrow functions for methods and computed properties
- Use descriptive variable names with auxiliary verbs
- Avoid unnecessary curly braces in conditionals
- Use template syntax for declarative rendering

#### Styling
- Use Tailwind CSS for styling
- Use mobile-first approach
- Use dark mode support (class-based)
- Use custom colors from Tailwind config

#### State Management
- Use Pinia for state management
- Create separate stores for different features
- Use getters for derived state
- Use actions for async operations
- Avoid mutations in state

#### API Calls
- Use `$axios` for API calls
- Use environment variables for API URLs
- Handle errors appropriately
- Add loading states
- Add retry logic

#### Internationalization
- Use `$t()` for translations
- Check `i18n.locale` for language detection
- Use `localePath()` for localized links
- Provide translations for both English and Bangla

### 11.5 Where to Add New Features

#### Adding a New Page
1. Create a new file in `pages/` directory
2. Use file-based routing (Nuxt will automatically create route)
3. Add SEO metadata using `useHead()` or `useSeoMeta()`
4. Add necessary components
5. Add API calls if needed

#### Adding a New Component
1. Create a new file in `components/` directory
2. Organize by feature area (e.g., `components/home/`, `components/category/`)
3. Use TypeScript and Composition API
4. Add props and emits
5. Add JSDoc documentation
6. Use Tailwind CSS for styling

#### Adding a New Store
1. Create a new file in `store/` directory
2. Use Pinia's `defineStore()` API
3. Define state, getters, and actions
4. Use TypeScript interfaces for types
5. Add error handling
6. Add loading states

#### Adding a New API Endpoint
1. Create a service in `services/` directory (to be created)
2. Create a composable in `composables/` directory (to be created)
3. Use the service in components
4. Add error handling
5. Add loading states
6. Add retry logic

#### Adding a New Composable
1. Create a new file in `composables/` directory (to be created)
2. Use TypeScript and Composition API
3. Export the composable
4. Add JSDoc documentation
5. Use TypeScript types

### 11.6 Where to Add New API Integrations

1. **Create a Service Layer** (recommended):
   ```typescript
   // services/api.ts
   export class ApiService {
     async getPosts(category: string) {
       return this.axios.$get(`api/${category}/posts`)
     }
   }
   ```

2. **Create a Composable** (recommended):
   ```typescript
   // composables/usePosts.ts
   export function usePosts(category: string) {
     const { data, loading, error, execute } = useAsyncState(
       () => apiService.getPosts(category),
       []
     )
     return { data, loading, error, execute }
   }
   ```

3. **Use in Components**:
   ```typescript
   // pages/-category/index.vue
   export default defineComponent({
     setup() {
       const { data, loading, error } = usePosts(route.params.category)
       return { data, loading, error }
     }
   })
   ```

### 11.7 Coding Standards

#### TypeScript
- Use TypeScript for all code
- Prefer types over interfaces
- Avoid enums; use const objects instead
- Use `PropType` for component props
- Use `defineComponent` for component definitions

#### Composition API
- Use `<script setup>` syntax
- Use `ref`, `reactive`, and `computed` for reactive state
- Use `onMounted`, `onUnmounted` for lifecycle hooks
- Use `provide/inject` for dependency injection
- Use `watch` and `watchEffect` for reactive side effects

#### Error Handling
- Always handle errors in async operations
- Use try-catch blocks
- Log errors appropriately
- Provide user feedback
- Don't swallow errors

#### Loading States
- Always show loading states for async operations
- Use loading indicators
- Use skeleton screens
- Don't leave users in limbo

#### Testing
- Write unit tests for components and composables
- Write integration tests for API calls
- Write end-to-end tests for critical flows
- Aim for high test coverage

### 11.8 Deployment Process

#### Development Deployment
```bash
# Build the application
yarn build

# Start with PM2
pm2 start --only FEDev
```

#### Production Deployment
```bash
# Build the application
yarn build

# Start with PM2
pm2 start --only FE
```

#### Environment Variables
- Set environment variables in production
- Use `.env.production` file
- Don't commit `.env` files to git
- Use environment-specific configuration

#### Monitoring
- Monitor error logs (Sentry)
- Monitor performance (LogRocket)
- Monitor uptime (UptimeRobot)
- Monitor API health

### 11.9 Common Tasks

#### Adding a New Category
1. Add category to `nuxt.config.js` router.extendRoutes
2. Create category page in `pages/-category/`
3. Create category component in `components/category/`
4. Add translations in `locales/en.js` and `locales/bn.js`
5. Add category to navigation menus

#### Adding a New Ad Position
1. Add ad position to `types/ads.ts`
2. Create store in `store/ads/`
3. Add getter to store
4. Update component to use new ad position
5. Update API endpoint

#### Adding a New Language
1. Add language to `nuxt.config.js` i18n configuration
2. Create translation file in `locales/`
3. Add translations for all UI elements
4. Update language toggle component
5. Test all pages in new language

#### Adding a New Feature
1. Plan the feature
2. Create necessary components
3. Create necessary stores
4. Create necessary composables
5. Update pages to use new feature
6. Write tests
7. Update documentation

### 11.10 Useful Resources

- [Nuxt 2 Documentation](https://nuxtjs.org/docs/2.x)
- [Vue 2 Documentation](https://vuejs.org/v2/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [VueUse Documentation](https://vueuse.org/)
- [FontAwesome Documentation](https://fontawesome.com/docs)

### 11.11 Getting Help

- Check existing code for examples
- Read documentation
- Ask team members
- Use online resources
- Check GitHub issues

---

## 12. Risk Assessment Summary

### 12.1 Maintainability Score: 5/10

**Assessment**:
- **Positive**: Good use of TypeScript, clear component organization, comprehensive type definitions
- **Negative**: No service layer, scattered state management, no error handling, no documentation

**Factors**:
- Code organization: 7/10
- Type safety: 8/10
- Documentation: 3/10
- Error handling: 2/10
- Code duplication: 4/10

---

### 12.2 Scalability Score: 6/10

**Assessment**:
- **Positive**: Modular component structure, good use of lazy loading, responsive design
- **Negative**: No service layer, no pagination, no caching, no microservices architecture

**Factors**:
- Component modularity: 7/10
- State management: 5/10
- API architecture: 4/10
- Performance optimizations: 5/10
- Infrastructure: 6/10

---

### 12.3 Code Quality Summary

**Strengths**:
- TypeScript usage throughout
- Clear component organization
- Good use of Composition API
- Comprehensive type definitions
- Tailwind CSS for styling
- Responsive design

**Weaknesses**:
- No service layer
- No error handling
- No loading states
- No unit tests
- No documentation
- Mixins instead of composables
- Direct API calls in components

**Overall**: The code quality is decent but has significant room for improvement, particularly in error handling, testing, and documentation.

---

### 12.4 Bus Factor Risk: 3/10

**Assessment**:
- **Low Risk**: The codebase is well-organized with clear patterns
- **Medium Risk**: Some components are large and complex
- **High Risk**: No documentation makes onboarding difficult

**Factors**:
- Code organization: 7/10
- Documentation: 3/10
- Code comments: 4/10
- Consistency: 6/10

**Recommendation**: Improve documentation and create more reusable components to reduce bus factor risk.

---

### 12.5 Upgrade Complexity: Nuxt 2 → Nuxt 3: 8/10

**Assessment**:
- **High Complexity**: Nuxt 2 to Nuxt 3 migration is a major undertaking
- **Major Changes Required**:
  - Options API to Composition API migration
  - Vuex to Pinia migration (already using Pinia, so this is easier)
  - Plugin updates
  - Module updates
  - Routing updates
  - SEO updates
  - Server-side rendering changes

**Factors**:
- Options API usage: 8/10 (high)
- Composition API usage: 7/10 (high)
- Pinia usage: 10/10 (already using Pinia)
- Plugin complexity: 7/10 (medium)
- Module complexity: 6/10 (medium)
- Routing complexity: 7/10 (medium)

**Recommendation**: Plan migration carefully, create migration plan, test thoroughly, and consider incremental migration.

**Estimated Effort**: 2–4 weeks for complete migration

---

### 12.6 Security Assessment: 4/10

**Critical Issues**:
1. No authentication system
2. No CSRF protection
3. No input validation
4. No XSS protection
5. No rate limiting
6. No HTTPS enforcement
7. No Content Security Policy
8. No security headers

**Medium Issues**:
1. No error logging
2. No analytics integration
3. No user tracking
4. No session management

**Low Issues**:
1. No CSP headers
2. No Helmet
3. No security headers

**Recommendation**: Implement security measures immediately, particularly authentication and input validation.

---

### 12.7 Performance Assessment: 6/10

**Strengths**:
- Lazy loading for components
- Responsive design
- Tailwind CSS for styling
- Image optimization (partial)

**Weaknesses**:
- No image optimization (no WebP, no lazy loading)
- No caching strategy
- No pagination
- No service worker
- No code splitting (except lazy components)
- No tree shaking
- No image optimization

**Recommendation**: Implement image optimization, caching strategy, pagination, and service worker for better performance.

---

### 12.8 Overall Assessment

**Summary**:
The Financial Express is a well-structured Nuxt 2 application with good use of TypeScript, Composition API, and Tailwind CSS. However, it has significant technical debt, particularly in error handling, testing, documentation, and security. The codebase is maintainable but requires significant refactoring to improve scalability and code quality.

**Key Strengths**:
- TypeScript usage throughout
- Clear component organization
- Good use of Composition API
- Comprehensive type definitions
- Tailwind CSS for styling
- Responsive design
- Pinia for state management
- Lazy loading for components

**Key Weaknesses**:
- No service layer
- No error handling
- No loading states
- No unit tests
- No documentation
- Mixins instead of composables
- Direct API calls in components
- No authentication system
- No security measures
- No performance optimizations

**Recommendations**:
1. **Immediate**: Add error handling, loading states, and authentication
2. **Short-term**: Create service layer, implement pagination, add image optimization
3. **Medium-term**: Migrate to composables, add unit tests, improve documentation
4. **Long-term**: Migrate to Nuxt 3, implement microservices, add comprehensive testing

**Risk Level**: Medium
- **Technical Debt**: High
- **Security Risk**: High
- **Maintainability Risk**: Medium
- **Scalability Risk**: Medium
- **Upgrade Risk**: High

**Overall**: The application is functional but requires significant refactoring to improve maintainability, scalability, and security. The codebase is a good starting point but needs significant investment to reach production-ready standards.

---

## Conclusion

This technical documentation provides a comprehensive overview of The Financial Express codebase. It identifies strengths, weaknesses, and areas for improvement. The documentation serves as a reference for developers, stakeholders, and anyone interested in understanding the project architecture and making informed decisions about future development.

**Next Steps**:
1. Review this documentation with the team
2. Prioritize improvements based on business needs
3. Create a refactoring roadmap
4. Implement quick wins first
5. Gradually address technical debt
6. Improve documentation and testing
7. Plan for Nuxt 3 migration

**Final Note**: This documentation is based on the analyzed code and may not reflect all features or changes made after the analysis. Always refer to the latest code for accurate information.
