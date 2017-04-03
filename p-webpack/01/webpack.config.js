/**
 * Created by 斌 on 2017/3/5.
 */
var webpack = require('webpack');
module.exports = {
    entry:'./entry.js',
    output: {
        path: __dirname,
        filename:'bundle.js'
    },
    module: {
        loaders: [
            {test:'/\.css$/', loader:'style-loader!css-loader'}
        ]
    }
};