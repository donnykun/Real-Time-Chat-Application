import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5500', 'http://127.0.0.1:5500'],
    },
});

// memory storage for messages and usernames
let messages = [];
const usernames = {};

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Emit the socket.id to the client
    socket.emit('id', socket.id);

    // Send existing chat history to the newly connected client
    socket.emit('chat history', messages);

    // Set default username
    usernames[socket.id] = `User-${socket.id.substring(0, 5)}`;

    socket.on('message', (data) => {
        const message = { id: socket.id, text: data.text, username: data.username || usernames[socket.id] };
        messages.push(message);

        // Broadcast the new message to all clients
        io.emit('message', message);
    });

    socket.on('change username', (newUsername) => {
        usernames[socket.id] = newUsername;
        socket.emit('username changed', newUsername);
    });

    socket.on('disconnect', () => {
        delete usernames[socket.id];
    });
});

httpServer.listen(3500, () => console.log('listening on port 3500'));
