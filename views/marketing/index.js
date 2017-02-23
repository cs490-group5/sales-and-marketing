'use strict';
const router = require('koa-router')();
const db = require('../../db/data-service');

router.get('/marketing', function*() {
  // an example of getting a mock data item and logging it.
  const params = {
    database: 'Analytics',
    table: 'table1',
    id: 2
  };


  const item = yield db.getItem(params);
  console.log(item);
  yield this.render('./marketing/index', {params: params, item: item});
});

module.exports = router;
