import webpack from 'webpack';
import path from 'path';
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
    devtool: '#eval-source-map',
    plugins: [
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
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        alias: {
            'react': path.join(__dirname, '..', 'node_modules', 'react'),
            'react-dom': path.join(__dirname, '..', 'node_modules', 'react-dom')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: ['transform-decorators-legacy']
                    }
                }
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader?paths=src']
            }
        ]
    },
};

