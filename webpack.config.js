const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
    name: 'app',
    entry: {
        client: path.resolve(__dirname, 'src/index.tsx'),
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname + '/server/dist/static'),
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json',
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin()],
}