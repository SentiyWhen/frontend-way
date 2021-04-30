const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: true,
  output: {
    filename: '[name].bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: join(__dirname, '../src/web/views/layouts'), 
          to: "../views/layouts" 
        },
        { 
          from: join(__dirname, '../src/web/components'), 
          to: "../components" 
        }
      ],
    }),
  ]
}