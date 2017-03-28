'use strict';
const db = require('../../db/data-service');
const _ = require('lodash');
const superagent = require('superagent-promise')(require('superagent'), Promise);

function recordPayment(params) {
  // contact AIS team to create a payment transaction

  // this is Group 1
  return superagent
    .post('52.168.10.209:1337/transaction')
    .send({
      subledgerId: 6, // for sales revenue
    	amount: params.price_total, // this should really be passed in
    	date: (new Date).toISOString(),
    	description: `Sale of ${params.quantity} unit of '${params.product_name}' to user_${params.user_id}:${params.user_name}`
    })
    .set('Content-Type', 'application/json')
    .catch((err) => {
      throw new Error('Failed to record payment with AIS: ' + err);
    });

  // group 2 is pending

  // return Promise.resolve('successfully recorded the payment');
}

function scheduleDelivery(params) {
  // contact SCM team to schedule a delivery
  // console.log({
  //   order_id: params.orderId,
  //   shipping_address: params.ship_addr,
  //   model: params.product_name,
  //   quantity: params.quantity
  // });
  return Promise.resolve('successfully scheduled a delivery'); //@TODO:this needs to be a POST request to SCM team
  // return Promise.reject(new Error('SCM goes boom!'));
}

function saveOrder(params) {
  // save the order data to our own database
  const salesObject = {
    date: parseInt(Date.now() / 1000, 10),
    item: params.product_id,
    quantity: params.quantity,
    discount: 0,
    location: 'N/A',
    channel: 1, // retail
    promotion: 4 // personal selling
  };

  return db
    .putItem({
      database: 'Marketing',
      table: 'sales',
      item: salesObject
    })
    .then(() => {
      return db.putItem({
        database: 'Orders',
        table: 'table1',
        item: params
      });
    })
    .catch((err) => {
      throw new Error('Failed to save order to DB: ' + err); // this is impossible
    });
}

function newOrder(params) {
  return saveOrder(params)
    .then((orderItem) => {
      params.orderId = orderItem.id;
      return recordPayment(params)
        .then(() => {
          return scheduleDelivery(params);
        });
    });
}

module.exports = {
  newOrder
};
