const fs = require('fs');
const path = require('path');
const lucide = require('lucide');

const darkDir = path.join(__dirname, 'darkmode');
const lightDir = path.join(__dirname, 'lightmode');

if (fs.existsSync(darkDir)) fs.rmSync(darkDir, { recursive: true, force: true });
if (fs.existsSync(lightDir)) fs.rmSync(lightDir, { recursive: true, force: true });

fs.mkdirSync(darkDir, { recursive: true });
fs.mkdirSync(lightDir, { recursive: true });

function getSvg(iconName, strokeColor) {
  const iconNodes = lucide.icons[iconName];
  let paths = iconNodes.map(node => {
    const tag = node[0];
    const attrs = node[1];
    let attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `  <${tag} ${attrStr} />`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n${paths}\n</svg>`;
}

const allKeys = Object.keys(lucide.icons);
const targetCount = 300;

const availableIcons = [];

const common = ['Home', 'User', 'Settings', 'Search', 'Menu', 'Heart', 'Star', 'Check', 'Bell', 'Calendar', 'Camera', 'Mail', 'Phone', 'Image', 'Trash', 'Edit', 'Save', 'Upload', 'Download', 'Link', 'Lock', 'Eye', 'Info'];

for (const c of common) {
  if (allKeys.includes(c) && !availableIcons.includes(c)) {
    availableIcons.push(c);
  }
}

const step = Math.floor(allKeys.length / targetCount);
for (let i = 0; i < allKeys.length && availableIcons.length < targetCount; i += step) {
  if (!availableIcons.includes(allKeys[i])) {
    availableIcons.push(allKeys[i]);
  }
}

let idx = 0;
while (availableIcons.length < targetCount && idx < allKeys.length) {
  if (!availableIcons.includes(allKeys[idx])) {
    availableIcons.push(allKeys[idx]);
  }
  idx++;
}

for (const icon of availableIcons) {
  const darkSvg = getSvg(icon, '#FFFFFF');
  const lightSvg = getSvg(icon, '#000000');

  const filename = icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + '.svg';

  fs.writeFileSync(path.join(darkDir, filename), darkSvg);
  fs.writeFileSync(path.join(lightDir, filename), lightSvg);
}

console.log(`Successfully generated ${availableIcons.length} light and dark SVG icons!`);
