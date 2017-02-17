'use strict';

const db = require('./db/data-service');

// an example of getting a mock data item and logging it.
const params = {
  database: 'Analytics',
  table: 'table1',
  id: 2
};

db.getItem(params).then(function(item) {
  console.log(item);
});
