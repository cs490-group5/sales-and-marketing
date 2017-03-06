'use strict';
const router = require('koa-router')();
const db = require('../../db/data-service');

router.get('/web-analytics', function*() {
  // an example of getting a mock data item and logging it.
  const params = {
    database: 'Marketing',
    table: 'sales'
  };

  const response = yield db.scan(params);
  yield this.render('./web-analytics/index', {params: params, response: response});
});

module.exports = router;
