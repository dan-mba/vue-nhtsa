/*
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
    */

module.exports = {
  "publicPath": "./",
  "outputDir": "docs",
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(700000)
      .maxAssetSize(400000)
  }
}