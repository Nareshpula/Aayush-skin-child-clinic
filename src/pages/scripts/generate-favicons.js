const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Base64 encoded SVG of the Aayush Hospital logo (simplified version)
// This is a placeholder representation based on the navbar logo description
const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#7a3a95" rx="20" ry="20"/>
  <text x="50" y="60" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="white">A</text>
</svg>
`;

// Save the SVG file
fs.writeFileSync(path.join(outputDir, 'logo.svg'), logoSvg);

// Generate favicon.ico (16x16 and 32x32)
sharp(Buffer.from(logoSvg))
  .resize(32, 32)
  .toFile(path.join(outputDir, 'favicon-32x32.png'))
  .then(() => console.log('Generated favicon-32x32.png'))
  .catch(err => console.error('Error generating favicon-32x32.png:', err));

sharp(Buffer.from(logoSvg))
  .resize(16, 16)
  .toFile(path.join(outputDir, 'favicon-16x16.png'))
  .then(() => console.log('Generated favicon-16x16.png'))
  .catch(err => console.error('Error generating favicon-16x16.png:', err));

// Generate apple-touch-icon.png (180x180)
sharp(Buffer.from(logoSvg))
  .resize(180, 180)
  .toFile(path.join(outputDir, 'apple-touch-icon.png'))
  .then(() => console.log('Generated apple-touch-icon.png'))
  .catch(err => console.error('Error generating apple-touch-icon.png:', err));

// Generate android-chrome icons
sharp(Buffer.from(logoSvg))
  .resize(192, 192)
  .toFile(path.join(outputDir, 'android-chrome-192x192.png'))
  .then(() => console.log('Generated android-chrome-192x192.png'))
  .catch(err => console.error('Error generating android-chrome-192x192.png:', err));

sharp(Buffer.from(logoSvg))
  .resize(512, 512)
  .toFile(path.join(outputDir, 'android-chrome-512x512.png'))
  .then(() => console.log('Generated android-chrome-512x512.png'))
  .catch(err => console.error('Error generating android-chrome-512x512.png:', err));

// Generate mstile-150x150.png
sharp(Buffer.from(logoSvg))
  .resize(150, 150)
  .toFile(path.join(outputDir, 'mstile-150x150.png'))
  .then(() => console.log('Generated mstile-150x150.png'))
  .catch(err => console.error('Error generating mstile-150x150.png:', err));

// Generate safari-pinned-tab.svg (monochrome SVG)
const safariSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20,0 H80 A20,20 0 0 1 100,20 V80 A20,20 0 0 1 80,100 H20 A20,20 0 0 1 0,80 V20 A20,20 0 0 1 20,0 Z M50,30 L70,70 H60 L55,60 H45 L40,70 H30 L50,30 Z M50,40 L45,50 H55 L50,40 Z" fill="#000000"/>
</svg>
`;

fs.writeFileSync(path.join(outputDir, 'safari-pinned-tab.svg'), safariSvg);
console.log('Generated safari-pinned-tab.svg');

// Generate favicon.ico (multi-size ICO file)
// Note: For a proper ICO file, you would need additional libraries or tools
// This is a simplified approach that creates a PNG instead
sharp(Buffer.from(logoSvg))
  .resize(32, 32)
  .toFile(path.join(outputDir, 'favicon.ico'))
  .then(() => console.log('Generated favicon.ico (as PNG)'))
  .catch(err => console.error('Error generating favicon.ico:', err));

console.log('All favicon assets generated successfully!');