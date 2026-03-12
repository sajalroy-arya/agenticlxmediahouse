const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'index.html',
  'assets/index-CUq1qnW3.js',
  'assets/index-CjQT8uzF.css'
];

// Color replacements
// SortXAI uses orange: #f97316 (Tailwind orange-500). Also #ea580c (orange-600) maybe.
// Let's replace with premium golden #D4AF37.
const colorReplacements = [
  { regex: /#f97316/gi, replace: '#D4AF37' },
  { regex: /#ea580c/gi, replace: '#B5952F' },  // darker gold
  { regex: /f97316/gi, replace: 'D4AF37' },
];

// Text replacements for Brand
const textReplacements = [
  { regex: /SortXAI/g, replace: 'AgenticLX' },
  { regex: /SortXAi/g, replace: 'AgenticLX' },
  { regex: /Sort X AI/g, replace: 'Agentic LX' },
  { regex: /sortxai\.com/gi, replace: 'agenticlx.com' },
  { regex: /sortxai/gi, replace: 'agenticlx' },
];

// Text replacements for Niche
const nicheReplacements = [
  { regex: /home remodeling contractors/gi, replace: 'cosmetic & aesthetic clinics' },
  { regex: /home remodeling/gi, replace: 'cosmetic & aesthetic' },
  { regex: /remodeling contractors/gi, replace: 'cosmetic & aesthetic clinics' },
  { regex: /remodeling leads/gi, replace: 'clinic leads' },
  { regex: /remodelers/gi, replace: 'clinic owners' },
  { regex: /remodeling/gi, replace: 'aesthetic' },
  { regex: /contractors/gi, replace: 'clinics' },
  { regex: /homeowners/gi, replace: 'patients' },
  { regex: /project scope/gi, replace: 'treatment plan' },
  { regex: /booked estimates/gi, replace: 'booked consultations' }
];

const allReplacements = [...colorReplacements, ...textReplacements, ...nicheReplacements];

filesToProcess.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${file} not found.`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  allReplacements.forEach(({ regex, replace }) => {
    content = content.replace(regex, replace);
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
