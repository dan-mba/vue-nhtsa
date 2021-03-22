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
      .maxEntrypointSize(760000)
      .maxAssetSize(410000)
  }
}