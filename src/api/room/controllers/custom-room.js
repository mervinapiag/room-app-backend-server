/**
 * A set of functions called "actions" for `custom-room`
 */
const httpConstants = require('http2').constants;

export default {
  async joinRoom(ctx) {
    const user = ctx.state.user;
    const {room_id} = ctx.request.body;

    //check if room is exists
    const room = await strapi.entityService.findOne('api::room.room', parseInt(room_id) ,{});
    if(!room) return ctx.badRequest('Room not found!');

    const updatedRoom = await strapi.entityService.update('api::room.room', room.id ,{
      data: {
        joiner: user.id,
      },
    });

    if(updatedRoom) {

      return {
        status: httpConstants.HTTP_STATUS_OK,
        data: {
          room: { id: room.id, name: room.name },
        }
      };
    }

  }
};
