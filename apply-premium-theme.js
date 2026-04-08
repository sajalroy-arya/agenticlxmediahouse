const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');
const cssPath = path.join(__dirname, 'assets/index-CjQT8uzF.css');

// 1. Update text "5-10" to "20-30" in HTML and JS
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  html = html.replace(/5-10 /g, '20-30 ');
  html = html.replace(/5-10/g, '20-30');
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log("Updated 5-10 to 20-30 in index.html");
}

if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');
  js = js.replace(/5-10 /g, '20-30 ');
  js = js.replace(/"5-10"/g, '"20-30"');
  js = js.replace(/>5-10</g, '>20-30<');
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log("Updated 5-10 to 20-30 in js file");
}

// 2. Update CSS theme in assets/index-CjQT8uzF.css
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  
  // We'll surgically replace the :root variables
  const premiumRoot = `:root{
--background: 222 47% 11%;
--foreground: 210 40% 98%;
--card: 222 47% 13%;
--card-foreground: 210 40% 98%;
--popover: 222 47% 13%;
--popover-foreground: 210 40% 98%;
--primary: 43 74% 49%;
--primary-foreground: 222 47% 11%;
--secondary: 217.2 32.6% 17.5%;
--secondary-foreground: 210 40% 98%;
--muted: 217.2 32.6% 17.5%;
--muted-foreground: 215 20.2% 65.1%;
--accent: 217.2 32.6% 17.5%;
--accent-foreground: 210 40% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 210 40% 98%;
--border: 217.2 32.6% 17.5%;
--input: 217.2 32.6% 17.5%;
--ring: 43 74% 49%;
--shadow-primary: 0 0 20px hsl(43 74% 49% / 0.15);
--shadow-glow: 0 0 40px hsl(43 74% 49% / 0.2);
--radius: 12px;
--sidebar-background: 0 0% 98%;
--sidebar-foreground: 0 0% 26%;
--sidebar-primary: 0 0% 10%;
--sidebar-primary-foreground: 0 0% 98%;
--sidebar-accent: 0 0% 95%;
--sidebar-accent-foreground: 0 0% 10%;
--sidebar-border: 0 0% 91%;
--sidebar-ring: 25 95% 53%;}`;

  // Use string replace to find the original :root and replace it
  const rootRegex = /:root\s*\{[^\}]+\}/;
  if(rootRegex.test(css)) {
    css = css.replace(rootRegex, premiumRoot.replace(/\n/g, ' '));
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log("Successfully updated :root CSS Variables with Premium Theme");
  } else {
    console.error("Could not find :root in CSS to replace");
  }
}
