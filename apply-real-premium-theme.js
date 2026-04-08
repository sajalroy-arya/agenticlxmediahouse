const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

// 1. Text Replacements
function replaceText(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/5-10/g, '20-30');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated text in", path.basename(filePath));
  }
}
replaceText(indexHtmlPath);
replaceText(jsPath);

// 2. Inject Premium CSS completely bypassing the previous limited approach
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Remove any previously injected style if it exists
  html = html.replace(/<style id="premium-overrides">[\s\S]*?<\/style>/, '');

  const premiumStyles = `
    <style id="premium-overrides">
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@500;600;700;800&display=swap');

      /* Typography Override - Solves the mobile lowercase heart font issue */
      body, p, a, span, div, li, input {
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Syne', sans-serif !important;
        font-weight: 700 !important;
        letter-spacing: -0.03em !important;
      }

      /* Force Capitalization for Hero & Match Laptop */
      h1, h2 {
        text-transform: capitalize !important;
      }

      /* True Premium Color Overrides */
      :root {
        --background: 226 45% 6%; /* Deep Space Navy */
        --foreground: 45 40% 96%; /* Warm Cream */
        --card: 226 45% 9%;
        --card-foreground: 45 40% 96%;
        --primary: 38 60% 55%; /* Copper Gold */
        --primary-foreground: 226 45% 6%;
      }

      body {
        background-color: #060913 !important; /* Extremely dark premium navy */
        color: #f8f6f0 !important;
      }

      /* Elegant gradients for text */
      .bg-clip-text {
        background-image: linear-gradient(135deg, #f8f6f0 0%, #b8af9c 100%) !important;
        -webkit-text-fill-color: transparent !important;
      }
      .text-orange-500, .text-amber-500, .text-yellow-500 {
        background: linear-gradient(135deg, #d4af37, #e8c973) !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        color: transparent !important;
      }

      /* Subtle, sophisticated cards instead of generic glass */
      .bg-black\\/50, .bg-slate-900\\/50, .bg-slate-900, .bg-gray-900, .bg-zinc-900 {
        background-color: rgba(15, 20, 35, 0.6) !important;
        border: 1px solid rgba(212, 175, 55, 0.15) !important;
        box-shadow: 0 10px 30px rgba(0,0,0, 0.3) !important;
        backdrop-filter: blur(15px) !important;
        border-radius: 16px !important;
      }

      /* Buttons Premium Treatment */
      button, .bg-orange-500, .bg-amber-500 {
        background: linear-gradient(135deg, #d4af37, #af851a) !important;
        color: #000 !important;
        font-family: 'Inter', sans-serif !important;
        font-weight: 600 !important;
        border: none !important;
        border-radius: 8px !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2) !important;
        text-shadow: none !important;
      }

      button:hover, .bg-orange-500:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4) !important;
        background: linear-gradient(135deg, #e8c973, #c29b2b) !important;
      }
      
      /* Features pill outline */
      .rounded-full.border {
        border-color: rgba(212, 175, 55, 0.3) !important;
        background: rgba(212, 175, 55, 0.05) !important;
        color: #e5d5a8 !important;
      }

      /* Fix SVGs colors to match copper */
      svg.text-orange-500 {
        color: #d4af37 !important;
      }
    </style>
  </head>`;

  html = html.replace('</head>', premiumStyles);
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log("Injected true premium CSSOverrides into index.html");
}
