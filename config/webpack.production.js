const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  output: {
    filename: 'scripts/[name].[contenthash].js',
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
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
        },
        // { 
        //   from: join(__dirname, '../src/web/views/index.html'), 
        //   to: "../views",
        //   transform(content) {
        //     return minify(content.toString('utf-8'), {
        //       collapseWhitespace: true,
        //     });
        //   }, 
        // }
      ],
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
}