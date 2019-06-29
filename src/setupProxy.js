const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/edds', { target: 'http://localhost:9090/' }));
};