'use strict';
const router = require('koa-router')();
const db = require('../../db/data-service');
const mmm = require('../../services/marketing-mix-modeling');

router.get('/marketing', function*() {
  yield this.render('./marketing/index', {});
});

router.get('/marketing/marketing-mix-modeling', function*() {
  const historyCharts = yield mmm.createHistoryCharts();
  const model = yield mmm.createMarketingMixModel();

  const params = {
    database: 'Marketing',
    table: 'promotions'
  };

  const promotions = yield db.scan(params);
  yield this.render('./marketing/marketing-mix-modeling', {historyCharts: historyCharts, model: model, promotions: promotions});
});


router.get('/marketing/marketing-automation', function*() {
  yield this.render('./marketing/marketing-automation', {});
});

router.get('/marketing/web-analytics', function*() {
  yield this.render('./marketing/web-analytics', {});
});

module.exports = router;
