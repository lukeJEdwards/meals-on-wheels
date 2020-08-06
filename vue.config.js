module.exports = {
  chainWebpack: config => {
    const path = require('path');
    config.resolve.alias.set('styles', path.resolve(__dirname, 'src/scss'));
  }
};
