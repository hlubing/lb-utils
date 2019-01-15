module.exports = {
  // devServer: {
  //   host: 'localhost',
  //   hot: true,
  //   proxy: {
  //     '/api': {
  //       target: 'https://diandian-test2.zhongan.com/apiAction.do',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     },
  //     '/mallapi': {
  //       target: 'https://ddm.zhongan.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/mallapi': ''
  //       }
  //     }
  //   },
  //   before: app => {
  //     console.log(app)
  //   }
  // },
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
      mode: 'production'
    }
  }
}