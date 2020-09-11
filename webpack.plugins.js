const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CleanWebpackPlugin(),
  new NyanProgressPlugin(),
];
