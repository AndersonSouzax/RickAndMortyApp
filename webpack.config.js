const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./app/components/App.js",
    output:{
       path: path.resolve(__dirname, 'public'),
       filename: 'bundle.js'
    },
    module:{

        rules: [
            {
                test: /\.js$/,
                exclude:[/node_modules/],
                loader : 'babel-loader', 
                query: { presets: ['react','env'] }
        
            },
            { test: /\.css$/, use: 'css-loader' }
        ]
    }
}