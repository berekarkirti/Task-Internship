/**
 * dashboard router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::dashboard.dashboard');
module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/combined-data',
        handler: 'dashboard.combinedData',
        config: {
          auth: false,
          middlewares: [],
        },
      },
    ],
  };