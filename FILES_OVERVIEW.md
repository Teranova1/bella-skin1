# Project Files Overview

Complete guide to every file in the Bella Skincare project.

---

## 📁 App Directory (`app/`)

### `app/page.tsx` - Main Application
**Purpose**: Core application logic and state management
- Manages all page views (home, productDetails, checkout, orderSuccess, admin)
- Stores product data with 8 sample products
- Handles state transitions and user navigation
- Provides product interface definition
- ~158 lines

**Key Functions**:
- `Home()` - Main component with view management
- Product filtering by category
- Dynamic product addition from admin panel

### `app/layout.tsx` - Root Layout
**Purpose**: HTML structure and metadata
- Defines document structure
- Sets page title and description
- Manages CSS imports
- ~50 lines

**Customization Points**:
- Line 7-8: Change page title and description
- Add favicon paths
- Modify viewport settings

### `app/globals.css` - Global Styles
**Purpose**: Tailwind configuration and global styles
- Imports Tailwind CSS v4
- Defines color tokens and design tokens
- Sets up theme variables
- ~170 lines

**Current Setup**:
- Light mode colors (white/slate background)
- Rose/pink gradient for primary brand color
- Responsive typography
- CSS variables for theming

---

## 🎨 Components Directory (`components/`)

### `components/Header.tsx` - Navigation Header
**Purpose**: Top navigation bar with branding
- Displays "Bella" logo with gradient
- Admin button for accessing admin panel
- Back navigation for non-home pages
- Sticky positioning
- ~40 lines

**Customization**:
- Line 13: Change logo text
- Line 8-13: Adjust logo style
- Line 18: Change admin button text

### `components/CategoryFilter.tsx` - Category Bar
**Purpose**: Horizontal category filter pills
- Displays 7 category buttons (All + 6 categories)
- Allows product filtering
- Active state styling with gradient
- Mobile responsive
- ~30 lines

**Categories**: 
`All`, `Hydration`, `Brightening`, `Renewal`, `Soothing`, `Cleansing`, `Sun Care`

**Customization**:
- Line 7: Add/remove categories
- Line 16: Change button styling

### `components/ProductGrid.tsx` - Product Display
**Purpose**: Grid layout for all products
- Displays filtered products
- 5-column grid on desktop, responsive on mobile
- Shows product count
- Handles empty states
- ~43 lines

**Grid Layout**:
```
Mobile: 1 column
Tablet: 2 columns
Desktop: 5 columns
Gap: 6 units (24px)
```

**Customization**:
- Line 30: Adjust grid columns

### `components/ProductCard.tsx` - Product Card Component
**Purpose**: Individual product display card
- Shows product image, name, description, price
- Hover effects and animations
- Click to view details
- Buy button with icon
- ~56 lines

**Features**:
- Image hover zoom effect
- Category badge
- Price display
- Add to cart button
- Shadow and scale animations

### `components/ProductDetails.tsx` - Product Detail Page
**Purpose**: Full product page with details
- Large product image
- Complete description
- Key benefits with checkmarks
- Star rating (5 stars)
- Product specifications
- Buy Now button
- ~110 lines

**Sections**:
1. Product image (full size)
2. Category and title
3. Star rating and reviews
4. Price and benefits
5. Product specs (Size, Formula, Type)
6. Call-to-action button

### `components/Checkout.tsx` - Checkout Page
**Purpose**: Complete checkout flow
- Order summary
- Shipping information form
- Payment details form
- Order totals and calculations
- Order summary sidebar
- Form validation
- ~252 lines

**Form Fields**:
- Full Name
- Email
- Phone Number
- Shipping Address
- Card Number
- Expiry Date
- CVV

**Features**:
- Real-time calculation (10% tax, free shipping)
- Form validation
- Loading state during processing
- Responsive layout with sidebar

### `components/OrderSuccess.tsx` - Order Confirmation
**Purpose**: Success page after checkout
- Animated checkmark icon
- Order number generation
- Delivery information
- Order status steps (Processing, Shipping)
- Continue shopping button
- ~72 lines

**Information Displayed**:
- Order confirmation message
- Random order number
- Estimated delivery time (3-5 days)
- Processing and shipping status

