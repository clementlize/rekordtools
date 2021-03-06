module.exports = [
    {
        test: /\.node$/,
        use: 'node-loader',
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
        resolve: {
            fullySpecified: false,
        }
    },
    {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
        }
    },
    {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        },
    },
    {
        test: /\.(sass|less|css)$/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
        ]
    },
]