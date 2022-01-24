module.exports = [
  {
      // We're specifying native_modules in the test because the asset relocator loader generates a
      // "fake" .node file which is really a cjs file.
      test: /native_modules\/.+\.node$/,
      use: 'node-loader',
  },
  {
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
      }
  },
  {
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
          name: '[path][name].[ext]',
      },
  },
  {
      test: /\.(sass|less|css)$/,
      use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
      ]
  },
]