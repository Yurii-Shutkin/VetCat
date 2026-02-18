const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const STRAPI_SERVER_URL = 'https://usable-trust-8c353f5555.strapiapp.com';
const PAGES_DIR = path.resolve(__dirname, 'src/pug/pages');
const url = STRAPI_SERVER_URL || 'http://localhost:1337';
const getStrapiData = require('./src/pug/partials/data/fetch/getStrapiData');
const getStrapiSingle = require('./src/pug/partials/data/fetch/getStrapiSingle');

const pages = fs
  .readdirSync(PAGES_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// const textCardData = require('./src/pug/partials/data/cards/textCardData');
// const teamCardData = require('./src/pug/partials/data/cards/teamCardData');
// const petCardData = require('./src/pug/partials/data/cards/petCardData');
const priceCardData = require('./src/pug/partials/data/cards/priceCardData');
const galleryCardData = require('./src/pug/partials/data/cards/galleryCardData');
const hero = require('./src/pug/partials/data/hero');
const tab = require('./src/pug/partials/data/tab');
const { get } = require('http');
// const sliderData = require('./src/pug/partials/data/sliderData');


module.exports = async () => {
  const textCardData = await getStrapiData('services-cards', item => ({
    title: item.title,
    desc: item.desc,
  }));

  const teamCardData = await getStrapiData('teams?populate=photo', item => ({
    photoUrl: item.photo?.url
    ? item.photo.url.startsWith('http')
      ? item.photo.url
      : `${url}${item.photo.url}`
    : null,

    name: item.name,
    position: item.position,
    data1: item.data1,
    data2: item.data2,
    id: item.id,
  }));

  const getEmployee = await getStrapiSingle('teams/thw16xi85onkxg6z8uw6kntm?populate=*');

  const getReviewWord = (count) => {
    if (count % 100 >= 11 && count % 100 <= 14) {
      return "отзывов";
    }

    const lastDigit = count % 10;

    if (lastDigit === 1) return "отзыв";
    if (lastDigit >= 2 && lastDigit <= 4) return "отзыва";
    return "отзывов";
};


  const storiesCardData = await getStrapiData('histories?populate=photo', item => ({
    photoUrl: item.photo?.url
    ? item.photo.url.startsWith('http')
      ? item.photo.url
      : `${url}${item.photo.url}`
    : null,

    title: item.title,
    date: item.date,
  }));

  const postsCardData = await getStrapiData('posts?populate=photo', item => ({
    photoUrl: item.photo?.url
    ? item.photo.url.startsWith('http')
      ? item.photo.url
      : `${url}${item.photo.url}`
    : null,
    
    title: item.title,
    date: item.date,
  }));

  const galleryData = await getStrapiData('galleries?populate=*', item => {
    const images = item.gallery || [];
    const getMediaUrl = (mediaUrl) => {
      if (!mediaUrl) return null;
      if (mediaUrl.startsWith("http")) return mediaUrl;
      return `${url}${mediaUrl}`;
    };

    return {
      photos: images.map(img => getMediaUrl(img.url)),
      thumbnails: images.map(img =>
        getMediaUrl(img.formats?.thumbnail?.url || img.url)
      ),
    };
  });

  const reviewsData = await getStrapiData('reviews', item => ({
    name: item.name,
    review: item.review,
    date: item.date,
  }));

  return {
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
            storiesCardData: storiesCardData,
            postsCardData: postsCardData,
            galleryData: galleryData,
            reviewsData: reviewsData,
            hero: hero,
            priceCardData: priceCardData,
            galleryCardData: galleryCardData,
            tab: tab,
            getEmployee: getEmployee,
            getReviewWord: getReviewWord,
            // sliderData: sliderData,
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
          { from: /^\/$/, to: '/index.html' },
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
  }
};
