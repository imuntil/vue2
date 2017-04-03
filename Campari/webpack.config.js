/**
 * Created by 斌 on 2017/3/9.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
    entry:{
        main:'./src/main.js',
        // vendor:['jquery', 'other-lib']
    },
    output: {
        path:path.resolve(__dirname, './dist'),
        // publicPath:'/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:path.posix.join('static', 'img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
                }
            }

        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ],
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.esm.js',
            'jquery':'jquery/dist/jquery'
        }
    },
    devServer: {
        historyApiFallback:true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '@source-map';
    module.exports.plugins = (module.exports.plugins || [])
        .concat([
            new webpack.DefinePlugin({
                'process.env':{
                    NODE_EVN:'"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap:true,
                compress:{
                    warnings:false
                }
            }),
            new ExtractTextPlugin({
                filename:'css/[name].css',
                allChunks:true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name:'common',
                minChunks: function (module) {
                    // 该配置假定你引入的 vendor 存在于 node_modules || modules 目录中
                    return module.context && module.context.indexOf('modules') !== -1;
                }
                // minChunks:Infinity
            }),
            // new ManifestPlugin({
            //     filename:'manifest.json',
            //     publicPath:'/dist/'
            // }),
            new ChunkManifestPlugin({
                filename:'manifest.json',
                manifestVariable:'webpackManifest',
            })
            // new AssetsPlugin({
            //     includeManifest:'manifest'
            // })
        ])
    module.exports.module.rules = (module.exports.module.rules || [])
        .concat([
            {
                test: /\.vue$/,
                loader:'vue-loader',
                options: {
                    // loaders:{
                    //     scss: 'vue-style-loader!css-loader!sass-loader'
                    // }
                    loaders: {
                        css:ExtractTextPlugin.extract({
                            use: ['css-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: ['css-loader', 'sass-loader'],
                            fallback: 'vue-style-loader'
                        })
                        //....scss less sass more
                    },
                }
            }
        ])
} else {
    module.exports.module.rules = (module.exports.module.rules || [])
        .concat([
            {
                test: /\.vue$/,
                loader:'vue-loader',
                options: {
                    loaders:{
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            }
        ])
}