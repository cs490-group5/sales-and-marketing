'use strict';

// For now db is mocked
// const db = new AWS.DynamoDB();
const db = require('./mock-data-service');

function getItem(params) {
  return new Promise(function(resolve, reject) {
    db.getItem(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports = {
  getItem
};
