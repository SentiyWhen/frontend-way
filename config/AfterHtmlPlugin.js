const pluginName = 'AfterHtmlPlugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');

function createHtml(type, array) {
  let result = '';
  if (type === 'js') {
    array.forEach((url) => {
      result += `<script class="lazyload-js" src="${url}"></script>`
    })
  }
  if (type === 'css') {
    array.forEach((url) => {
      result += `<link rel="stylesheet" src="${url}"></link>`
    })
  }
  return result;
}
class AfterHtmlPlugin {
  apply(compiler) {
    // compiler(只有一个)  webpack编译对象
    // compilation（多个）  每一次构建
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // console.log('The compiler is starting a new compilation...')
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          console.log(data.assets);
          this.jsArr = data.assets.js;
          this.cssArr = data.assets.css;
          cb(null, data)
        }
      )
      // 重新写入 js css
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          let _html = data.html;
          const scriptString = createHtml('js',this.jsArr);
          const linkString = createHtml('css',this.cssArr);
          _html = _html.replace('<!--injectjs-->', scriptString);
          _html = _html.replace('<!--injectcss-->', linkString);
          // _html = _html.replace(/@components/g, '../../../components');
          // _html = _html.replace(/@layouts/g, '../../layouts');
          data.html = _html;
          cb(null, data)
        }
      )
    })
  }
}

module.exports = AfterHtmlPlugin;