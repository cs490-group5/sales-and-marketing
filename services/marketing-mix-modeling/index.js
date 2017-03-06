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
    _.filter(sales, {'item': 1}).length,
    _.filter(sales, {'item': 2}).length
  ];

  const salesByChannel = [
    _.filter(sales, {'channel': 1}).length,
    _.filter(sales, {'channel': 2}).length,
    _.filter(sales, {'channel': 3}).length
  ];

  // I can really use _.map here but just lazy
  const salesByPromotion = [
    _.filter(sales, {'promotion': 1}).length,
    _.filter(sales, {'promotion': 2}).length,
    _.filter(sales, {'promotion': 3}).length,
    _.filter(sales, {'promotion': 4}).length,
    _.filter(sales, {'promotion': 5}).length
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
      return 1.0 * _.filter(sales, {'item': 1, 'promotion': promotion.id}).length / promotion.spending;
    }),
    _.map(promotions, function(promotion){
      return 1.0 * _.filter(sales, {'item': 2, 'promotion': promotion.id}).length / promotion.spending;
    })
  ];

  const salesPerPromotionByChannel = [
    _.map(promotions, function(promotion){
      return 1.0 * _.filter(sales, {'channel': 1, 'promotion': promotion.id}).length / promotion.spending;
    }),
    _.map(promotions, function(promotion){
      return 1.0 * _.filter(sales, {'channel': 2, 'promotion': promotion.id}).length / promotion.spending;
    }),
    _.map(promotions, function(promotion){
      return 1.0 * _.filter(sales, {'channel': 3, 'promotion': promotion.id}).length / promotion.spending;
    })
  ];

  const salesPerPromotionByPromotion =
    _.map(promotions, function(promotion){
      return 1.0 * _.filter(sales, {'promotion': promotion.id}).length / promotion.spending;
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
