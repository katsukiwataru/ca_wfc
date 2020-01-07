const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const copyRules = [
  {
    from: path.resolve(__dirname, 'src/index.html'),
    to: path.resolve(__dirname, 'dist/index.html'),
  },
  {
    from: path.resolve(__dirname, 'src/assets'),
    to: dist,
  },
];

module.exports = {
  entry: src + '/index.tsx',
  output: {
    path: dist,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devServer: {
    open: true,
    openPage: '',
    contentBase: dist,
    watchContentBase: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new CopyWebpackPlugin(copyRules)],
};
