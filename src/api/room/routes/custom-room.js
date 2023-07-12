'use strict'

module.exports = {
    routes : [
        {
            method: 'POST',
            path: '/join-room',
            handler: 'custom-room.joinRoom',
        },
    ]
}
