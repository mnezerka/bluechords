import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import poststylus from 'poststylus';

const context = path.resolve(__dirname, '../src');

export default {
    context,
    entry: {
        app: [
            './app.js',
            './styles/base.styl'
        ],
        libs: ['react', 'classnames', 'redux']
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'libs', filename: 'libs.js'}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [
                        poststylus(['autoprefixer'])
                    ]
                }
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.styl'],
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        alias: {
            'react': path.join(__dirname, '..', 'node_modules', 'react'),
            'react-dom': path.join(__dirname, '..', 'node_modules', 'react-dom')
        }
    },
    bail: true, //enable errors to fail build
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('css-loader!stylus-loader?paths=src/')
            }
        ]
    },
};
