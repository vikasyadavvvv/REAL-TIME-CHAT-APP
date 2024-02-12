$(function () {
    const socket = io();
    const form = $('form');
    const input = $('#m');
    const messages = $('#messages');
  
    // Ask the user to enter a username
    const username = prompt('Enter your username:');
    if (username) {
      socket.emit('user connected', username);
    } else {
      alert('Please enter a valid username.');
      window.location.reload();
    }
  
    form.submit(function (e) {
      e.preventDefault();
      if (input.val()) {
        socket.emit('chat message', { username, message: input.val() });
        input.val('');
      }
      return false;
    });
  
    socket.on('chat message', function (data) {
      messages.append($('<li>').text(`${data.username}: ${data.message}`));
    });
  });
  