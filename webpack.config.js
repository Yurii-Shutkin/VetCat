const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PAGES_DIR = path.resolve(__dirname, 'src/pug/pages');

const pages = fs
  .readdirSync(PAGES_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const textCardData = require('./src/pug/partials/data/cards/textCardData');
const teamCardData = require('./src/pug/partials/data/cards/teamCardData');
const petCardData = require('./src/pug/partials/data/cards/petCardData');
const priceCardData = require('./src/pug/partials/data/cards/priceCardData');
const hero = require('./src/pug/partials/data/hero');




module.exports = {
  mode: 'development',

  entry: pages.reduce((config, page) => {
    const jsPath = path.resolve(__dirname, 'src/js', page, 'index.js');
   
    if (fs.existsSync(jsPath)) {
      config[page] = jsPath;
    }
    return config;
  }, {}),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/', 
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),

    ...pages.map(page => 
      new HtmlWebpackPlugin({
        template: path.resolve(PAGES_DIR, page, 'index.pug'),
        templateParameters: {
          textCardData: textCardData,
          teamCardData: teamCardData,
          petCardData: petCardData,
          hero: hero,
          priceCardData: priceCardData,
        },
        filename: page === 'main' ? 'index.html' : `${page}/index.html`,
        chunks: [page],
      })
    ),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img'),         
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: { pretty: true }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], 
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  devServer: {
    static: './dist',
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/main/index.html' },
      ],
    },
    watchFiles: [
      'src/pug/**/*',   
      'src/js/**/*',    
      'src/scss/**/*'  
    ],
  },

  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@js': path.resolve(__dirname, 'src/js'),
    },
  },
};
