'use strict';
const router = require('koa-router')();
const db = require('../db/data-service');
const _ = require('lodash');
const body = require('koa-body')();
const rp = require('request-promise');

const secretKey = 'm1chael';

function auth(parent) {
  if (!parent.request.query || (parent.request.query.key !== secretKey)) {
    parent.body = 'Error: incorrect secret key';
    parent.status = 401;
    return false;
  } else {
    return true;
  }
}

router.get('/api/list', function*() {
  if (!auth(this)) return;
  const response = yield db.listDatabases();
  this.body = response;
});

router.get('/api/list/:database', function*() {
  if (!auth(this)) return;
  const response = yield db.listTables(this.params);
  this.body = response;
});

router.get('/api/list/:database/:table', function*() {
  if (!auth(this)) return;
  this.params.query = _.assign({}, this.request.query); //copy instead of pointer
  delete this.params.query.key; //remove secret key from query
  const response = yield db.scan(this.params);
  this.body = response;
});

router.get('/api/get/:database/:table/:id', function*() {
  if (!auth(this)) return;
  this.params.id = parseInt(this.params.id, 10);
  const response = yield db.getItem(this.params);
  this.body = response;
});

router.put('/api/put/:database/:table', body, function*() {
  if (!auth(this)) return;
  const params = _.assign({item: this.request.body}, this.params);
  const response = yield db.putItem(params);
  this.body = response;
});

router.put('/api/put/:database/:table/:id', body, function*() {
  if (!auth(this)) return;
  const item = _.assign({id: parseInt(this.params.id, 10)}, this.request.body);
  const params = _.assign({item: item}, this.params);
  const response = yield db.putItem(params);
  this.body = response;
});

router.get('/api/external/hrm/salespeople', body, function*() {
  const data = yield rp.get("https://mvvkvhcd92.execute-api.us-west-2.amazonaws.com/prod/GetSalesEmployees");
  this.body = data;
});

router.get('/api/external/crm/customers', body, function*() {
  const data = yield rp.get("http://138.197.159.113/api/customers");
  this.body = data;
});


module.exports = router;
