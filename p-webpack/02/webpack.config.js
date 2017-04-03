/**
 * Created by 斌 on 2017/3/5.
 */
module.exports = {
    devtool:'eval-source-map',
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/public',
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.json$/,
                loader:'json-loader'
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:"/node_modules/"
            },
            {
                test:/\.css$/,
                loader:"style-loader!css-loader?modules"
            }
        ]
    },
    devServer:{
        contentBase:'./public',
        colors:true,
        historyApiFallback:true,
        inline:true
    }
};