const { argv } = require('yargs');
const mode = argv.mode || 'development';
const envConfig = require(`./build/webpack.${mode}.js`);
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const { sync } = require('glob');
const { join } = require('path');

const files = sync('./src/web/views/**/*.entry.js');

console.log('当前：', files);
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
        filename: `../web/views/${pagesName}/pages/${actionName}.html`,
        template: `./src/web/views/${pagesName}/pages/${actionName}.html`,
        chunks: ['runtime', entryKey],
      })
    )
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
      },
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
      },
    ]
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { 
          from: join(__dirname, './src/web/views/layouts'), 
          to: "../web/views/layouts" 
        },
        { 
          from: join(__dirname, './src/web/components'), 
          to: "../web/components" 
        }
      ],
    }),
  ]
}

module.exports = merge(baseConfig, envConfig);