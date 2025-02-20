/* eslint-disable @typescript-eslint/no-require-imports */
console.clear();
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const PreloadPlugin = require("preload-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MinifyCssNames = require("mini-css-class-name/css-loader");
const WebpackObsoletePlugin = require("webpack-obsolete-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const sassCompiler = require("sass");

const srcPath = path.resolve(__dirname, "./src/");
const destPath = path.resolve(__dirname, "./build/"); // ('../Api/wwwroot')
const assetsPath = "./public";
const filesThreshold = 8196; // (bytes) threshold for compression, url-loader plugins

module.exports = function defaultConfig(env, argv) {
  const isDevServer = env.WEBPACK_SERVE;
  const mode = argv.mode || (isDevServer ? "development" : "production");
  const isDevMode = mode !== "production";

  process.env.NODE_ENV = mode; // it resolves issues in postcss.config.js (since Define plugin is loaded only after reading config-files)

  /** @type {import('webpack').Configuration} */
  const result = {
    stats: {
      children: false, // disable console.info for node_modules/*
      modules: false,
      errors: true,
      errorDetails: true,
    },
    // entryPoint for webpack; it can be object with key-value pairs for multi build (https://webpack.js.org/concepts/entry-points/)
    entry: path.resolve(srcPath, "main.tsx"),

    output: {
      path: destPath,
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/", // url that should be used for providing assets
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // using import without file-extensions
      plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })], // plugin makes mapping from tsconfig.json to webpack:alias
    },
    optimization: {
      // config is taken from vue-cli
      splitChunks: {
        // for avoiding duplicated dependencies across modules
        minChunks: 1, // Minimum number of chunks that must share a module before splitting.
        cacheGroups: {
          defaultVendors: {
            name: "chunk-vendors", // move js-files from node_modules into splitted file [chunk-vendors].js
            test: /[\\/]node_modules[\\/]/, // filtering files that should be included
            priority: -10, // a module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority
            chunks: "initial", // type of optimization: [initial | async | all]
          },
          common: {
            name: "chunk-common", // move reusable nested js-files into splitted file [chunk-common].js
            minChunks: 2, // minimum number of chunks that must share a module before splitting
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true, // If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated. This can impact the resulting file name of the chunk
          },
        },
      },
    },
    module: {
      rules: [
        // rule for js, jsx files
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            "babel-loader", // transpile *.js, *.jsx, *.ts, *.tsx to result according to .browserslistrc and babel.config.js files
            {
              loader: "ts-loader", // transpile *.ts to *.js, despite babel-loader deals with typeScript without restrictions but doesn't have .browserslist support
              options: {
                transpileOnly: true, // we don't type checking during the compilation - it's task for CodeEditor
              },
            },
            // optional: "ifdef-loader" // provides conditional compilation: https://github.com/nippur72/ifdef-loader
            // optional: "eslint-loader" // provides lint-errors into webpack output
          ],
        },
        // rule for ts, tsx files
        {
          test: /\.(js|jsx)$/,
          exclude: (() => {
            // these packages must be included to change according to browserslist
            const include = ["web-ui-pack", "ytech-js-extensions"];
            return (v) => v.includes("node_modules") && !include.some((lib) => v.includes(lib));
          })(),
          use: [
            "babel-loader", // transpile *.js, *.jsx, *.ts, *.tsx to result according to .browserslistrc and babel.config.js files
            // optional: "ifdef-loader" // provides conditional compilation: https://github.com/nippur72/ifdef-loader
            // optional: "eslint-loader" // provides lint-errors into webpack output
          ],
        },
        // rule for images
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/, // optional: optimizing images via PNGO etc.
          type: "asset",
          generator: {
            filename: "images/[name][ext][query]", // [hash][ext][query]",
          },
          parser: {
            // it converts images that have size less 'limit' option into inline base64-css-format
            dataUrlCondition: {
              maxSize: filesThreshold, // if file-size more then limit, file-loader copies one into outputPath
            },
          },
        },
        // rule for svg-images
        {
          test: /\.(svg)(\?.*)?$/, // for reducing file-size: OptimizeCSSAssetsPlugin > cssnano > SVGO, that configured in webpack.prod.js
          exclude: /(fonts\\.+\.svg)(\?.*)?/,
          type: "asset",
          generator: {
            filename: "images/[name][ext][query]", // [hash][ext][query]",
            dataUrl: (content) => svgToMiniDataURI(content.toString()),
          },
          parser: {
            // it converts images that have size less 'limit' option into inline base64-css-format
            dataUrlCondition: {
              maxSize: filesThreshold, // if file-size more then limit, file-loader copies one into outputPath
            },
          },
        },
        // rule for fonts
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          type: "asset",
          generator: {
            filename: "fonts/[name][ext][query]", // [hash][ext][query]",
          },
          parser: {
            // it converts images that have size less 'limit' option into inline base64-css-format
            dataUrlCondition: {
              maxSize: filesThreshold, // if file-size more then limit, file-loader copies one into outputPath
            },
          },
        },
        // special rule for fonts in svg-format
        {
          test: /(fonts\\.+\.svg)(\?.*)?$/i, // for reducing file-size: OptimizeCSSAssetsPlugin > cssnano > SVGO, that configured in webpack.prod.js
          type: "asset",
          generator: {
            filename: "fonts/[name][ext][query]", // [hash][ext][query]",
            dataUrl: (content) => svgToMiniDataURI(content.toString()),
          },
          parser: {
            // it converts images that have size less 'limit' option into inline base64-css-format
            dataUrlCondition: {
              maxSize: filesThreshold, // if file-size more then limit, file-loader copies one into outputPath
            },
          },
        },
        // rules for style-files
        {
          test: /\.css$|\.scss$/,
          use: [
            isDevServer
              ? "style-loader" // it extracts style directly into html (MiniCssExtractPlugin works incorrect with hmr and modules architecture)
              : MiniCssExtractPlugin.loader, // it extracts styles into file *.css
            {
              loader: "css-loader", // it interprets @import and url() like import/require() and it resolves them (you can use [import *.css] into *.js).
              options: {
                modules: {
                  auto: /\.(module|m)\.\w+$/, // enable css-modules option for files *.module*. & *.m.*
                  getLocalIdent: isDevMode
                    ? (() => {
                        // it simplifies classNames fo debug purpose
                        const getHash = MinifyCssNames();
                        return (context, localIdentName, localName, options) =>
                          `${localName}_${getHash(context, localIdentName, localName, options)}`;
                      })()
                    : MinifyCssNames(
                        // minify classNames for prod-build
                        { excludePattern: /[_dD]/gi }, // exclude '_','d','D' because Adblock blocks '%ad%' classNames
                      ),
                },
              },
            },
            "css-unicode-loader", // fixes weird issue when browser sometimes doesn't render font-icons (https://stackoverflow.com/questions/69466120/troubles-with-webpack-sass-and-fontawesome/73363510#73363510)
            {
              loader: "sass-loader", // it compiles Sass to CSS, using Node Sass by default
              options: {
                additionalData: '@use "variables" as *;', // inject this import by default in each scss-file
                sassOptions: {
                  implementation: sassCompiler, // Prefer `dart-sass`, even if `sass-embedded` is available
                  loadPaths: [path.resolve(__dirname, "src/styles")], // using paths as root: https://sass-lang.com/documentation/js-api/interfaces/options/#loadPaths
                },
              },
            },
            "postcss-loader", // it provides adding vendor prefixes to CSS rules using values from Can I Use (see postcss.config.js in the project)
          ],
        },
      ],
    },
    plugins: [
      new webpack.WatchIgnorePlugin({ paths: [/\.d\.ts$/] }), // ignore d.ts files in --watch mode
      new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }), // it adds force-ignoring unused parts of modules like moment/locale/*.js
      new webpack.DefinePlugin({
        // it adds custom Global definition to the project like BASE_URL for index.html
        "process.env": {
          NODE_ENV: JSON.stringify(mode),
          BASE_URL: '"/"',
        },
        "global.DEV": JSON.stringify(isDevMode),
        "global.DEBUG": JSON.stringify(false),
        "global.VERBOSE": JSON.stringify(false),
      }),
      new CaseSensitivePathsPlugin(), // it fixes bugs between OS in caseSensitivePaths (since Windows isn't CaseSensitive but Linux is)
      new HtmlWebpackPlugin({
        // it creates *.html with injecting js and css into template
        template: path.resolve(srcPath, "index.html"),
        minify: isDevMode
          ? false
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              collapseBooleanAttributes: true,
              removeScriptTypeAttributes: true,
            },
      }),
      // todo: watchFix for update to webpack5: https://github.com/GoogleChromeLabs/preload-webpack-plugin/issues/132
      new PreloadPlugin({
        // it adds 'preload' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
        rel: "preload",
        include: "initial",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /obsolete\.js$/],
      }),
      new PreloadPlugin({
        // it adds 'prefetch' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
        rel: "prefetch",
        include: "asyncChunks",
      }),
      new MiniCssExtractPlugin({
        // it extracts css-code from js into splitted file
        filename: isDevMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDevMode ? "[id].css" : "[id].[contenthash].css",
      }),
      // it copies files like images, fonts etc. from 'public' path to 'destPath' (since not every file will be injected into css and js)
      new CopyWebpackPlugin({
        patterns: [
          {
            from: assetsPath,
            to: destPath,
            toType: "dir",
          },
        ],
      }),
      new webpack.ProgressPlugin(), // it shows progress of building
      new webpack.ProvidePlugin({
        React: "react", // optional: react. it adds [import React from 'react'] as ES6 module to every file into the project
      }),
      new WebpackObsoletePlugin({ isStrict: true }), // provides popup via alert-script if browser unsupported (according to .browserslistrc)
      // optional: new BundleAnalyzerPlugin() // creates bundles-map in browser https://github.com/webpack-contrib/webpack-bundle-analyzer
    ],
  };

  return result;
};

module.exports.filesThreshold = filesThreshold;
module.exports.assetsPath = assetsPath;
