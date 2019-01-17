module.exports = {
  baseUrl: '/lb-utils/',
  configureWebpack: () => {
    return {
      entry: './lib/index.js',
      output: {
        filename: 'dist/js/lb-utils.min.js',
        library: 'lbUtils',
        libraryTarget: 'umd',
        umdNamedDefine: true
      },
      mode: 'production',
      performance: {
        hints:false
      }
    }
  }
}