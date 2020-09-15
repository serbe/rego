import React, {
  createContext,
  ReactElement,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react';

const WebSocketContext = createContext<WebSocket | undefined>(undefined);

const SetWebSocketContext = createContext<
  undefined | Dispatch<SetStateAction<WebSocket | undefined>>
>(undefined);

interface WebSocketProviderProperties {
  children: ReactNode;
}

interface WebSocketContextProperties {
  ws?: WebSocket;
  setWs: Dispatch<SetStateAction<WebSocket | undefined>>;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProperties): ReactElement => {
  const [webSocket, setWebSocket] = useState<WebSocket | undefined>();

  return (
    <WebSocketContext.Provider value={webSocket}>
      <SetWebSocketContext.Provider value={setWebSocket}>{children}</SetWebSocketContext.Provider>
    </WebSocketContext.Provider>
  );
};

export const useWebSocketState = (): WebSocketContextProperties => {
  const ws = useContext(WebSocketContext);
  const setWs = useContext(SetWebSocketContext);
  if (ws === undefined) {
    throw new Error('useWebSocketState: ws is undefined');
  }
  if (setWs === undefined) {
    throw new Error('useSetWebSocketState: setWs is undefined');
  }
  return { ws, setWs };
};
