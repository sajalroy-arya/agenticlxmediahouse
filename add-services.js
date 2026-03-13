const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');

  // 1. Add WhatsApp Lead Handling to the US array
  const usArrayEndTarget = '"Qualified leads booked directly into your calendar for estimates."}]';
  
  const waIcon = '()=>c.jsx("svg",{className:"w-6 h-6 text-primary",fill:"currentColor",viewBox:"0 0 24 24",children:c.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"})})';

  const usArrayReplacement = `"Qualified leads booked directly into your calendar for estimates."}, {icon:${waIcon},title:"WhatsApp Lead Handling",description:"Automate WhatsApp outreach to instantly engage, nurture, and secure your clinic leads."}]`;

  if (js.includes(usArrayEndTarget)) {
    js = js.replace(usArrayEndTarget, usArrayReplacement);
    console.log("Added WhatsApp Lead Handling service.");
  } else {
    console.error("Could not find US array end target.");
  }

  // 2. Add New Upcoming GPT Ads Section INLINE inside the eb array
  const gptSectionJSX = `c.jsxs("section",{className:"section-padding bg-gradient-to-b from-background to-primary/5 relative overflow-hidden border-y border-primary/20",children:[c.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"}),c.jsxs("div",{className:"max-w-4xl mx-auto relative px-4 sm:px-6 text-center",children:[c.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6",children:[c.jsx("span",{children:"\\u2728 Upcoming Feature"})]}),c.jsxs("h2",{className:"text-2xl sm:text-3xl md:text-4xl font-bold mb-6",children:["The Future of Scale: ",c.jsx("span",{className:"text-primary",children:"GPT Ads"})]}),c.jsx("p",{className:"text-lg text-muted-foreground mb-8 max-w-2xl mx-auto",children:"Soon releasing our proprietary GPT-powered ad creation engine tailored explicitly for cosmetic & aesthetic clinics, designed to outperform standard human agency copywriting at scale."}),c.jsxs("div",{className:"inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-primary/20 shadow-sm",children:[c.jsx("span",{className:"w-2 h-2 rounded-full bg-primary animate-pulse"}),c.jsx("span",{className:"text-sm font-medium",children:"Launching Q3 for existing partners"})]})]})]})`;

  // We are injecting directly into: `c.jsx(KS,{}),c.jsx(qS,{})`
  // We replace it with: `c.jsx(KS,{}),${gptSectionJSX},c.jsx(qS,{})`
  const insertTarget = 'c.jsx(KS,{}),c.jsx(qS,{})';
  const insertReplacement = `c.jsx(KS,{}),${gptSectionJSX},c.jsx(qS,{})`;

  if (js.includes(insertTarget)) {
    js = js.replace(insertTarget, insertReplacement);
    console.log("Injected GptAdsSec INLINE into the main app page.");
  } else {
    console.error("Could not find the sequence KS -> qS in the main app to insert the new section.");
  }

  fs.writeFileSync(jsPath, js, 'utf8');
}
