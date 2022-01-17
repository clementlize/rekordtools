module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  module: {
    rules: require('./rules.webpack'),
  },
}