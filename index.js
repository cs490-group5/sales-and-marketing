'use strict';
const koa = require('koa');
const views = require('koa-views');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');
const config = require('./config');

const app = new koa();

app.use(views('./views', {
  map: {
    html: 'ejs'
  }
}));

// add all the available portals here
// e.g. require('./views/client')
// and then add routes (GET, POST, etc.) to your portal
// see 'views/marketing/index.js' router.get()
const routers = [
  require('./views/marketing'),
  require('./views/services'),
  require('./views/sales-trend-forecasting'),
  require('./views/sales-force-automation')
];

routers.forEach((router) =>
  app.use(router.routes())
    .use(router.allowedMethods())
);

app.use(mount('/assets', serve(path.resolve(__dirname, 'assets'))));

app.listen(config.port);
console.log('Listening on port', config.port);
