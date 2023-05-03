import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const inputBox = document.querySelector('#textBox');
const sendBtn = document.querySelector('#sendBtn');
const messageContainer = document.querySelector('#messages');

const socket = io('http://127.0.0.1:9900');

socket.on('messageOnClient', (message) => {
  console.log(message);
});

socket.on('clientConnect', (message) => {
  console.log(`client connected ${message}`);
});
socket.on('clientDisconnect', (message) => {
  console.log(`client ${message} disconnected`);
});
sendBtn.addEventListener('click', () => {
  socket.emit('messageToServer', inputBox.value);
});
