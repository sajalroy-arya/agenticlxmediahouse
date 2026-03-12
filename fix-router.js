const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets/index-CUq1qnW3.js');

if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');
  
  // The minified router has `<Route path="/" element={<eb />} />, <Route path="*" element={<tb />} />`
  // We want to change the root route to be a catch-all `*` so it works on GitHub Pages subdirectories
  // and ignores the 404 component entirely.
  const target = 'c.jsx(Ja,{path:"/",element:c.jsx(eb,{})}),c.jsx(Ja,{path:"*",element:c.jsx(tb,{})})';
  const replacement = 'c.jsx(Ja,{path:"*",element:c.jsx(eb,{})})';
  
  if (js.includes(target)) {
    js = js.replace(target, replacement);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Fixed React Router issues in minified JS bundle. All paths now route to the main component.');
  } else {
    // try a fuzzy replace using regex for the router part
    const regex = /c\.jsx\([a-zA-Z0-9_]+,\{path:"\/",element:c\.jsx\([a-zA-Z0-9_]+,\{\}\)\}\),c\.jsx\([a-zA-Z0-9_]+,\{path:"\*",element:c\.jsx\([a-zA-Z0-9_]+,\{\}\)\}\)/;
    const match = js.match(regex);
    if (match) {
       console.log("Found match via regex: ", match[0]);
       // extract the first component to make it catch-all
       const newCode = match[0].replace(/path:"\/"/, 'path:"*"').split('}),')[0] + '})';
       js = js.replace(match[0], newCode);
       fs.writeFileSync(jsPath, js, 'utf8');
       console.log('Fixed React Router issues via Regex.');
    } else {
       console.log('Could not find the React Router code.');
    }
  }
}
