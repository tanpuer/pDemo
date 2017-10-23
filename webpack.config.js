/**
 * Created by cw on 2017/6/21.
 */

var path = require('path');
var SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        'index':'./src/index.js',
        'webview': './preact/webview/webview.js'
    },
    output: {
        filename: '[name]/bundle.js',
        path: __dirname + '/webpack'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            // loader: 'babel-loader?presets[]=es2015&presets[]=react'
            use:'babel-loader'
        }]
    },

};