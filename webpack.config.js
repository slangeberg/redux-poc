var webpack = require('webpack');

module.exports = {
    // https://webpack.github.io/docs/configuration.html#devtool
    devtool: '#eval',            // >> works good in FF, but is generated code in both
         //'#inline-source-map', //>> great in chrome, meh/bundled file in FF
        // '#cheap-module-eval-source-map', //'#eval-source-map', //
        //'#cheap-eval-source-map', >> no good

    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: 'react-hot!babel'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};