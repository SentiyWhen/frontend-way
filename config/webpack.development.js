const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  watch: true,
  output: {
    filename: 'scripts/[name].bundle.js',
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
        },
        // { 
        //   from: join(__dirname, '../src/web/views/index.html'), 
        //   to: "../views" 
        // }
      ],
    }),
    // new BundleAnalyzerPlugin(),
    // new WebpackBuildNotifierPlugin({
    //   title: 'sentiy_when',
    //   logo: './favicon.png',
    //   suppressSuccess: true,
    // }),
  ]
}