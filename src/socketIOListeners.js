import { useUser } from '@strapi/strapi';

module.exports = async (strapi) => {
  const { user } = useUser();

  console.log("Loading up socket.io...");

  //socket io instance
      // origin: 'http://localhost:7456/';
  const io = require('socket.io')(strapi.server.httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
    // transports: ['websocket'],
    // upgrade: false,
    allowEIO3: true
  });

  console.log(user);
  //listener connection
  io.on("connection", async (socket) => {

    console.log(`User[${socket.id}] connected`);

    //create room listener
    socket.on('createRoom', async (request) => {
      const room = await verifyUserInRoom(strapi, request, 'owner');
      if(room) {
        request.data.room = room;
        await ioActionListener(request, io ,socket)
      }
    });

    //join room listener
    socket.on('joinRoom', async (request) => {
      console.log("####JOIN ROOM EMIT####")

      //verify first if room Id is exists
      const room = await verifyUserInRoom(strapi, request, 'joiner');

      if(room) {
        request.data.room = room;
        await ioActionListener(request, io ,socket)
      }

      // //room users
      // let roomUsers = await io.in(request.data.room.id).fetchSockets();
      // console.log(roomUsers);
    });

    // Player Disconnects
    socket.on("disconnect", async (reason) => {
      console.log(`user disconnected`);

      const sockets = await io.fetchSockets();
      const players = sockets.map((s) => {
        return { id: s.id, data: s.data };
      });

      io.emit("update", { action: "player_left", players });
    });

    // End of io.on
  });

};

/**CUSTOM FUNCTIONS**/
const ioActionListener = async (request, io ,socket) => {
  switch(request.action) {
    case 'room_created':
        console.log(`room created: ${request.data.room.id} - ${socket.id}`)
        //owner joined in the room
        socket.join(request.data.room.id);
        //broadcast to all users
        io.emit("emitToAll", request);
      break;
    case 'join_room':
        console.log(`joining to room ${request.data.room.id} - ${socket.id}`);
        //joiner joined in the room
        socket.join(request.data.room.id);
        //broadcast to all users in room
        io.in(request.data.room.id).emit('userJoined', request.data.room.joiner);
      break;
  }
}

const verifyUserInRoom = async (strapi, request, userType) => {

 if(!userType) return;

  let data = populateUser(userType, request);
  if(!data) return;

  const room = await strapi.entityService.findOne('api::room.room', request.data.room.id,
    data
  );

  return room;
};

const populateUser = (userType, request) => {
  let data = {};
  if(userType === 'joiner') {
    data = {
      filters: {
        joiner: {
          id : {
            $eq: request.data.room.joiner
          }
        }
      }, populate : {
        joiner: {
          fields : ['id', 'username']
        }
      }
    }
    return data;
  }
  else if (userType === 'owner') {
    data = {
      filters: {
      owner: {
          id : {
            $eq: request.data.room.owner
          }
        }
      },
      populate : {
        owner: {
          fields : ['id', 'username']
        }
      }
    }
    return data;
  }
  else {
    return null;
  }
};
