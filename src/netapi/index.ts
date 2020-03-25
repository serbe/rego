// import io from 'socket.io-client';

const URL = 'ws://127.0.0.1:8080';

export const socket = new WebSocket(URL);

// socket.connect();
// socket.emit('initial_data');

socket.addEventListener('open', () => {
  // on receiving a message, add it to the list of messages
  console.log('open');
  socket.send("Here's some text that the server is urgently awaiting!");
});

// ws.addEventListener('close', () => {
//   console.log('disconnected');
//   // automatically try to reconnect on connection loss
//   // this.setState({
//   //   ws: new WebSocket(URL),
//   // })
//   console.log('disconnected, need reconnect');
// });
