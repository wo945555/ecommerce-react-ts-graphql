const { override, fixBabelImports, addWebpackAlias, adjustStyleLoaders } = require('customize-cra');
const path = require( 'path' )
function resolve ( dir ) {
    return path.join( __dirname, dir)
}

module.exports = override(
  addWebpackAlias({
    '@': resolve('src')
  }),
  fixBabelImports('import', {
    librayName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  adjustStyleLoaders(rule => {
    if(rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [
            path.resolve(__dirname, './src/assets/styles/globle.scss')
          ]
        }
      });
    }
  })
)