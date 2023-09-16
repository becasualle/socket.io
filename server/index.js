const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

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

  socket.on('onSendMessage', (data) => {
    socket.to(data.room).emit('onReceiveMessage', data);
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
