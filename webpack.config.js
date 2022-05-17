module.exports = {
    entry: './components/app.jsx',
    output: {
      path: __dirname + '/public/js',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,      
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      }]
    }
  }