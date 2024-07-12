const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  mode: 'development',
  stats: 'errors-warnings',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {                                                                  
    // Stubs out `import ... from 'three'`
    // so it returns `import ... from window.THREE` 
    // effectively using THREE global variable that is defined by AFRAME.
    // This is useful to integrate other Three dependencies
    three: "THREE",                                                             
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'www')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new DotenvWebpackPlugin()
],
}
