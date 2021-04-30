const { argv } = require('yargs');
const mode = argv.mode || 'development';
const envConfig = require(`./build/webpack.${mode}.js`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AfterHtmlPlugin = require('./build/AfterHtmlPlugin');

const { merge } = require('webpack-merge');
const { sync } = require('glob');
const { join } = require('path');

const files = sync('./src/web/views/**/*.entry.js');
//1、判断打包环境
//2、遍历所有的入口文件
// html打包出来
const entrys = {};
const htmlPlugins = [];

files.forEach((url) => {
  if (/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)$/.test(url)) {
    const entryKey = RegExp.$1;
    const [pagesName, actionName] = entryKey.split('-');
    entrys[entryKey] = url;
    // entrys[entryKey] = `./src/web/views/${pagesName}/${entryKey}.entry.js`;
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${pagesName}/pages/${actionName}.html`,
        template: `./src/web/views/${pagesName}/pages/${actionName}.html`,
        chunks: ['runtime', entryKey],
        inject: false,
      })
    )
  }
})

const baseConfig = {
  mode, 
  entry: entrys,
  output: {
    path: join(__dirname, './dist/web/assets')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
      },
    ]
  },
  plugins: [
    ...htmlPlugins,
    new AfterHtmlPlugin(),
    new MiniCssExtractPlugin(),
  ]
}

module.exports = merge(baseConfig, envConfig);