const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

// 1. Fix HTML body
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  if (!html.includes('overflow-x-hidden')) {
    html = html.replace(/<body>/g, '<body class="overflow-x-hidden">');
    fs.writeFileSync(indexHtmlPath, html, 'utf8');
    console.log('Fixed index.html body');
  }
}

// 2. Fix JS bundle main wrapper
if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');

  // Find the exact wrapper class for the main App component
  const mainWrapperTarget = 'className:"min-h-screen bg-background text-foreground"';
  const mainWrapperReplace = 'className:"min-h-screen overflow-x-hidden bg-background text-foreground"';
  
  if (js.includes(mainWrapperTarget)) {
    js = js.replace(mainWrapperTarget, mainWrapperReplace);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Fixed js bundle wrapper');
  } else if (!js.includes(mainWrapperReplace)) {
    console.log('Could not find the main wrapper div in JS!');
  }
}
