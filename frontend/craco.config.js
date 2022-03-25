var webpack = require('webpack');
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/components/"),
      '@store': path.resolve(__dirname, "src/store/"),
      '@reducers': path.resolve(__dirname, "src/store/reducers/"),
      '@actions': path.resolve(__dirname, "src/store/actions/"),
    },
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: {env: {}}
        })
      ]
    }
  }
}