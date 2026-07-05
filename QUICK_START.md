# Quick Start - 5 Minutes to Launch

Get Bella Skincare running in just 5 minutes!

## Prerequisites Check (1 min)

Verify you have Node.js 18+:
```bash
node --version
```

Should show: `v18.17.0` or higher

---

## Installation (2 min)

### Step 1: Extract & Install
```bash
# Extract the ZIP file, then:
cd bella
npm install
```

### Step 2: Start Server
```bash
npm run dev
```

### Step 3: Open Browser
```
Visit: http://localhost:3000
```

Done! ✅

---

## What You Get

### Homepage
- 8 premium skincare products
- 5-column product grid
- Horizontal category filter
- Beautiful rose/pink design

### Admin Panel
- Click "Admin" button (top right)
- Add new products instantly
- Products appear on homepage immediately

### Product Pages
- Click any product to see details
- Click "Buy Now" for checkout
- See order confirmation

---

## Quick Customization

### Change Brand Name
Edit `app/page.tsx` and `components/Header.tsx`:
```typescript
<h1>Your Brand Name</h1>
```

### Add Your Products
1. Click "Admin" button
2. Fill product form
3. Use image URL from Unsplash
4. Click "Add Product"

### Change Colors
Replace `from-rose-600 to-pink-500` with:
- `from-blue-600 to-purple-500`
- `from-green-600 to-emerald-500`
- `from-orange-600 to-red-500`

In files: `Header.tsx`, `ProductCard.tsx`, `CategoryFilter.tsx`, `Checkout.tsx`, `AdminPanel.tsx`

---

## Project Structure

```
bella/
├── app/
│   ├── page.tsx          ← Main app logic
│   ├── layout.tsx        ← HTML structure
│   └── globals.css       ← Global styles
├── components/           ← All UI components
│   ├── Header.tsx
│   ├── ProductGrid.tsx
│   ├── Checkout.tsx
│   ├── AdminPanel.tsx
│   └── ... (5 more)
├── package.json          ← Dependencies
└── README.md             ← Full documentation
```

---

## Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for errors
npm run lint
```

---

## Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Missing styles?**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

**Module not found?**
```bash
npm install
npm run dev
```

---

## Ready to Deploy?

### Deploy to Vercel (Recommended - Free)
1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Click "Deploy"

### Deploy to Netlify
1. Build locally: `npm run build`
2. Deploy `dist` folder to Netlify
3. Or connect GitHub for automatic deploys

### Deploy to Your Server
1. Build: `npm run build`
2. Upload files
3. Run: `npm start`

---

## Features Checklist

✅ Responsive 5-column product grid  
✅ Horizontal category filters  
✅ Product detail pages  
✅ Checkout flow  
✅ Admin panel  
✅ Dynamic product updates  
✅ Mobile optimized  
✅ Premium animations  
✅ TypeScript support  
✅ Zero-cost hosting options  

---

## Next: Customize & Deploy

1. **Personalize**: Add your brand colors and products
2. **Test**: Click through all features
3. **Deploy**: Push to production
4. **Celebrate**: You have a live e-commerce site! 🎉

---

**Questions?** See `README.md` or `INSTALLATION.md` for detailed docs.

**Happy selling!** 🛍️
