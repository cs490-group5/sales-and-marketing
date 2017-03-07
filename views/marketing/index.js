'use strict';
const router = require('koa-router')();
const db = require('../../db/data-service');
const mmm = require('../../services/marketing-mix-modeling');

router.get('/marketing', function*() {
  // an example of getting a mock data item and logging it.
  const params = {
    database: 'Marketing',
    table: 'sales'
  };

  const response = yield db.scan(params);
  yield this.render('./marketing/index', {params: params, response: response});
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
  // an example of getting a mock data item and logging it.
  const params = {
    database: 'Marketing',
    table: 'sales'
  };

  const response = yield db.scan(params);
  yield this.render('./marketing/marketing-automation', {params: params, response: response});
});

module.exports = router;