### `components/AdminPanel.tsx` - Admin Interface
**Purpose**: Admin dashboard for product management
- Dark theme background
- Product form with validation
- Category selector dropdown
- Success message feedback
- Instructions section
- ~201 lines

**Form Fields**:
- Product Name
- Price ($)
- Category (dropdown)
- Description (textarea)
- Image URL

**Features**:
- Form validation (all fields required)
- Success notification
- Auto-form reset after submission
- Helpful instructions for admin

### `components/ui/button.tsx` - Button Component
**Purpose**: shadcn button component
- Reusable button with variants
- TypeScript support
- Customizable styling
- ~60 lines (auto-generated)

---

## ⚙️ Configuration Files

### `package.json` - Dependencies
**Purpose**: Project metadata and dependencies

**Key Dependencies**:
```json
{
  "name": "bella-skincare",
  "version": "1.0.0",
  "dependencies": {
    "next": "^16.2.6",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "lucide-react": "latest",
    "tailwindcss": "^4.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Important Scripts**:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Run production build
- `npm run lint` - Code linting

### `tsconfig.json` - TypeScript Configuration
**Purpose**: TypeScript compiler options
- Path aliases (`@/` pointing to root)
- Strict type checking
- React 19 support
- ~35 lines

**Key Settings**:
- `lib`: ["ES2023", "dom", "dom.iterable"]
- `jsx`: "react-jsx"
- `strict`: true
- `paths`: Aliases for imports

### `next.config.mjs` - Next.js Configuration
**Purpose**: Next.js build and runtime configuration
- React Compiler enabled
- Image optimization
- Turbopack bundler (default)
- ~30 lines

### `postcss.config.mjs` - PostCSS Configuration
**Purpose**: CSS processing pipeline
- Tailwind CSS plugin
- Autoprefixer for browser compatibility
- ~10 lines

### `components.json` - shadcn Configuration
**Purpose**: shadcn/ui configuration
- Component library settings
- Tailwind CSS theme
- Component resolution paths
- ~25 lines

---

## 📚 Utility Files

### `lib/utils.ts` - Utility Functions
**Purpose**: Common helper functions
- `cn()` function for conditional class names
- TypeScript type safety
- Tailwind class merging
- ~15 lines

**Usage**:
```typescript
import { cn } from "@/lib/utils"
cn("base-class", condition && "conditional-class")
```

---

## 📖 Documentation Files

### `README.md` - Main Documentation
**Purpose**: Project overview and complete guide
- Feature list
- Technology stack
- Installation instructions
- Usage guide
- Customization tips
- Deployment options
- ~230 lines

### `INSTALLATION.md` - Detailed Setup Guide
**Purpose**: Step-by-step installation instructions
- System requirements
- Two installation options
- Verification steps
- Troubleshooting guide
- Environment variables
- ~344 lines

### `QUICK_START.md` - 5-Minute Quick Start
**Purpose**: Fast setup guide for impatient users
- Prerequisites check
- 3-step installation
- Quick customization
- Command reference
- ~190 lines

### `FILES_OVERVIEW.md` - This File
**Purpose**: Detailed description of every file

---

## 🔧 Build & Lock Files

### `pnpm-lock.yaml` - Dependency Lock File
**Purpose**: Ensures consistent dependency versions
- Pinned versions for all packages
- Platform-specific dependencies
- Created by pnpm
- Do NOT edit manually

### `.env.development.local` - Development Environment
**Purpose**: Local development environment variables
- Created by Next.js
- Stores local-only variables
- Not committed to git

### `.gitignore` - Git Ignore Rules
**Purpose**: Exclude files from version control
- `node_modules/` - Dependencies
- `.next/` - Build output
- `.env.local` - Local variables
- `*.log` - Log files

### `next-env.d.ts` - TypeScript Definitions
**Purpose**: Next.js TypeScript definitions
- Auto-generated by Next.js
- Provides type support for Next.js features
- Do NOT edit manually

---

## 📊 File Statistics

### Component Files
| File | Lines | Purpose |
|------|-------|---------|
| AdminPanel.tsx | 201 | Product management |
| Checkout.tsx | 252 | Checkout flow |
| ProductDetails.tsx | 110 | Product page |
| ProductCard.tsx | 56 | Product card |
| ProductGrid.tsx | 43 | Product grid |
| CategoryFilter.tsx | 30 | Category filter |
| OrderSuccess.tsx | 72 | Order confirmation |
| Header.tsx | 40 | Navigation |
| **TOTAL** | **804** | **Core components** |

### App Files
| File | Lines | Purpose |
|------|-------|---------|
| page.tsx | 158 | Main app logic |
| layout.tsx | 50 | HTML structure |
| globals.css | 170 | Global styles |

### Configuration
| File | Lines | Purpose |
|------|-------|---------|
| package.json | ~50 | Dependencies |
| tsconfig.json | ~35 | TypeScript config |
| next.config.mjs | ~30 | Next.js config |
| components.json | ~25 | shadcn config |
| postcss.config.mjs | ~10 | PostCSS config |

### Documentation
| File | Lines | Purpose |
|------|-------|---------|
| README.md | 230 | Main guide |
| INSTALLATION.md | 344 | Setup guide |
| QUICK_START.md | 190 | Quick start |
| FILES_OVERVIEW.md | This | File guide |

---

## 🔄 File Dependencies

### Import Hierarchy

```
page.tsx (Main)
├── Header.tsx
├── CategoryFilter.tsx
├── ProductGrid.tsx
│   └── ProductCard.tsx
├── ProductDetails.tsx
├── Checkout.tsx
├── OrderSuccess.tsx
└── AdminPanel.tsx

