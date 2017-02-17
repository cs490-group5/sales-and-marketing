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

const mockMarketingData = {
  // to be added...
};

const mockOrdersData = {
  // to be added...
};

const mockSalesPeopleData = {
  // to be added...
};

const mockSupportTicketData = {
  // to be added...
};

const mockData = {
  Marketing: mockMarketingData,
  Orders: mockOrdersData,
  Sales: mockSalesPeopleData,
  Support: mockSupportTicketData,
  Analytics: mockWebAnalyticsData
};

function getItem(params, callback) {
  if (!params.database || !(params.database in mockData)) {
    callback('database does not exist');
  } else if (!params.table || !(params.table in mockData[params.database])) {
    callback('table does not exist');
  } else if (!params.id || !(_.findIndex(mockData[params.database][params.table], {'id': params.id}))) {
    callback('id does not exist');
  } else {
    const table = mockData[params.database][params.table];
    const key = _.findIndex(table, {'id': params.id});
    callback(null, table[key]);
  }
}

module.exports = {
  getItem
}
