const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    module : {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/renderer/index.css", to: "index.css" },
            ],
        }),
        new VueLoaderPlugin(),
    ],
}