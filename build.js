/* 将 src/ 下的 HTML + CSS + JS 内联打包为单文件 index.html */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const srcDir = path.join(root, 'src');

let html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(srcDir, 'game.js'), 'utf8');

html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>');
html = html.replace('<script src="game.js"></script>', '<script>\n' + js + '\n</script>');

if (!html.includes('<style>') || !html.includes('window.__RJ')) {
  throw new Error('内联失败：占位符未替换');
}
if (html.includes('href="style.css"') || html.includes('src="game.js"')) {
  throw new Error('内联失败：仍存在外部引用');
}

fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8');
console.log('已生成 index.html  ' + (html.length / 1024).toFixed(1) + ' KB');
