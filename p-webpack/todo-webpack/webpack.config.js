/**
 * Created by 斌 on 2017/3/7.
 */
var path = require('path');
var webpack = require('webpack');
var ExtracTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:'./js/main.js',
    output:{
        path:path.join(__dirname, 'dist'),
        filename:'build.js'
    },
    module:{
        rules:[
            // {
            //     test:/\.scss$/,
            //     loader:'style-loader!css-loader!sass-loader'
            // },
            {
                test:/\.(png|jpg|gif|svg)$/,
                loader:'file-loader',
                options:{
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test:/\.css$/,
                use:ExtracTextPlugin.extract({
                    use:['css-loader']
                }),
                exclude:/node_modules/
            }
        ]
    },
    devServer:{
        historyApiFallback: true,
        noInfo: true
        // inline: true
    },
    plugins:[
        new ExtracTextPlugin('styles.css'),

    ],
    devtool:'#eval-source-map'
    // plugins:[
    //     new webpack.optimize.UglifyJsPlugin({
    //         sourceMap:true,
    //         compress: {
    //             warnings: false
    //         }
    //     }),
    //     new ExtracTextPlugin('styles.css')
    //     // new ExtracTextPlugin('[name].[hash].css')
    // ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
    ])
}