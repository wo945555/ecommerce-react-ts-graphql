const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    librayName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
)