export const wsURL = 'ws://127.0.0.1:9090';

export const ConnectWS = (): WebSocket => {
  return new WebSocket(wsURL);
};

export type WsState = {
  ws?: WebSocket;
};
