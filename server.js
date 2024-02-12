const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

// ... (previous code)

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('user connected', (username) => {
      io.emit('chat message', { username: 'System', message: `${username} has joined the chat` });
    });
  
    socket.on('chat message', (data) => {
      io.emit('chat message', data);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
  // ... (remaining code)
  

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
