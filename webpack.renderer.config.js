const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/renderer/index.css", to: "index.css" },
            ],
        }),
    ],
}