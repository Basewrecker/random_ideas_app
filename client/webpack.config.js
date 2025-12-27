const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../public"), 
        filename: 'bundle.js',
    },
    devServer: {
      static: {
          directory: path.resolve(__dirname, "../public")
      },
      port: 3000,
//      https: false,
      open: true,
//      server: {
//          type: 'http'
//      },
      hot: true,
      compress: true,
      historyApiFallback: true,
      proxy: {
          '/api': 'https://localhost:4000',
      },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
};