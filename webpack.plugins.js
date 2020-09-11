const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = [new ForkTsCheckerWebpackPlugin(), new CleanWebpackPlugin()];
