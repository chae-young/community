const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withPlugins([[withImages], [withBundleAnalyzer]], {
  compress: true,

  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production"
    const nextConfig = {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
    }
    // nextConfig.optimization = {
    //   ...config.optimization,
    //   minimize: true,
    //   minimizer: [new UglifyJsPlugin()],
    // }
    return nextConfig
  },
})
