const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('css/[name]-bundle.css')

console.log('環境變數 NODE_ENV: ', process.env.NODE_ENV)
console.log('resolve(dirname): ', path.resolve(__dirname, 'src'))
console.log('resolve: ', path.resolve('src'))

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, './src'),
  entry: {
    index: 'index',
    about: 'about'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name]-bundle.js'
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/images'),
      path.resolve('src/scss'),
    ],
    extensions: [
      '.js'
    ]
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [ 'style-loader', 'css-loader' ]
      // },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      // },
      {
        test: /\.(scss|sass)$/,
        // use: extractCSS.extract([
        //   'css-loader',
        //   'postcss-loader',
        //   'sass-loader',
        // ])
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]?[hash:8]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
            }
          }
        ]
      },
    ]
  },
  plugins: [
    extractCSS
  ]
}