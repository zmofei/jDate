const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'jDate.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [
                'babel-loader',
            ],
            query: {
                presets: ['es2015']
            }
        }]
    }
};
