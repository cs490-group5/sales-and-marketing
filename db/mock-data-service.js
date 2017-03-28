'use strict';
const _ = require('lodash');
const assert = require('assert');

// edit the tables and columns as needed
const mockWebAnalyticsData = {
  table1: [
    {
      id: 1,
      column2: 999,
      column3: 888
    },
    {
      id: 2,
      column2: 777,
      column3: 666
    }
  ],
  table2: [
    {
      id: 1,
      column2: 111,
      column3: 222
    },
    {
      id: 2,
      column2: 333,
      column3: 444
    }
  ]
};

const mockMarketingData = require('./mock-marketing-data');

const mockOrdersData = {
  table1:[
    {
      id: 1,
      user_id: 1,
      user_name: "Billy Bob",
      product_id: 1,
      product_name: "Enduro 250",
      ship_addr: "Dummy Address",
      salesperson_id: 1,
      quantity: 10,
      price_total: 5499.90,
      date: "1490659974792",
      delivery_status: 0,
      payment_status: true
    },
    {
      id: 2,
      user_id: 3,
      user_name: "Billy Bob",
      product_id: 2,
      product_name: "Moto 450",
      ship_addr: "Dummy Address",
      salesperson_id: 1,
      quantity: 10,
      price_total: 10000.00,
      delivery_status: 0,
      payment_status: true
    }
  ]
};

const mockLeadsData = {
  table1:[
    {
      id: 1,
      name: "Rutherford W",
      phone_number: "(415) 582-7417",
      description: "Wants to buy tons of bikes."
    },
  ]
};

const mockSalesPeopleData = [
  {
    id: 1,
    name: "Jonah Glover",
    skill: "Closing"
  },  {
    id: 2,
    name: "Foo Bar",
    skill: "Help Desk"
  },  {
    id: 3,
    name: "Malpa Hetel",
    skill: "First Contact"
  },
];

const mockSupportTicketData = {
  table1:[
    {
      id: 1,
      user_id: 1,
      description: "The pedals won't work properly. Need a replacement",
      salesperson_id: 1
    }, {
      id: 2,
      user_id: 2,
      description: "Can't figure out how to order through the website.",
      salesperson_id: 1
    },
    {
      id: 3,
      user_id: 3,
      description: "Chain fell off. How can I put it back on?",
      salesperson_id: 1
    }
  ]
};

const mockData = {
  Marketing: mockMarketingData,
  Orders: mockOrdersData,
  Sales: mockSalesPeopleData,
  Support: mockSupportTicketData,
  Analytics: mockWebAnalyticsData,
  Leads: mockLeadsData
};

function listDatabases(callback) {
  const databasesNames = Object.keys(mockData);
  callback(null, databasesNames);
}

function listTables(params, callback) {
  if (!params.database || !(params.database in mockData)) {
    callback(new Error('database does not exist'));
  } else {
    const tablesNames = Object.keys(mockData[params.database]);
    callback(null, tablesNames);
  }
}

function getItem(params, callback) {
  if (!params.database || !(params.database in mockData)) {
    callback(new Error('database does not exist'));
  } else if (!params.table || !(params.table in mockData[params.database])) {
    callback(new Error('table does not exist'));
  } else if (!params.id || (_.findIndex(mockData[params.database][params.table], {'id': params.id}) === -1)) {
    callback(new Error('id does not exist'));
  } else {
    const table = mockData[params.database][params.table];
    const key = _.findIndex(table, {'id': params.id});
    callback(null, table[key]);
  }
}

function scan(params, callback) {
  if (!params.database || !(params.database in mockData)) {
    callback(new Error('database does not exist'));
  } else if (!params.table || !(params.table in mockData[params.database])) {
    callback(new Error('table does not exist'));
  } else {
    // LastEvaluatedKey and pagination could be added later
    const table = mockData[params.database][params.table];
    if (params.query) {
      const filteredTable = _.filter(table, function match(object) {
        return _.isMatchWith(object, params.query, function valueEqual(objectValue, queryValue) {
          return objectValue == queryValue; // doing value equal to also return '1' == 1
        });
      });
      callback(null, filteredTable);
    } else {
      callback(null, table);
    }
  }
}

function putItem(params, callback) {
  if (!params.database || !(params.database in mockData)) {
    callback(new Error('database does not exist'));
  } else if (!params.table || !(params.table in mockData[params.database])) {
    callback(new Error('table does not exist'));
  } else if (!params.item) {
    callback(new Error('input item is null'));
  } else {
    const table = mockData[params.database][params.table];
    if (params.item.id) {
      const key = _.findIndex(table, {'id': params.item.id});
      if (key !== -1) {
        table[key] = params.item;
      } else {
        table.push(params.item);
      }
      callback(null, params.item);
    } else {
      const lastId = _.maxBy(table, 'id').id;
      const newItem = _.assign({id: lastId + 1}, params.item);
      table.push(newItem);
      callback(null, newItem);
    }
  }
}

module.exports = {
  listDatabases,
  listTables,
  getItem,
  scan,
  putItem
}
