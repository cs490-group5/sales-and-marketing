'use strict';

// For now db is mocked
// const db = new AWS.DynamoDB();
const db = require('./mock-data-service');

//  @params: Object {
//    database: String
//  }
function listTables(params) {
  return new Promise(function(resolve, reject) {
    db.listTables(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

//  @params: Object {
//    database: String
//    table: String
//    id: int
//  }
function getItem(params) {
  return new Promise(function(resolve, reject) {
    db.getItem(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

//  @params: Object {
//    database: String
//    table: String
//  }
function scan(params) {
  return new Promise(function(resolve, reject) {
    db.scan(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

//  @params: Object {
//    database: String
//    table: String
//    item: Object {
//      id: int (auto-incremented if null)
//      ... other attributes ...
//    }
//  }
function putItem(params) {
  return new Promise(function(resolve, reject) {
    db.putItem(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports = {
  listTables,
  getItem,
  scan,
  putItem
};
