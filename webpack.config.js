const path = require('path');

module.exports = {
  target: 'web',
  entry: "./src/wtc-barfystars.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'es5-bundle.js',
    library: 'WTCBarfyStars'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [["env", {
            "targets": {
              "browsers": ["last 2 versions", "ie >= 11"]
            }
          }]]
        }
      }
    ]
  }
}