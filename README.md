# Rysgally Tehnologiya Website

Modern, multi-language website for Rysgally Tehnologiya showcasing 8 industry services with beautiful animations.

## 🚀 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **next-intl** (i18n - Turkmen, Russian, English)
- **Lucide React** (Icons)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌍 Multi-Language Support

The site supports three languages:
- **Turkmen (tk)** - Default
- **Russian (ru)**
- **English (en)**

URLs:
- `/` - Turkmen (default)
- `/ru` - Russian
- `/en` - English

To add/edit translations, modify files in `src/messages/`:
- `tk.json` - Turkmen
- `ru.json` - Russian
- `en.json` - English

## 🎨 Customization

### Industries

Edit `src/lib/constants.ts` to customize industry data:

```typescript
export const INDUSTRIES: Industry[] = [
  {
    id: 'epc',
    color: '#f97316', // Change color
    iconName: 'Building2', // Lucide icon name
    image: '/images/epc.jpg', // Image path
  },
  // ...
];
```

### Colors

Each industry has its own color defined in `constants.ts`. The hero title gradient can be customized in `HeroSection.tsx`.

### Animations

Animation timings and effects are in:
- `IndustryCard.tsx` - Card hover effects, 3D tilt
- `HeroSection.tsx` - Text animations, scroll indicator
- `tailwind.config.ts` - Global animation keyframes

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── HeroSection.tsx    # Main hero component
│   └── IndustryCard.tsx   # Animated card component
├── lib/
│   └── constants.ts       # Industry data
├── messages/              # Translation files
│   ├── tk.json
│   ├── ru.json
│   └── en.json
├── i18n.ts               # i18n configuration
└── middleware.ts         # Locale routing
```

## 🖼️ Images

Place your industry images in `public/images/`:

Required images (800x1000px recommended, 4:5 aspect ratio):
- `epc.jpg`
- `water.jpg`
- `furniture.jpg`
- `feed.jpg`
- `service.jpg`
- `auto.jpg`
- `retail.jpg`
- `landscaping.jpg`

## 🎯 Features

### Hero Section
- ✅ Animated gradient text
- ✅ 3D card hover effects with tilt
- ✅ Smooth entrance animations
- ✅ Responsive bento grid layout
- ✅ Glow effects on hover
- ✅ Multi-language support

### Performance
- Image optimization with Next.js Image
- Lazy loading
- Smooth 60fps animations
- Mobile-optimized

## 🔧 Configuration

### Change Default Language

Edit `src/i18n.ts`:
```typescript
export const defaultLocale = 'tk' as const; // Change to 'ru' or 'en'
```

### Add New Language

1. Add locale to `src/i18n.ts`:
```typescript
export const locales = ['tk', 'ru', 'en', 'tr'] as const;
```

2. Create `src/messages/tr.json` with translations

3. Update middleware in `src/middleware.ts`:
```typescript
matcher: ['/', '/(tk|ru|en|tr)/:path*']
```

## 📱 Responsive Design

- Mobile: Single column, stacked cards
- Tablet: 2-column grid
- Desktop: Full bento grid layout

## 🚢 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to your preferred platform (Vercel, Netlify, VPS).

## 🎨 Customization Tips

### Change Card Animation Speed
In `IndustryCard.tsx`, adjust transition duration:
```typescript
transition={{ duration: 0.5 }} // Make faster/slower
```

### Disable 3D Tilt on Mobile
```typescript
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Conditional rendering
{!isMobile && (
  <motion.div style={{ rotateX, rotateY }}>
)}
```

### Change Gradient Colors
In `HeroSection.tsx`:
```typescript
bg-gradient-to-r from-orange-400 via-pink-400 to-orange-300
// Change to your brand colors
```

## 📝 TODO / Next Steps

- [ ] Add more sections (About, Services Details, Contact)
- [ ] Add navigation menu with language switcher
- [ ] Integrate contact form
- [ ] Add SEO metadata per page
- [ ] Add analytics
- [ ] Optimize images with WebP format

## 🤝 Contributing

This is a client project. All changes should be reviewed before deployment.

## 📄 License

Proprietary - Rysgally Tehnologiya

---

Built with ❤️ by iKAY
