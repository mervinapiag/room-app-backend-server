'use strict';

/**
 * room controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils');
module.exports = createCoreController('api::room.room', ({strapi}) => ({

  async create(ctx)
  {
    const user = ctx.state.user;
    const room =  ctx.request.body.data;

    //get user's existing room
    const [entries, count] = await strapi.db.query('api::room.room').findWithCount({
      where: {
        $and: [
          {
            status: {
              $in : ['waiting_for_joiner', 'in_progress'],
            }
          },
          {
            owner: user.id
          },
        ]
      }
    });

    if(count > 0) return ctx.badRequest('You are not allowed to create new room');

    const entry = await strapi.entityService.create('api::room.room', {
      data: {
        owner: user.id,
        name: room.room_name,
        is_private: room.is_private
      },
    });

    return sanitize.contentAPI.output(entry);
  },

}));
