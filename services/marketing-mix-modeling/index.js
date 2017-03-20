'use strict';
const db = require('../../db/data-service');
const _ = require('lodash');

function *createHistoryCharts() {
  const params = {
    database: 'Marketing',
    table: 'sales'
  };

  const sales = yield db.scan(params);

  const salesByItem = [
    _.sumBy(_.filter(sales, {'item': 1}), 'quantity'),
    _.sumBy(_.filter(sales, {'item': 2}), 'quantity')
  ];

  const salesByChannel = [
    _.sumBy(_.filter(sales, {'channel': 1}), 'quantity'),
    _.sumBy(_.filter(sales, {'channel': 2}), 'quantity'),
    _.sumBy(_.filter(sales, {'channel': 3}), 'quantity')
  ];

  // I can really use _.map here but just lazy
  const salesByPromotion = [
    _.sumBy(_.filter(sales, {'promotion': 1}), 'quantity'),
    _.sumBy(_.filter(sales, {'promotion': 2}), 'quantity'),
    _.sumBy(_.filter(sales, {'promotion': 3}), 'quantity'),
    _.sumBy(_.filter(sales, {'promotion': 4}), 'quantity'),
    _.sumBy(_.filter(sales, {'promotion': 5}), 'quantity'),
  ];

  const historyCharts = {
    salesByItem,
    salesByChannel,
    salesByPromotion
  };

  return historyCharts;
}

function *createMarketingMixModel() {
  const salesParams = {
    database: 'Marketing',
    table: 'sales'
  };
  const sales = yield db.scan(salesParams);

  const promotionsParams = {
    database: 'Marketing',
    table: 'promotions'
  };
  const promotions = yield db.scan(promotionsParams);

  const salesPerPromotionByItem = [
    _.map(promotions, function(promotion){
      return 1.0 * _.sumBy(_.filter(sales, {'item': 1, 'promotion': promotion.id}), 'quantity') / promotion.spending;
    }),
    _.map(promotions, function(promotion){
      return 1.0 * _.sumBy(_.filter(sales, {'item': 2, 'promotion': promotion.id}), 'quantity') / promotion.spending;
    })
  ];

  const salesPerPromotionByChannel = [
    _.map(promotions, function(promotion){
      return 1.0 * _.sumBy(_.filter(sales, {'channel': 1, 'promotion': promotion.id}), 'quantity') / promotion.spending;
    }),
    _.map(promotions, function(promotion){
      return 1.0 * _.sumBy(_.filter(sales, {'channel': 2, 'promotion': promotion.id}), 'quantity') / promotion.spending;
    }),
    _.map(promotions, function(promotion){
      return 1.0 * _.sumBy(_.filter(sales, {'channel': 3, 'promotion': promotion.id}), 'quantity') / promotion.spending;
    })
  ];

  const salesPerPromotionByPromotion =
    _.map(promotions, function(promotion){
      return 1.0 * _.sumBy(_.filter(sales, {'promotion': promotion.id}), 'quantity') / promotion.spending;
    });

  const marketingMixModel = {
    salesPerPromotionByItem,
    salesPerPromotionByChannel,
    salesPerPromotionByPromotion
  };

  return marketingMixModel;
}

module.exports = {
  createHistoryCharts,
  createMarketingMixModel
};
