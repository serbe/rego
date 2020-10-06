import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export const URL = 'ws://127.0.0.1:9090/ws';

export const WebSocketContext = createContext<WebSocket>({} as WebSocket);

export const SetWebSocketContext = createContext<Dispatch<SetStateAction<WebSocket>>>(() => {});

interface WebSocketProviderProperties {
  children: ReactNode;
}

export interface WebSocketProperties {
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

export const useWebSocketState = (): WebSocketProperties => {
  const ws = useContext(WebSocketContext);
  const setWs = useContext(SetWebSocketContext);
  if (ws === undefined) {
    throw new Error('useWebSocketState: ws is undefined');
  }
  if (setWs === undefined) {
    throw new Error('useWebSocketState: setWs is undefined');
  }
  return { ws, setWs };
};
