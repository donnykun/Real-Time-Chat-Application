const socket = io('ws://localhost:3500');

// Variable to store socket.id and username
let clientId;
let username = 'Anonymous';

// Function to show the welcome message locally
const showWelcomeMessage = () => {
    addMessageToDOM({ text: 'Welcome to chat. Use /nick to set a nickname.', username: 'System' });
};

// Wait for socket.id to be received
socket.on('id', (id) => {
    clientId = id;
    username = `User-${clientId.substring(0, 5)}`; // Default username

    // Show the welcome message locally
    showWelcomeMessage();
});

// Listen for chat history and populate the chat
socket.on('chat history', (messages) => {
    messages.forEach((data) => {
        addMessageToDOM(data);
    });
});

// Listen for new messages
socket.on('message', (data) => {
    addMessageToDOM(data);
});

// Listen for username change confirmation
socket.on('username changed', (newUsername) => {
    username = newUsername;
    console.log(`Username changed to: ${username}`);
});

const sendMessage = (event) => {
    event.preventDefault();
    const input = document.querySelector('input');
    if (input.value) {
        // Check if the input is a command
        if (input.value.startsWith('/nick ')) {
            const newUsername = input.value.split(' ')[1];
            if (newUsername) {
                socket.emit('change username', newUsername);
            }
        } else {
            // Check if clientId is defined before emitting the message
            if (clientId) {
                socket.emit('message', { text: input.value, username: username });
            } else {
                console.error('Client ID not received yet.');
            }
        }
        input.value = '';
    }
    input.focus();
};

document.querySelector('form').addEventListener('submit', sendMessage);

const addMessageToDOM = (data) => {
    console.log('Received message data:', data);
    const li = document.createElement('li');
    li.className = 'message-card';
    li.innerHTML = `
        <p class="client-id">${data.username || 'System'}</p>
        <p class="message-text">${data.text}</p>
    `;
    document.querySelector('ul').appendChild(li);
};
