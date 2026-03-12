const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');
  
  // Searching for SortX and AI
  // Old: children:["SortX",c.jsx("span",{className:"text-primary",children:"AI"})]
  const target1 = 'children:["SortX",';
  const replace1 = 'children:["Agentic",';
  
  const target2 = 'children:"AI"';
  const replace2 = 'children:"LX"';
  
  let modified = false;

  if (js.includes(target1)) {
    js = js.replace(target1, replace1);
    modified = true;
  }
  
  // We need to be careful with replace2 because children:"AI" could be used elsewhere? 
  // Let's replace only the exact sequence 'className:"text-primary",children:"AI"}'
  const safeTarget2 = 'className:"text-primary",children:"AI"}';
  const safeReplace2 = 'className:"text-primary",children:"LX"}';
  
  if (js.includes(safeTarget2)) {
    js = js.replace(safeTarget2, safeReplace2);
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Successfully replaced "SortX" and "AI" with "Agentic" and "LX" in the navbar.');
  } else {
    // regex fallback
    const regex = /children:\["SortX",([a-zA-Z0-9_\.]+)\("span",\{className:"text-primary",children:"AI"\}\)\]/;
    const match = js.match(regex);
    if (match) {
      const code = match[0].replace('"SortX"', '"Agentic"').replace('"AI"', '"LX"');
      js = js.replace(match[0], code);
      fs.writeFileSync(jsPath, js, 'utf8');
      console.log('Successfully replaced with regex.');
    } else {
      console.log('Could not find the text to replace.');
    }
  }
}
