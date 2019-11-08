const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  devtool: "inline-source-map", // 编译后如果出错会指向出错文件而不是编译后文件
  devServer: {
    contentBase: "./dist", // 将该文件夹作为网站根目录启动服务器
    hot: true // 开启模块热替换
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次编译后会先清空输出文件夹
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: 'src/index.html'
    }), // 输出的html文件的相关配置信息
    // 模块热替换相关插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"] // 处理图片的加载器
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"] // 处理字体文件
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"] // 处理csv文件
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"] // 处理xml文件
      }
    ]
  }
};