Shared:
├── lib/utils.ts (imported by all)
├── app/globals.css (imported by layout.tsx)
└── components.json (configuration)
```

---

## 🎯 Customization Points by File

### Branding
- **Header.tsx**: Logo text, admin button
- **globals.css**: Color scheme
- **ProductCard.tsx**: Gradient colors

### Content
- **page.tsx**: Product data, initial products
- **CategoryFilter.tsx**: Category list
- **ProductDetails.tsx**: Product information

### Layout
- **ProductGrid.tsx**: Grid columns
- **Checkout.tsx**: Form fields
- **AdminPanel.tsx**: Form structure

### Styling
- **globals.css**: Theme colors
- **All components**: Tailwind classes

---

## 📦 How Files Work Together

### User Journey

1. **Load app** → `page.tsx` and `layout.tsx` render
2. **View products** → `Header.tsx` + `CategoryFilter.tsx` + `ProductGrid.tsx` + `ProductCard.tsx`
3. **Click product** → `ProductDetails.tsx` displays
4. **Click Buy Now** → `Checkout.tsx` displays
5. **Submit form** → `OrderSuccess.tsx` displays
6. **Click Admin** → `AdminPanel.tsx` displays
7. **Add product** → Updates `page.tsx` product state

### Styling Flow

1. `globals.css` imports Tailwind
2. All components use Tailwind classes
3. `lib/utils.ts` helps with class merging
4. `postcss.config.mjs` processes CSS
5. `tailwind.config.ts` (if exists) customizes theme

### Build Flow

1. `package.json` defines scripts
2. `next.config.mjs` configures Next.js
3. `tsconfig.json` configures TypeScript
4. Build creates optimized `/.next` folder
5. `npm start` runs production build

---

## ✅ Key Features by File

| Feature | Primary File | Supporting Files |
|---------|-------------|-----------------|
| Product Display | ProductGrid.tsx | ProductCard.tsx |
| Product Details | ProductDetails.tsx | page.tsx |
| Checkout | Checkout.tsx | page.tsx |
| Order Confirmation | OrderSuccess.tsx | page.tsx |
| Admin Panel | AdminPanel.tsx | page.tsx |
| Category Filter | CategoryFilter.tsx | page.tsx, ProductGrid.tsx |
| Navigation | Header.tsx | page.tsx |
| Styling | globals.css | All components |

---

## 🚀 Ready to Customize?

1. **Change branding**: Edit `Header.tsx` and `globals.css`
2. **Modify products**: Edit product array in `page.tsx`
3. **Adjust layout**: Modify Tailwind classes in components
4. **Add features**: Create new components in `components/` directory
5. **Deploy**: Follow README.md deployment section

---

**Master the project by understanding each file's role!** 🎯
