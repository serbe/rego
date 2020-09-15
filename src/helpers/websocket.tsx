import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { URL } from './fetcher';

const WebSocketContext = createContext<WebSocket>(new WebSocket(URL));

const SetWebSocketContext = createContext<Dispatch<SetStateAction<WebSocket>>>(() => {});

interface WebSocketProviderProperties {
  children: ReactNode;
}

interface WebSocketContextProperties {
  ws: WebSocket;
  setWs: Dispatch<SetStateAction<WebSocket>>;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProperties): ReactElement => {
  const [webSocket, setWebSocket] = useState<WebSocket>(new WebSocket(URL));

  return (
    <WebSocketContext.Provider value={webSocket}>
      <SetWebSocketContext.Provider value={setWebSocket}>{children}</SetWebSocketContext.Provider>
    </WebSocketContext.Provider>
  );
};

export const useWebSocketState = (): WebSocketContextProperties => {
  const ws = useContext(WebSocketContext);
  const setWs = useContext(SetWebSocketContext);
  // if (ws === undefined) {
  //   throw new Error('useWebSocketState: ws is undefined');
  // }
  if (setWs === undefined) {
    throw new Error('useSetWebSocketState: setWs is undefined');
  }
  return { ws, setWs };
};
