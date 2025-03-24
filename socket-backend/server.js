const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ Configure Socket.IO with CORS
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
//   console.log(`A user connected. Active users: ${activeUsers}`);
  
  io.emit('active-users', activeUsers);

  socket.on('disconnect', () => {
    activeUsers--;
    // console.log(`A user disconnected. Active users: ${activeUsers}`);
    io.emit('active-users', activeUsers);
  });
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
