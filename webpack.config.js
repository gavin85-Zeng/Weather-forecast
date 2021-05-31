// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: {
    bundle: path.join(__dirname, 'src', 'index.tsx')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: './dist',
    // open: true,
    hot: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body' 
    }),

    new MiniCssExtractPlugin({
      filename: './src/[name].css',
      chunkFilename: './[id].css'
    }),

    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    })
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        // loader: "ts-loader",
        use: {
          loader: 'babel-loader',
          options: {
            //@babel/plugin-transform-runtime avoid Uncaught ReferenceError: regeneratorRuntime is not defined issue
            presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime']
          } 
        },
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
