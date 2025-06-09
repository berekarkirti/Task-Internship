// 'use strict';

// /**
//  * custom controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::custom.custom', ({ strapi }) => ({
//     async combinedData(ctx) {
//       const [products, categories] = await Promise.all([
//         strapi.entityService.findMany('api::product.product', { populate: '*' }),
//         strapi.entityService.findMany('api::category.category', { populate: '*' }),
//       ]);
  
//       const stockLessThanTen = products.filter(product => product.stock < 10).length;
  
//       const stockGreaterThanTen = products.filter(product => product.stock > 10).length;
  
//       ctx.body = {
//         products,
//         categories,
//         productCount: products.length,
//         categoryCount: categories.length,
//         stockLessThanTen,    
//         stockGreaterThanTen,   
//       };
//     }
//   }));

'use strict';

/**
 * Custom controller for combined data
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::custom.custom', ({ strapi }) => (
{
  async combinedData(ctx) 
  {
    const threshold = ctx.query.threshold || 10;

    const products = await strapi.entityService.findMany('api::product.product', 
    {
      populate: '*',
      limit: 20,
    });

    const lowStockCount = products.filter(product => product.stock < threshold).length;

    ctx.body = { lowStockCount };
  },

  async highStockProducts(ctx) 
  {
    const threshold = ctx.query.threshold || 10; 

    const products = await strapi.entityService.findMany('api::product.product', 
    {
      populate: '*',
      limit: 20,
    });

    const highStock = products.filter(product => product.stock > threshold);

    ctx.body = 
    {
      highStockCount: highStock.length,
      highStockProducts: highStock,
    };
  },

  async categoryStockSummary(ctx)
  {
    const products = await strapi.entityService.findMany('api::product.product', 
    {
      populate: { category: true }, 
      limit: 20,
    });

    const summary = {};
    
    products.forEach(product => 
    {
      const categoryName = product.category?.category || 'Uncategorized';

      if (!summary[categoryName]) 
      {
        summary[categoryName] = { totalStock: 0, productCount: 0 };
      }

      summary[categoryName].totalStock += product.stock || 0;
      summary[categoryName].productCount += 1;
    });

    ctx.body = { categorySummary: summary };
  },
}));


 