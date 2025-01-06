const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-cheap-source-map",
  entry: "./src/index.js",
  output: {
    filename: "yb-mini-vue.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "src/examples"), // 提供 HTML 文件
      },
      {
        directory: path.join(__dirname, "dist"), // 提供打包后的 JS 文件
        publicPath: "/dist", // 通过 /dist 访问 dist 中的文件
      },
    ],
    watchFiles: {
      paths: ["src/**/*"], // 监听文件变动
    },
    client: {
      overlay: true, // 在浏览器中显示错误和警告
    },
  },
};
