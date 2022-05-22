
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', {
                    loader: 'style-resources-loader'
                }
                ]
            }
        ]
    },
    entry: ['classlist-polyfill',"babel-polyfill", "./src/main.js"],
}