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
        libs: ['webpack/hot/dev-server', 'react', 'classnames', 'redux']
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js'
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin() 
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve(__dirname, '../src')],
        alias: {
            'react': path.join(__dirname, '..', 'node_modules', 'react'),
            'react-dom': path.join(__dirname, '..', 'node_modules', 'react-dom')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader?cacheDirectory']
            },
            {
                test: /\.styl$/,                                                                                                                                                                      
                loader: 'style-loader!css-loader!stylus-loader?paths=src'                                                                                                         
            }
        ]
    },
    stylus: {
        use: [
            poststylus(['autoprefixer'])
        ]
    }

};

