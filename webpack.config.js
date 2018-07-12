var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry :{
        'index': './empolder/js/index.js',
    },
    output: {
        path: path.join(__dirname, "static/js"),
        filename: '[name].js'
    },
     debug : true,
     devtool : "source-map",
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    plugins: [

      new webpack.BannerPlugin('This file is created by FED.chemayi'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
/*
        new HtmlWebpackPlugin()
*/
    ]
};