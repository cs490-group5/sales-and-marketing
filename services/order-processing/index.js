'use strict';
const db = require('../../db/data-service');
const _ = require('lodash');
const superagent = require('superagent-promise')(require('superagent'), Promise);

function getUser(params) {
  return superagent
    .get(`138.197.159.113/api/customers/${params.user_id}`);
}

function recordPayment(params) {
  // contact AIS team to create a payment transaction

  // Team 1
  const teamOneRequest = superagent
    .post('52.168.10.209:1337/transaction')
    .send({
      subledgerId: 6, // for sales revenue
    	amount: params.price_total, // this should really be passed in
    	date: (new Date).toISOString(),
    	description: `Sale of ${params.quantity} unit of '${params.product_name}' to user_${params.user_id}:${params.user_name}`
    })
    .set('Content-Type', 'application/json')
    .catch((err) => {
      throw new Error('Failed to record payment with AIS team 1: ' + err);
    });

  // Team 2
  const teamTwoRequest = superagent
    .post('138.197.148.171:8000/sales')
    .send(params)
    .set('Content-Type', 'application/json')
    .catch((err) => {
      throw new Error('Failed to record payment with AIS team 2: ' + err);
    });

  return Promise.all([teamOneRequest, teamTwoRequest]);

  // return Promise.resolve('successfully recorded the payment');
}

function scheduleDelivery(params) {
  // contact SCM team to schedule a delivery
  return superagent
    .post('https://cs490group8scm.herokuapp.com/orders?client=MCLHHQOZSXORFR532T004GKOJWZKG1OOMP1WZ4EQ3JMBW')
    .send(params)
    .set('Authorization', 'aa9e6548c60a89d893d4992fb6232e8714d50b8787f1ecc2cf1095dbccfb')
    .set('Content-Type', 'application/json')
    .catch((err) => {
      throw new Error('Failed to schedule delivery with SCM team 8: ' + err);
    });

  // return Promise.resolve('successfully scheduled a delivery'); //@TODO:this needs to be a POST request to SCM team
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
  return getUser(params)
    .then((res) => {
      const user = res.body;
      params.user_name = `${user.firstname} ${user.lastname}`;
      return recordPayment(params)
        .then(() => {
          params.payment_status = true;
          return saveOrder(params)
            .then((orderItem) => {
              params.order_id = orderItem.id;
              return scheduleDelivery(params);
            });
        });
    });
}

module.exports = {
  newOrder
};
