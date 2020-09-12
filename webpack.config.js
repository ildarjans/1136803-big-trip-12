const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    path: path.join(__dirname, `./public/js/`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
    compress: true,
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`]
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};

