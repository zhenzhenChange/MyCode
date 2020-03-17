/* 基于Node 遵循Commonjs规范 */
const path = require("path");
const webpack = require("webpack");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // => 入口
  // entry: "./src/index.js", // => 默认只打包有关联的文件
  // entry: ["./src/index.js", "./src/module.js"], // => 单出口
  entry: {
    index: "./src/index.js",
    module: "./src/module.js",
  },
  // => 出口
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve("./build"),
  },
  // => 开发服务器
  devServer: {
    contentBase: "./build", // => 告诉服务器从哪个目录中提供内容
    port: 3333, // => 指定要监听请求的端口号
    compress: true, // => 一切服务都启用 gzip 压缩
    open: true, // => 自动打开浏览器
    hot: true,
  },
  // => 模块配置
  module: {},
  // => 插件配置
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(), // => 清空build目录再打包
    new HTMLWebPackPlugin({
      template: "./src/index.html", // => HTML模板文件路径
      title: "StudyWebPack", // => 打包后HTML页面的标题
      filename: "index.html", // => 打包后HTML文件的名称
      hash: true, // => 启动hash去缓存，（文件未改变，hash也不改变）
      minify: {}, // => 压缩HTML
      chunks: ["index"], // => 跟入口 entry 的属性对应
    }),
    /* 多文件多入口多出口 */
    new HTMLWebPackPlugin({
      template: "./src/index.html",
      title: "StudyWebPack",
      filename: "module.html",
      hash: true,
      minify: {},
      chunks: ["module"],
    }),
  ],
  // => 模式（开发/生产）
  mode: "development",
  // => 配置解析
  resolve: {},
};
