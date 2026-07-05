# Bella Skincare - Premium E-Commerce Website

A fully functional, beautifully designed e-commerce website for a premium skincare brand built with Next.js 16, React 19, and Tailwind CSS.

## Features

### Customer-Facing Features
- **Product Gallery**: Browse 8 premium skincare products with high-quality images
- **Category Filtering**: Filter products by category (Hydration, Brightening, Renewal, Soothing, Cleansing, Sun Care)
- **Product Details**: Detailed product pages with descriptions, benefits, pricing, and specifications
- **Checkout Flow**: Complete checkout experience with order and payment forms
- **Order Success**: Beautiful order confirmation with order details
- **Responsive Design**: Optimized for desktop and mobile devices

### Admin Features
- **Admin Panel**: Secure admin interface to manage products
- **Add Products**: Dynamic form to add new products to the catalog
- **Real-time Updates**: New products appear immediately on the homepage
- **Product Management**: Full control over product details, pricing, and categories

## Design Highlights

### Premium Aesthetics
- Elegant gradient rose/pink color scheme
- Clean, minimalist layout with generous whitespace
- High-quality product photography
- Smooth animations and transitions
- Premium typography with optimal line heights

### Layout Improvements
- **Wide Container**: Max-width 7xl (1280px) with responsive padding for optimal screen utilization
- **Horizontal Category Filter**: Sleek pill-shaped category buttons for easy filtering
- **5-Column Product Grid**: Desktop view displays 5 products per row for efficient space usage
- **Responsive Grid**: Adapts to 1 column on mobile, 2 on tablets, 5 on desktop

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Images**: Next.js Image component with optimization
- **State Management**: React hooks (useState)
- **Type Safety**: TypeScript

## Project Structure

```
bella/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── globals.css         # Global styles and design tokens
│   └── page.tsx            # Main application page
├── components/
│   ├── Header.tsx          # Navigation header with admin button
│   ├── CategoryFilter.tsx   # Horizontal category filter bar
│   ├── ProductGrid.tsx      # Main product grid display
│   ├── ProductCard.tsx      # Individual product card
│   ├── ProductDetails.tsx   # Product detail view
│   ├── Checkout.tsx         # Checkout flow with forms
│   ├── OrderSuccess.tsx     # Order confirmation page
│   └── AdminPanel.tsx       # Admin product management
├── public/                 # Static assets
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Quick Start

1. **Clone or extract the project**
   ```bash
   cd bella
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## Usage

### Customer Flow

1. **Browse Products**: The homepage displays all 8 products in a beautiful 5-column grid
2. **Filter by Category**: Click category pills to filter products
3. **View Details**: Click any product card to see detailed information
4. **Checkout**: Click "Buy Now" to proceed to checkout
5. **Enter Details**: Fill in shipping and payment information
6. **Order Confirmation**: See your order confirmation with tracking info

### Admin Flow

1. **Access Admin Panel**: Click "Admin" button in the top right
2. **Add New Product**: Fill in product details:
   - Product Name
   - Price
   - Category
   - Description
   - Image URL (use Unsplash or similar)
3. **Save**: Click "Add Product"
4. **Verify**: Return to homepage to see the new product displayed immediately
5. **Exit**: Click the X button to return to the homepage

## Sample Product Images

The application uses high-quality images from Unsplash:
- Beauty product shots
- Cosmetics photography
- Skincare product displays

You can replace image URLs with your own images in the product data.

## Customization

### Colors & Branding

Edit the gradient colors in components:
- Primary gradient: `from-rose-600 to-pink-500`
- Modify in Header.tsx, ProductCard.tsx, Checkout.tsx, AdminPanel.tsx

### Product Data

Edit initial products in `app/page.tsx`:
```typescript
const [products, setProducts] = useState<Product[]>([
  // Modify or add products here
]);
```

### Product Categories

Update categories in `components/CategoryFilter.tsx`:
```typescript
const categories = ['All', 'Hydration', 'Brightening', ...];
```

### Grid Layout

Adjust product grid columns in `components/ProductGrid.tsx`:
```typescript
// Current: 5 columns on desktop
grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Click "Deploy"
4. Your site is live!

### Deploy to Other Platforms

- Build: `pnpm build`
- Start: `pnpm start`
- Compatible with Netlify, AWS, Azure, etc.

## Features Implemented

✅ Responsive product grid (5 columns on desktop)  
✅ Horizontal category filter bar  
✅ Product detail pages with ratings  
✅ Complete checkout flow  
✅ Payment form validation  
✅ Admin panel for product management  
✅ Dynamic product updates  
✅ Order success confirmation  
✅ Premium design & animations  
✅ Mobile-optimized layout  

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Optimized images with Next.js Image component
- CSS-in-JS with Tailwind (0 runtime overhead)
- Code splitting with Next.js
- Fast initial load time

## Future Enhancements

- Payment integration (Stripe)
- Database integration for persistent product storage
- User authentication
- Shopping cart functionality
- Wishlist feature
- Product reviews
- Email notifications
- Analytics integration

## License

MIT License - feel free to use for personal or commercial projects

## Support

For questions or issues, refer to:
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- React: https://react.dev

---

**Bella Skincare** - Premium skincare products for discerning customers.
"# bella-skin" 
