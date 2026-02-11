// Simple script to create SVG placeholders for testing
// Run: node create-placeholders.js

const fs = require('fs');
const path = require('path');

const industries = [
  { name: 'epc', color: '#f97316', label: 'EPC' },
  { name: 'water', color: '#3b82f6', label: 'Water Treatment' },
  { name: 'furniture', color: '#8b5cf6', label: 'Furniture' },
  { name: 'feed', color: '#10b981', label: 'Animal Feed' },
  { name: 'service', color: '#f59e0b', label: 'Service 24/7' },
  { name: 'auto', color: '#ef4444', label: 'Auto Parts' },
  { name: 'retail', color: '#ec4899', label: 'Retail' },
  { name: 'landscaping', color: '#22c55e', label: 'Landscaping' },
];

const imagesDir = path.join(__dirname, 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

industries.forEach(({ name, color, label }) => {
  const svg = `
    <svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="1000" fill="${color}"/>
      <text 
        x="400" 
        y="500" 
        font-family="Arial, sans-serif" 
        font-size="60" 
        font-weight="bold" 
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >${label}</text>
      <text 
        x="400" 
        y="580" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        fill="rgba(255,255,255,0.7)" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >Placeholder Image</text>
      <text 
        x="400" 
        y="620" 
        font-family="Arial, sans-serif" 
        font-size="20" 
        fill="rgba(255,255,255,0.5)" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >800 x 1000</text>
    </svg>
  `.trim();

  const filename = path.join(imagesDir, `${name}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Created ${name}.svg`);
});

console.log('\n🎉 All placeholder images created in public/images/');
console.log('💡 Replace these SVG files with real JPG images when ready!');
console.log('\nTo use JPG instead:');
console.log('1. Replace .svg with .jpg in src/lib/constants.ts');
console.log('2. Add your actual images to public/images/');
