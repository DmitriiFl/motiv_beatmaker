const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          outputPath: "sounds",
        },
      },
      {
        test: /\.otf$/,
        loader: "file-loader",
        options: {
          outputPath: "fonts/",
        },
      },
      // {
      //   test: /\.ico$/,
      //   loader: "file-loader",
      // },
      {
        test: /\.svg$/i,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true,
    }),
    new FaviconsWebpackPlugin("./src/assets/images/sampler.png"),
  ],
};
