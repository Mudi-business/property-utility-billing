
const { EnvironmentPlugin } = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = function (webpackEnv: any) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    entry: "./src/index.ts",
    stats: "errors-warnings",
    cache: true,
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    devtool: isEnvProduction
      ? "source-map"
      : isEnvDevelopment && "inline-source-map",
    output: {
      publicPath: `${process.env.FRONTEND_URL}/`,
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    devServer: {
      host: "0.0.0.0",
      port: process.env.PORT,
      historyApiFallback: true,
      allowedHosts: [`${process.env.FRONTEND_URL}`],
    },
    module: {
      rules: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ttf$/, /\.otf$/],
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 1000,
            },
          },
        },
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          include: path.resolve(__dirname, "./src"),
          exclude: /node_modules/,
          use: ["thread-loader", "babel-loader"],
        },
      ],
    },
    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            terserOptions: {
              parse: {
                // We want terser to parse ecma 8 code. However, we don't want it
                // to apply minification steps that turns valid ecma 5 code
                // into invalid ecma 5 code. This is why the `compress` and `output`
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warning: false,
                inline: 2,
              },
              mangle: {
                // Find work around for Safari 10+
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii__only: true,
              },
            },

            // Use multi-process parallel running to improve the build speed
            parallel: true,

            // Enable file caching
            cache: true,
          },
        }),
        // This is only used in production mode
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      //new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
      new HtmlWebPackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: "./src/index.html",
            // favicon: './src/assets/images/favicon.png',
          },
          // Only for production
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),

      new EnvironmentPlugin(["FRONTEND_URL","API_URL","PORT"]),
    ],
  };
};
