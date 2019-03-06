const path = require('path');

const address='D:\\ProgramData\\WebRoot\\LTZB';

export default {
  entry: './src/index.js',
  extraBabelPlugins: [
    // 'transform-decorators-legacy',
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      proxy: {
        '/unity': {
          target: 'http://192.168.2.84',
          changeOrigin: true,
        },
      },
    },
    production:{
    }
  },
  publicPath: '/',
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    Public:path.resolve(__dirname, 'public'),
  },
  ignoreMomentLocale: true,
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  outputPath:address,
  hash: true,
};