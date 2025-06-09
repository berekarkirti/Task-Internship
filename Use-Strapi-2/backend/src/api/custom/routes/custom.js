'use strict';

/**
 * product router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/combined-data',
      handler: 'custom.combinedData',
      config: {
        auth: false, 
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/high-stock-products',
      handler: 'custom.highStockProducts',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/category-stock-summary',
      handler: 'custom.categoryStockSummary',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};

