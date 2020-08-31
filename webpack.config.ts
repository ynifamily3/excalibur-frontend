import * as webpack from "webpack";
import * as path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const config: webpack.Configuration = {
  mode: "development",
  entry: {
    reactApp: "./src/UI/index.tsx",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/react"),
    compress: true,
    port: 3000,
    writeToDisk: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve("./dist/react"),
    filename: "[name].js?[hash]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/UI/main.html"),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};

export default config;
