/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: ["./src/main/main.ts"],
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/main/preload.js", to: "./preload.js" },
        { from: "./assets/**", to: "." },
      ],
    }),
  ],
  devtool: process.env.NODE_ENV === "development" ? "source-map" : "none",
};
