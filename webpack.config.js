const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'entry-background': './src/background/index.ts',
    'entry-options': './src/options/index.ts',
    'entry-popup': './src/popup/index.ts',
    'entry-timetable': './src/timetable/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './public/**/*',
          transformPath (targetPath) {
            return targetPath.replace('public' + path.sep, '');
          }
        }
      ]
    }),
    new CleanWebpackPlugin({ 
      cleanOnceBeforeBuildPatterns: 'dist' 
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.ts']
  }
}