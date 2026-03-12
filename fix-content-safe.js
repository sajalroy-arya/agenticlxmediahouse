const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

// 1. Fix HTML emails
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  html = html.replace(/priyansh@agenticlx\.com/g, 'sajalveroy@gmail.com');
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
}

// 2. Fix JS bundle
if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');

  // Fix email
  js = js.replace(/priyansh@agenticlx\.com/g, 'sajalveroy@gmail.com');

  // Fix "30 Daysfor" spacing on mobile
  js = js.replace(/children:"for "/g, 'children:" for "');

  // Fix CTA link
  js = js.replace(/https:\/\/cal\.com\/agenticlx\/appointments/g, 'https://calendly.com/sajalveroy');

  // LinkedIn link
  js = js.replace(/https:\/\/www\.linkedin\.com\/company\/agenticlx\//g, 'https://linkedin.com/in/sajal-roy-arya');

  // Add phone number to first footer section
  // find: c.jsx("a",{href:"mailto:sajalveroy@gmail.com",className:"w-10 h-10
  // replace with phone link + that
  const phoneIconLink = `c.jsx("a",{href:"tel:+918839503404",className:"w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors","aria-label":"Call us",children:c.jsx("span",{children:"\\uD83D\\uDCDE"})}),`;
  js = js.replace(/c\.jsx\("a",\{href:"mailto:sajalveroy@gmail\.com",className:"w-10 h-10/g, phoneIconLink + 'c.jsx("a",{href:"mailto:sajalveroy@gmail.com",className:"w-10 h-10');

  // Add phone number to "Contact Us" text section
  // find: children:c.jsxs("a",{href:"mailto:sajalveroy@gmail.com",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:[c.jsx(Dd,{className:"w-4 h-4 text-primary"}),"sajalveroy@gmail.com"]})})
  // Let's do a much safer replacement. We know "Contact Us" is right above it.
  // Wait, I can just replace `href:"mailto:sajalveroy@gmail.com",className:"flex items-center gap-2` with an array.
  // Actually, we can just replace `"sajalveroy@gmail.com"]})})` with `"sajalveroy@gmail.com"]}), c.jsxs("a",{href:"tel:+918839503404",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:[c.jsx("span",{className:"w-4 h-4 text-primary",children:"\\uD83D\\uDCDE"}),"+91 8839503404"]})]}`  -> Oh no, the brackets again.

  // Let's replace the whole parent Component!
  // `c.jsx("div",{className:"flex flex-col gap-3 text-muted-foreground text-sm",children:c.jsxs("a",{href:"mailto:sajalveroy@gmail.com",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:[c.jsx(Dd,{className:"w-4 h-4 text-primary"}),"sajalveroy@gmail.com"]})})`
  // We don't know the exact `Dd` variable name. It varies due to minification.
  
  // So regex: /c\.jsx\("div",\{className:"flex flex-col gap-3 text-muted-foreground text-sm",children:c\.jsxs\("a",\{href:"mailto:sajalveroy@gmail\.com",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:\[c\.jsx\([A-Za-z0-9_]+,\{className:"w-4 h-4 text-primary"\}\),"sajalveroy@gmail\.com"\]\}\)\}\)/
  
  const contactUsRegex = /c\.jsx\("div",\{className:"flex flex-col gap-3 text-muted-foreground text-sm",children:c\.jsxs\("a",\{href:"mailto:sajalveroy@gmail\.com",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:\[c\.jsx\(([A-Za-z0-9_]+),\{className:"w-4 h-4 text-primary"\}\),"sajalveroy@gmail\.com"\]\}\)\}\)/;
  
  const match = js.match(contactUsRegex);
  if (match) {
    const iconVar = match[1]; // e.g. Dd
    const replacement = `c.jsxs("div",{className:"flex flex-col gap-3 text-muted-foreground text-sm",children:[c.jsxs("a",{href:"tel:+918839503404",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:[c.jsx("span",{className:"w-4 h-4 text-primary",children:"\\uD83D\\uDCDE"}),"+91 8839503404"]}),c.jsxs("a",{href:"mailto:sajalveroy@gmail.com",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:[c.jsx(${iconVar},{className:"w-4 h-4 text-primary"}),"sajalveroy@gmail.com"]})]})`;
    js = js.replace(contactUsRegex, replacement);
  }

  fs.writeFileSync(jsPath, js, 'utf8');
}
