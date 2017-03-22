'use strict';
const router = require('koa-router')();
const body = require('koa-body')();
const db = require('../../db/data-service');
const orderProcessing = require('../../services/order-processing');

router.get('/services', function*() {
  yield this.render('./services/index', {});
});

router.get('/services/sales-trend-forecasting', function*() {
  yield this.render('./services/sales-trend-forecasting', {});
});

router.get('/services/sales-force-automation', function*() {
  yield this.render('./services/sales-force-automation', {});
});

router.put('/services/sales-force-automation/order', body, function*() {
  return orderProcessing.newOrder(this.request.body)
    .then((res) => {
      console.log('succeeded', res);
      this.status = 200;
      this.body = 'order successfully processed';
    })
    .catch((err) => {
      console.log('failed', err);
      this.status = 500
      this.throw(err);
    });
});

module.exports = router;
