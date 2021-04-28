const { argv } = require('yargs');
const mode = argv.mode || 'development';
const envConfig = require(`./build/webpack.${mode}.js`);
const { merge } = require('webpack-merge');
const { sync } = require('glob');
const { join } = require('path');

const files = sync('./src/web/views/**/*.entry.js');

console.log('当前：', files);
//1、判断打包环境
//2、遍历所有的入口文件
const entrys = {};
let _plugins = [];

files.forEach((url) => {
  if (/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)$/.test(url)) {
    const entryKey = RegExp.$1;
    const [pagesName, actionName] = entryKey.split('-');
    entrys[entryKey] = url;
    // entrys[entryKey] = `./src/web/views/${pagesName}/${entryKey}.entry.js`;
  }
})

console.log(entrys);

const baseConfig = {
  mode, 
  entry: entrys,
  output: {
    path: join(__dirname, './dist/assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
}

module.exports = merge(baseConfig, envConfig);