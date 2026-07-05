# Installation & Setup Guide - Bella Skincare

Complete step-by-step guide to get Bella Skincare running on your machine.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Option A: Using shadcn CLI (Recommended)](#option-a-using-shadcn-cli-recommended)
3. [Option B: Manual Setup](#option-b-manual-setup)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)

---

## System Requirements

Before you begin, ensure you have:
- **Node.js**: Version 18.17 or higher
- **npm**: Version 9+ (or pnpm/yarn)
- **Git**: For cloning or version control
- **Text Editor**: VS Code recommended

### Check Your Versions

```bash
node --version    # Should be v18.17.0 or higher
npm --version     # Should be 9.0.0 or higher
```

If you need to update:
- **Node.js**: Download from https://nodejs.org
- **npm**: Run `npm install -g npm@latest`

---

## Option A: Using shadcn CLI (Recommended)

The shadcn CLI makes setup quick and handles all dependencies automatically.

### Step 1: Extract and Navigate

```bash
# Extract the project ZIP file
unzip bella.zip
cd bella
```

### Step 2: Run shadcn CLI Setup

```bash
npx shadcn-ui@latest init
```

When prompted:
- **Tailwind CSS installation**: Choose `Yes`
- **Default style**: Select `New York` (or your preference)
- **Default color**: Keep default
- **CSS variables**: Keep default

### Step 3: Install Dependencies

```bash
npm install
# or if you prefer pnpm:
pnpm install
```

### Step 4: Start Development Server

```bash
npm run dev
# or with pnpm:
pnpm dev
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

You should see the Bella Skincare homepage with all products displayed!

---

## Option B: Manual Setup

Use this approach if you prefer manual control over dependencies.

### Step 1: Extract Project

```bash
unzip bella.zip
cd bella
```

### Step 2: Install Dependencies

```bash
npm install
# Dependencies will be installed from package-lock.json
```

If you encounter issues:
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Step 3: Verify Next.js Setup

The project includes:
- ✅ `next.config.mjs` - Next.js configuration
- ✅ `package.json` - All dependencies
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `app/` directory - App Router setup

### Step 4: Start Development Server

```bash
npm run dev
```

Server will start on: **http://localhost:3000**

### Step 5: Build for Production

```bash
npm run build
npm run start
```

---

## Verification

### Homepage Should Display:
- ✅ "Bella" header with gradient logo
- ✅ "Admin" button in top right
- ✅ Category filter bar (All, Hydration, Brightening, etc.)
- ✅ 8 product cards in a 5-column grid on desktop
- ✅ Each product shows image, name, description, and price

### Test Interactions:

1. **Click on a product card**
   - Should navigate to product details page
   - Shows larger image, full description, benefits, and "Buy Now" button

2. **Click "Buy Now"**
   - Should navigate to checkout page
   - Displays order summary and payment form

3. **Click "Admin" button**
   - Should navigate to admin panel
   - Shows form to add new products

4. **Category Filtering**
   - Click different category pills
   - Products should filter accordingly

---

## Troubleshooting

### Issue: Port 3000 Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- -p 3001
```

### Issue: Module Not Found

**Error**: `Cannot find module '@/components/...'`

**Solution**:
1. Verify all component files exist in `/components` folder
2. Check file names match exactly (case-sensitive on Linux/Mac)
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Issue: Tailwind Styles Not Loading

**Error**: Styles appear broken or unstyled

**Solution**:
```bash
# Rebuild CSS
npm run dev

# Or clean and reinstall:
rm -rf node_modules .next
npm install
npm run dev
```

### Issue: Image Not Loading

**Error**: Product images show broken image icon

**Solution**:
- The app uses Unsplash URLs which require internet connection
- Verify your internet connection
- Images in product cards should load automatically

### Issue: TypeScript Errors

**Error**: Type errors in console

**Solution**:
1. These are usually non-blocking in development
2. Verify by running build:
   ```bash
   npm run build
   ```
3. If build succeeds, errors are development-only

---

## Environment Variables

The app runs without additional environment variables. However, if you want to add features later:

### For Future Features

Create a `.env.local` file in the project root:

```bash
# Example for future integrations
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note**: Current version doesn't require environment variables to run.

---

## File Structure After Installation

```
bella/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   ├── page.tsx                # Main page
│   ├── favicon.ico             # Browser tab icon
│   └── ...
├── components/
│   ├── Header.tsx              # Top navigation
│   ├── CategoryFilter.tsx       # Category selector
│   ├── ProductGrid.tsx          # Product display
│   ├── ProductCard.tsx          # Individual product
│   ├── ProductDetails.tsx       # Product page
│   ├── Checkout.tsx             # Checkout page
│   ├── OrderSuccess.tsx         # Order confirmation
│   ├── AdminPanel.tsx           # Admin section
│   └── ui/                      # shadcn components
├── public/                     # Static files
├── node_modules/               # Dependencies (created by npm)
├── .next/                      # Build output (created by npm)
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript config
├── next.config.mjs             # Next.js config
├── tailwind.config.ts          # Tailwind config
├── postcss.config.mjs          # PostCSS config
└── README.md                   # Project documentation
```

---

## Next Steps After Installation

1. **Customize Colors**: Edit gradient colors in components
2. **Add Your Products**: Go to Admin panel and add real products
3. **Replace Images**: Use your own product images from Unsplash or other sources
4. **Deploy**: Follow deployment guide in README.md

---

## Performance Tips

After installation, optimize your setup:

### Enable Fast Refresh
- Already enabled by default in Next.js 16
- Changes to code appear instantly in browser

### Use VS Code Extensions
```
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Thunder Client (for API testing)
```

### Build Optimization
```bash
# Analyze bundle size
npm install -D @next/bundle-analyzer

# View production build
npm run build
npm start
```

---

## Getting Help

If you encounter issues:

1. **Check Logs**: Look at terminal output for error messages
2. **Verify Installation**: Run `npm list` to check dependencies
3. **Clear Cache**: 
   ```bash
   rm -rf node_modules .next
   npm install
   ```
4. **Check Documentation**:
   - Next.js: https://nextjs.org/docs
   - React: https://react.dev
   - Tailwind: https://tailwindcss.com

---

## Success!

If you see the Bella Skincare homepage with all products, navigation working, and the admin panel accessible, you're all set! 🎉

**Enjoy your premium e-commerce website!**
