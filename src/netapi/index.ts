import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'ws://127.0.0.1:9090';

export const rws = new ReconnectingWebSocket(URL);

rws.addEventListener('open', () => {
  // on receiving a message, add it to the list of messages
  console.log('open');
  // rws.send("Here's some text that the server is urgently awaiting!");
});
