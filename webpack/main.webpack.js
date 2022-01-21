const nodeExternals = require('webpack-node-externals');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: './electron/main.ts',
    module: {
        rules: [
            ...require('./rules.webpack'),

            {
                test: /\.(m?js|node)$/,
                parser: { amd: true },
                use: {
                    loader: '@vercel/webpack-asset-relocator-loader',
                    options: {
                        outputAssetBase: 'native_modules',
                        emitDirnameAll: true,
                    },
                }
            },
        ],
    },
    externals: [nodeExternals()],
}