const fs = require('fs');
const cssPath = 'c:\\Users\\sajal\\agenticlxmediahouse\\assets\\index-CjQT8uzF.css';
const css = fs.readFileSync(cssPath, 'utf8');

const rootMatch = css.match(/:root\s*{([^}]+)}/);
if (rootMatch) {
  console.log("Found :root variables:");
  console.log(rootMatch[1].split(';').join(';\n'));
} else {
  console.log("No :root found.");
}
