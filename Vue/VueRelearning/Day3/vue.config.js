const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/day3" : "/",
  outputDir: "myassets",
  assetsDir: "static",
  runtimeCompiler: true,
  parallel: require("os").cpus.length > 1,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set("component", path.resolve(__dirname, "src/components"));
  },
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://39.108.132.32:8080"
      }
    }
  }
};
