/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const path = require("path");

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader", options: { url: false } },
  ],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    modules: [path.join(__dirname, "src/renderer"), "node_modules"],
  },
  entry: ["react-hot-loader/patch", "./src/renderer"],
  devtool: process.env.NODE_ENV === "development" ? "source-map" : "none",
  optimization: {
    splitChunks: {
      cacheGroups: {
        "vendor-react": {
          name: "vendor-react",
          test: /[\\/]node_modules[\\/]react.*?[\\/]/,
          chunks: "initial",
          priority: 2,
        },
        "vendor-all": {
          name: "vendor-all",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 1,
        },
      },
    },
  },
};
