const express = require('express');
const app = express();

const http = require('http');
const cors = require('cors');

const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('onJoinRoom', (data) => {
    socket.join(data);
  });

  socket.on('onSendMessage', ({ room, message }) => {
    socket.to(room).emit('onReceiveMessage', message);
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
