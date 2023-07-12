const _ = require('lodash');

module.exports = {
  // async afterCreate(event) {

  //     const { result } = event;

  //     strapi.emitToAllUser({
  //       action: "room_creation",
  //       data: {
  //         room: { id: result.id, name: result.name }
  //       }
  //     })

  //     // if(!strapi.socketIO) return ctx.badRequest("unauthorized");
  //     // console.log("Room Owner: ", strapi.socketIO.socket.id);
  //     // strapi.socketIO.socket.join(result.id);
  //     // strapi.socketIO.io.emit('roomCreated', {id: result.id, name: result.name});
  // }
}
