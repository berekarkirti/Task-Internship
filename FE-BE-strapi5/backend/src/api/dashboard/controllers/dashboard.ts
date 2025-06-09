// /**
//  * dashboard controller
//  */

// import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::dashboard.dashboard',({strapi}) =>({
//     async combinedData(ctx) {
//       try {
//         const [products, categories] = await Promise.all([
//           strapi.entityService.findMany('api::product.product', { populate: '*' }),
//           strapi.entityService.findMany('api::category.category', { populate: '*' }),
//         ]);
    
//         console.log('Products:', products);
//         console.log('Categories:', categories);
    
//         const lowThreshold = Number(ctx.query.low || 10);
//         let stockCountless10 = 0;
//         let stockCountMoreOrEqual10 = 0;
    
//         products.forEach(product => {
//           if (typeof product.Stock === 'number' && product.Stock < lowThreshold) {
//             stockCountless10++;
//           } else {
//             stockCountMoreOrEqual10++;
//           }
//         });
    
//         ctx.body = {
//           products,
//           categories,
//           productCount: products.length,
//           categoryCount: categories.length,
       
//         };
//       } catch (error) {
//         console.error('Error in combinedData:', error);
//         ctx.status = 500;
//         ctx.body = { message: 'Internal server error', error };
//       }
//     }
    
//   }));

/**
 * dashboard controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::dashboard.dashboard', ({ strapi }) => ({
  async combinedData(ctx) {
    try {
      const [products, categories] = await Promise.all([
        strapi.entityService.findMany('api::product.product', { populate: { category: true } }),
        strapi.entityService.findMany('api::category.category', { populate: '*' }),
      ]);

      console.log('Products:', products);
      console.log('Categories:', categories);

      // Calculate total stock
      const totalStock = products.reduce((sum, product) => sum + (product.Stock || 0), 0);

      ctx.body = {
        totalProducts: products.length,
        totalCategories: categories.length,
        totalStock,
      };
    } catch (error) {
      console.error('Error in combinedData:', error);
      ctx.status = 500;
      ctx.body = { message: 'Internal server error', error };
    }
  },
}));
