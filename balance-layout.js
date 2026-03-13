const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');

  // 1. Balance the "Services" section
  // It has 7 items now (from the WhatsApp addition). Let's add an 8th "CRM Integration" 
  // and change grid `lg:grid-cols-3` to `lg:grid-cols-4` or `lg:grid-cols-4 sm:grid-cols-2`.
  // Wait, `lg:grid-cols-3` in `VS` section (services section).
  const servicesGridTarget = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6';
  if (js.includes(servicesGridTarget)) {
    js = js.replace(servicesGridTarget, 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6');
  }

  // Find the end of the US array to append a 8th service
  const waServiceTarget = 'title:"WhatsApp Lead Handling",description:"Automate WhatsApp outreach to instantly engage, nurture, and secure your clinic leads."}]';
  
  // Icon for CRM (e.g. a database or users icon, just a generic SVG placeholder for now)
  const crmIcon = '()=>c.jsx("svg",{className:"w-6 h-6 text-primary",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})';

  const crmServiceAdd = 'title:"WhatsApp Lead Handling",description:"Automate WhatsApp outreach to instantly engage, nurture, and secure your clinic leads."}, {icon:' + crmIcon + ',title:"CRM Integration",description:"We connect directly to your CRM to track every lead, ensuring zero patients fall through the cracks."}]';

  if (js.includes(waServiceTarget)) {
    js = js.replace(waServiceTarget, crmServiceAdd);
    console.log("Added 8th service to balance grip to 4x2");
  }

  // 2. Add WhatsApp references elsewhere
  // In the hero tags: "Facebook Ads", "Website & SEO", "Social Media", "AI Voice Agents"
  const heroTagsTarget = '["Facebook Ads","Website & SEO","Social Media","AI Voice Agents"].map';
  if (js.includes(heroTagsTarget)) {
    js = js.replace(heroTagsTarget, '["Facebook Ads","Website & SEO","WhatsApp Handlers","AI Voice Agents"].map');
    console.log("Updated Hero tags to mention WhatsApp");
  }

  // In the 30-day program list `QS` array
  const qsArrayTarget = '"AI voice agent calling","CRM integration included"]';
  if (js.includes(qsArrayTarget)) {
    js = js.replace(qsArrayTarget, '"AI voice agent calling","WhatsApp lead handling","CRM integration included"]');
    console.log("Added WhatsApp to QS array (30 day included)");
  }
  
  // 3. Blend the GPT Ads section
  // Old component wrapper: 
  // className:"section-padding bg-gradient-to-b from-background to-primary/5 relative overflow-hidden border-y border-primary/20"
  // Let's remove the borders and gradient to make it match the exact background color of the surrounding sections (bg-card/30 -> bg-background -> bg-card/30).
  // Actually, KS (results) is bg-card/30. qS (start pilot) is bg-card/30. So the intermediate section should also be `bg-card/30` or completely background without borders.
  // Blended wrapper: `className:"section-padding bg-card/30 relative overflow-hidden"`
  
  const gptSectionOldClassTarget = 'className:"section-padding bg-gradient-to-b from-background to-primary/5 relative overflow-hidden border-y border-primary/20"';
  const gptSectionBlendedClass = 'className:"section-padding bg-card/30 relative overflow-hidden"';
  
  if (js.includes(gptSectionOldClassTarget)) {
    js = js.replace(gptSectionOldClassTarget, gptSectionBlendedClass);
    console.log("Blended GPT Ads section seamlessly into background.");
  }

  fs.writeFileSync(jsPath, js, 'utf8');
}
