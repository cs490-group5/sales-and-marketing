'use strict';
const router = require('koa-router')();
const db = require('../../db/data-service');

router.get('/services', function*() {
  yield this.render('./services/index', {});
});

router.get('/services/sales-trend-forecasting', function*() {
  yield this.render('./services/sales-trend-forecasting', {});
});

router.get('/services/sales-force-automation', function*() {
  yield this.render('./services/sales-force-automation', {});
});

module.exports = router;
