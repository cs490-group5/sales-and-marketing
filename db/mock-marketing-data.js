'use strict';
module.exports = {
  items: [
    {
      id: 1,
      type: 'Enduro 250',
      price: 3250
    },
    {
      id: 2,
      type: 'Enduro 550',
      price: 7600
    },
    {
      id: 3,
      type: 'Moto 300',
      price: 4295
    },
    {
      id: 4,
      type: 'Moto 450',
      price: 8995
    }
  ],
  channels: [
    {
      id: 1,
      type: 'retail'
    },
    {
      id: 2,
      type: 'authorized dealer'
    },
    {
      id: 3,
      type: 'independent dealer'
    }
  ],
  promotions: [
    {
      id: 1,
      type: 'TV ads',
      spending: 50000
    },
    {
      id: 2,
      type: 'radio',
      spending: 10000
    },
    {
      id: 3,
      type: 'web ads',
      spending: 25000
    },
    {
      id: 4,
      type: 'personal selling',
      spending: 5000
    },
    {
      id: 5,
      type: 'social media',
      spending: 15000
    }
  ],
  sales: [
    {
      id: 1,
      date: 1488238476, // unix timestamp 2017-02-27T23:34:36+00:00
      item: 1,
      quantity: 1,
      discount: 0,
      location: 'CA',
      channel: 1,
      promotion: 3
    },
    {
      id: 2,
      date: 1488307689,
      item: 2,
      quantity: 1,
      discount: 100,
      location: 'TX',
      channel: 2,
      promotion: 1
    },
    {
      id: 3,
      date: 1488307706,
      item: 2,
      quantity: 1,
      discount: 200,
      location: 'TX',
      channel: 2,
      promotion: 5
    },
    {
      id: 4,
      date: 1488307707,
      item: 1,
      quantity: 1,
      discount: 0,
      location: 'CA',
      channel: 1,
      promotion: 3
    },
    {
      id: 5,
      date: 1488307708,
      item: 1,
      quantity: 1,
      discount: 300,
      location: 'TX',
      channel: 3,
      promotion: 2
    },
    {
      id: 6,
      date: 1488307709,
      item: 2,
      quantity: 1,
      discount: 0,
      location: 'CA',
      channel: 2,
      promotion: 4
    },
    {
      id: 7,
      date: 1488307710,
      item: 1,
      quantity: 1,
      discount: 0,
      location: 'CA',
      channel: 1,
      promotion: 3
    },
    {
      id: 8,
      date: 1488307711,
      item: 2,
      quantity: 1,
      discount: 500,
      location: 'TX',
      channel: 1,
      promotion: 3
    },
    {
      id: 9,
      date: 1488307712,
      item: 1,
      quantity: 1,
      discount: 100,
      location: 'TX',
      channel: 2,
      promotion: 2
    },
    {
      id: 10,
      date: 1488307713,
      item: 2,
      quantity: 1,
      discount: 250,
      location: 'TX',
      channel: 3,
      promotion: 1
    },
    {
      id: 11,
      date: 1488307714,
      item: 1,
      quantity: 1,
      discount: 0,
      location: 'CA',
      channel: 2,
      promotion: 5
    },
    {
      id: 12,
      date: 1488307714,
      item: 1,
      quantity: 1,
      discount: 0,
      location: 'CA',
      channel: 1,
      promotion: 5
    }
  ]
};
