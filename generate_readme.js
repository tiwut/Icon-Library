const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'lightmode');
if (!fs.existsSync(srcDir)) {
  console.error("lightmode directory not found");
  process.exit(1);
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.svg'));
files.sort((a, b) => a.localeCompare(b));

const columns = [
  { name: 'Name', path: '' },
  { name: 'Dark Mode', path: 'darkmode' },
  { name: 'Light Mode', path: 'lightmode' },
  { name: 'Red', path: 'red' },
  { name: 'Green', path: 'green' },
  { name: 'Blue', path: 'blue' },
  { name: 'Orange', path: 'orange' },
  { name: 'Pink', path: 'pink' },
  { name: 'Gold', path: 'gold' },
  { name: 'Yellow', path: 'yellow' },
  { name: 'Gray', path: 'gray' },
  { name: 'Light Blue', path: 'light-blue' },
  { name: 'Light Red', path: 'light-red' },
  { name: 'Light Green', path: 'light-green' },
  { name: 'Light Pink', path: 'light-pink' }
];

let md = '# Full Icon Catalog\n\n';
md += 'This document showcases all 800 icons in every single available color theme.\n\n';

md += '| ' + columns.map(c => c.name).join(' | ') + ' |\n';
md += '|' + columns.map(c => c.name === 'Name' ? ' :--- ' : ' :---: ').join('|') + '|\n';

for (const file of files) {
  const baseName = path.parse(file).name;
  let row = `| \`${baseName}\` |`;
  for (let i = 1; i < columns.length; i++) {
    const col = columns[i];
    row += ` ![${baseName}](${col.path}/${file}) |`;
  }
  md += row + '\n';
}

fs.writeFileSync(path.join(__dirname, 'ALL_ICONS.md'), md);
console.log('Successfully generated ALL_ICONS.md');
