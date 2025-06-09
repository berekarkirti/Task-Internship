'use strict';

/**
 * book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book.book', ({ strapi }) => ({
    /**
     * @param {{ body: string; }} ctx
     */
    async customAction(ctx) {
        ctx.body = "Here is my custom endpoint !!";
    },
    /**
     * @param {any} ctx
     */
    async find(ctx)
    {
        const {data,meta} = await super.find(ctx);

        const currentDate = new Date();
        meta.date = currentDate.toISOString();

        return {data,meta};
    }
}));
