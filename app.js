// Connect to backend (make sure your backend runs on localhost:3000 or change the URL)
const socket = io('http://localhost:3000');

const messages = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const input = document.getElementById('input');
const username = document.getElementById('username');

// Receive messages from server
socket.on('chat message', (data) => {
  appendMessage(data.user, data.msg, data.time);
});

// Send message to server
chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if(input.value && username.value) {
    socket.emit('chat message', {
      user: username.value,
      msg: input.value,
    });
    input.value = '';
  }
});

// Append message to chat window
function appendMessage(user, msg, time) {
  const item = document.createElement('div');
  item.className = 'message';
  item.innerHTML = `<span class="user">${user}</span>: ${msg} <span class="time">${time || ''}</span>`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}