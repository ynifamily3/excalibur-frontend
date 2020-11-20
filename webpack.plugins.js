/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyPlugin({
    patterns: [
      {
        from: "src/renderer/assets",
        to:
          process.env.NODE_ENV === "development"
            ? "./assets/"
            : "./main_window/assets/",
      },
    ],
  }),
  new CleanWebpackPlugin(),
];
