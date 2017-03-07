'use strict';
const router = require('koa-router')();
const db = require('../../db/data-service');

router.get('', function*() {
  this.redirect('/client');
});

router.get('/client', function*() {
  yield this.render('./client/index', {});
});

router.get('/client/product-bike', function*() {
  yield this.render('./client/product-bike', {});
});

router.get('/client/products', function*() {
  yield this.render('./client/products', {});
});

router.get('/client/contact', function*() {
  yield this.render('./client/contact', {});
});

router.get('/client/search', function*() {
  yield this.render('./client/search', {});
});

router.get('/client/checkout', function*() {
  yield this.render('./client/checkout', {});
});

router.get('/client/payment', function*() {
  yield this.render('./client/payment', {});
});

module.exports = router;
