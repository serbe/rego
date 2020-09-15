import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useContext,
  useReducer,
  useState,
  ReactElement,
} from 'react';

import { useWebSocketState } from './websocket';

export type AuthState = {
  role: number;
  name: string;
  token: string;
  login: boolean;
  checked: boolean;
};

interface CJson {
  r: boolean;
}

const initialAuthState: AuthState = {
  role: 0,
  name: '',
  token: '',
  login: false,
  checked: false,
};

interface SetAuthState {
  dispatch: Dispatch<ReducerActions>;
}

const initialSetAuthState: SetAuthState = {
  dispatch: () => {
    return true;
  },
};

export const AuthContext = createContext(initialAuthState);

export const SetAuthContext = createContext(initialSetAuthState);

interface AuthProviderProperties {
  children: ReactNode;
}

export type ReducerActions =
  | {
      type: 'SetAuth';
      data: AuthState;
    }
  | {
      type: 'ClearAuth';
    };

export const reducer = (authState: AuthState, action: ReducerActions): AuthState => {
  switch (action.type) {
    case 'SetAuth': {
      localStorage.setItem('u', action.data.name);
      localStorage.setItem('t', action.data.token);
      localStorage.setItem('r', action.data.role.toString());
      return {
        ...authState,
        role: action.data.role,
        name: action.data.name,
        token: action.data.token,
        login: action.data.login,
        checked: action.data.checked,
      };
    }
    case 'ClearAuth': {
      localStorage.setItem('u', '');
      localStorage.setItem('t', '');
      localStorage.setItem('r', '0');
      return {
        ...authState,
        role: 0,
        name: '',
        token: '',
        login: false,
        checked: true,
      };
    }
    default:
      return authState;
  }
};

// const checkAuth = async (name: string, token: string, role: number): Promise<boolean> => {
//   if (name === '' || token === '' || role === 0) {
//     return false;
//   }
//   return fetch('/api/go/check', {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ t: token, r: role }),
//   })
//     .then((response) => response.json())
//     .then((response) => response as CJson)
//     .then((jsonData) => {
//       return jsonData.r;
//     })
//     .catch(() => {
//       return false;
//     });
// };

const getStorage = (): {
  role: number;
  name: string;
  token: string;
} => {
  return {
    role: Number(localStorage.getItem('r')) || 0,
    name: localStorage.getItem('u') || '',
    token: localStorage.getItem('t') || '',
  };
};

export const CheckStorage = (): void => {
  const { name, token, role } = getStorage();
  const [checked, setChecked] = useState(false);
  const { setAuth } = useAuthState();
  const { ws } = useWebSocketState();

  useEffect(() => {
    if (ws) {
      ws.addEventListener('message', (message: MessageEvent) => {
        const text = message.data as string;
        const jsonData = JSON.parse(text) as CJson;
        setChecked(jsonData.r);
      });

      ws.addEventListener('open', () => {
        ws.send(`{ t: ${token}, r: ${role} })`);
      });
    }
  }, [role, token, ws]);

  useEffect(() => {
    if (checked) {
      setAuth({
        type: 'SetAuth',
        data: {
          role: role,
          name: name,
          token: token,
          login: true,
          checked: true,
        },
      });
    } else {
      setAuth({
        type: 'ClearAuth',
      });
    }
  }, [checked, name, role, setAuth, token]);
};

export const AuthProvider = (properties: AuthProviderProperties): ReactElement => {
  const { children } = properties;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const setState: SetAuthState = { dispatch: dispatch };

  // const contentValues = useMemo(
  //   () => ({
  //     state,
  //     dispatch,
  //   }),
  //   [state, dispatch],
  // );

  return (
    <AuthContext.Provider value={state}>
      <SetAuthContext.Provider value={setState}>{children}</SetAuthContext.Provider>
    </AuthContext.Provider>
  );
};

interface AuthContextProperties {
  auth: AuthState;
  setAuth: Dispatch<ReducerActions>;
}

export const useAuthState = (): AuthContextProperties => {
  const auth = useContext(AuthContext);
  const setter = useContext(SetAuthContext);
  return { auth, setAuth: setter.dispatch };
};
