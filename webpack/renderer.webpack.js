const nodeExternals = require('webpack-node-externals');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: require('./rules.webpack'),
    },
    externals: [nodeExternals()],
}