const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

// Fix index.html
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  html = html.replace(/"\/assets\//g, '"./assets/');
  html = html.replace(/"\/favicon.png"/g, '"./favicon.png"');
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log('Fixed index.html');
}

// Fix js bundle
if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');
  js = js.replace(/"\/assets\//g, '"./assets/');
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('Fixed js bundle');
}
