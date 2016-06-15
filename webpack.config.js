var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.html/,
            loaders: ['html']
        }, {
            test: /\.svg/,
            loader: 'svg-url-loader'
        }]
    },
    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin({
    //        compress: {
    //            warnings: false
    //        }
    //    })
    //]

}
