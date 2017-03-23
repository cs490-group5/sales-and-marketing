'use strict';
const db = require('../../db/data-service');
const _ = require('lodash');
const superagent = require('superagent-promise')(require('superagent'), Promise);

function recordPayment() {
  // contact AIS team to create a payment transaction

  // this is Group 1
  return superagent
    .post('52.168.10.209:1337/transaction')
    .send({
      subledgerId: 6, // for sales revenue
    	amount: 550, // this should really be passed in
    	date: (new Date).toISOString(),
    	description: "testing sales team integration"
    })
    .set('Content-Type', 'application/json')
    .catch((err) => {
      throw new Error('Failed to record payment with AIS: ' + err);
    });

  // group 2 is pending

  // return Promise.resolve('successfully recorded the payment');
}

function scheduleDelivery() {
  // contact SCM team to schedule a delivery
  return Promise.resolve('successfully scheduled a delivery'); //@TODO:this needs to be a POST request to SCM team
  // return Promise.reject(new Error('SCM goes boom!'));
}

function saveOrder(params) {
  // save the order data to our own database
  const orderObject = _.pick(params, ['user_id', 'product_id', 'salesperson_id', 'quantity']);
  return db
    .putItem({
      database: 'Orders',
      table: 'table1',
      item: orderObject
    })
    .then(() => {
      const salesObject = {
        date: parseInt(Date.now() / 1000, 10),
        item: params.product_id,
        quantity: params.quantity,
        discount: 0,
        location: 'N/A',
        channel: 1, // retail
        promotion: 4 // personal selling
      };
      return db.putItem({
        database: 'Marketing',
        table: 'sales',
        item: salesObject
      });
    })
    .catch((err) => {
      throw new Error('Failed to save order to DB: ' + err); // this is impossible
    });
}

function newOrder(params) {
  return recordPayment()
    .then(() => {
      return scheduleDelivery()
        .then(() => {
          return saveOrder(params);
        });
    });
}

module.exports = {
  newOrder
};
