'use strict';
const router = require('koa-router')();
const db = require('../db/data-service');
const _ = require('lodash');
const body = require('koa-body')();

router.get('/api/list', function*() {
  const response = yield db.listDatabases();
  this.body = response;
});

router.get('/api/list/:database', function*() {
  const response = yield db.listTables(this.params);
  this.body = response;
});

router.get('/api/list/:database/:table', function*() {
  const response = yield db.scan(this.params);
  this.body = response;
});

router.get('/api/get/:database/:table/:id', function*() {
  this.params.id = parseInt(this.params.id, 10);
  const response = yield db.getItem(this.params);
  this.body = response;
});

router.put('/api/put/:database/:table/:id', body, function*() {
  this.params.id = parseInt(this.params.id, 10);
  const params = _.assign({item: this.request.body}, this.params);
  const response = yield db.putItem(params);
  this.body = response;
});

module.exports = router;
