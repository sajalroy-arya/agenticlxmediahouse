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

  // Fix "30 Daysfor " spacing on mobile by adding a space before "for "
  // It looks like: children:"for "
  // Let's replace the exact sequence for safety
  const exactTypoTarget = 'children:"for "';
  const exactTypoReplacement = 'children:" for "';
  js = js.replace(exactTypoTarget, exactTypoReplacement);

  // Fix CTA link (currently: https://cal.com/agenticlx/appointments)
  // We'll replace it with a placeholder for now, so it doesn't 404
  js = js.replace(/https:\/\/cal\.com\/agenticlx\/appointments/g, '#book-call');

  // Replace Linkedin link pointer to be a placeholder for the user's actual connect link
  js = js.replace(/https:\/\/www\.linkedin\.com\/company\/agenticlx\//g, 'https://linkedin.com/in/sajal-roy-arya');

  // Add the phone number to the footer contact section.
  // The contact section looks like: 
  // c.jsx("div",{className:"flex flex-col gap-3 text-muted-foreground text-sm",children:c.jsxs("a",{href:"mailto:sajalveroy@gmail.com",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:[c.jsx(Dd,{className:"w-4 h-4 text-primary"}),"sajalveroy@gmail.com"]})})
  
  // We want to add another contact line for the phone.
  const contactDivTarget = 'children:c.jsxs("a",{href:"mailto:sajalveroy@gmail.com"';
  // We can inject a fragment or array. Let's make it an array of children.
  const contactDivReplacement = 'children:[c.jsxs("a",{href:"tel:+918839503404",className:"flex items-center gap-2 hover:text-foreground transition-colors",children:[c.jsx("svg",{className:"w-4 h-4 text-primary",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",viewBox:"0 0 24 24",children:c.jsx("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),"+91 8839503404"]}),c.jsxs("a",{href:"mailto:sajalveroy@gmail.com"';

  if (js.includes(contactDivTarget)) {
    js = js.replace(contactDivTarget, contactDivReplacement);
    // and close the array at the end of the div
    // replacing: text-primary"}),"sajalveroy@gmail.com"]})})]}
    // with: text-primary"}),"sajalveroy@gmail.com"]})]})}
    js = js.replace(/"sajalveroy@gmail\.com"\]\}\)\}\)/, '"sajalveroy@gmail.com"]})]})}');
  }

  fs.writeFileSync(jsPath, js, 'utf8');
  console.log("Successfully fixed all content requested.");
}
