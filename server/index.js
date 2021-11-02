const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});
const cors = require('cors');
const { v4 } = require('uuid');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/join', (request, response) => {
    response.send({ unique_id: v4() });
});

// Socket.io listeners
io.on('connection', socket => {
    console.log('socket connection established')

    socket.on('', (roomId, userId) => {
        console.log('roomId: ' + roomId + ' userId: ' + userId)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId)
        })
    })
})

server
.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
.on('error', e => {
    console.error(e);
});
