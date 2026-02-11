# Quick Start Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Add Your Images

Place 8 images in `public/images/`:
- epc.jpg (800x1000px recommended)
- water.jpg
- furniture.jpg
- feed.jpg
- service.jpg
- auto.jpg
- retail.jpg
- landscaping.jpg

**Tip**: Use high-quality images that represent each industry. The cards have a 4:5 aspect ratio.

## 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 4. Test Languages

- http://localhost:3000 (Turkmen - default)
- http://localhost:3000/ru (Russian)
- http://localhost:3000/en (English)

## 5. Customize

### Edit Industry Data
`src/lib/constants.ts` - Change colors, icons, image paths

### Edit Translations
- `src/messages/tk.json` - Turkmen
- `src/messages/ru.json` - Russian
- `src/messages/en.json` - English

### Change Colors
Edit the color values in `src/lib/constants.ts`:
```typescript
{
  id: 'epc',
  color: '#f97316', // Your brand color
  // ...
}
```

## Troubleshooting

**Images not showing?**
- Make sure images are in `public/images/`
- Check file names match exactly (case-sensitive)
- Restart dev server after adding images

**Animations laggy?**
- Disable 3D effects on slower devices
- Reduce the number of animated elements
- Check browser DevTools Performance tab

**Translations not working?**
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check JSON syntax in message files

## Next Steps

1. ✅ Hero section is done
2. Add Navigation (with language switcher)
3. Add Services detail section
4. Add About section
5. Add Contact form
6. Deploy!

---

Need help? Check the main README.md for detailed documentation.
