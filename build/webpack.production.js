const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;

module.exports = {
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: join(__dirname, '../src/web/views/layouts'), 
          to: "../views/layouts",
          transform(content) {
            return minify(content.toString('utf-8'), {
              collapseWhitespace: true,
            });
          },
        },
        { 
          from: join(__dirname, '../src/web/components'), 
          to: "../components",
          transform(content) {
            return minify(content.toString('utf-8'), {
              collapseWhitespace: true,
            });
          }, 
        }
      ],
    }),
  ]
}