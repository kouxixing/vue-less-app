const path = require("path");
const px2rem = require("postcss-px2rem");
const webpack = require("webpack");
const postcss = px2rem({
  remUnit: 32 // 基准大小 baseSize，需要和rem.js中相同
});
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/api"));

    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [postcss]
      }
    }
  },

  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    config.devtool = "source-map";
    const defConfig = {
      plugins: [
        // 优化 momentjs 的打包大小 https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ]
    };
    return defConfig;
  },
  transpileDependencies: [
    "vue-echarts",
    "resize-detector",
    "jsts",
    "shpjs",
    "vcolorpicker"
  ]
};
function addStyleResource(rule) {
  // 全局引用样式文件
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "src/assets/css/varibles.less") // 需要全局导入的less
      ]
    });
}
