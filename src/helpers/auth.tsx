import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import { URL } from './fetcher';

export type AuthState = {
  role: number;
  name: string;
  token: string;
  login: boolean;
  checked: boolean;
};

export interface CJson {
  r: boolean;
}

const initialAuthState: AuthState = {
  role: 0,
  name: '',
  token: '',
  login: false,
  checked: false,
};

export type ReducerActions =
  | {
      type: 'SetAuth';
      data: AuthState;
    }
  | {
      type: 'ClearAuth';
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

export const reducer = (authState: AuthState, action: ReducerActions): AuthState => {
  switch (action.type) {
    case 'SetAuth': {
      setStorage(action.data.role, action.data.name, action.data.token);
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
      clearStorage();
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

export const getStorage = (): {
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

const setStorage = (role: number, name: string, token: string): void => {
  localStorage.setItem('r', String(role));
  localStorage.setItem('u', name);
  localStorage.setItem('t', token);
};

const clearStorage = (): void => {
  localStorage.setItem('u', '');
  localStorage.setItem('t', '');
  localStorage.setItem('r', '0');
};

export const CheckStorage = (): void => {
  const { name, token, role } = getStorage();
  const [checked, setChecked] = useState(false);
  const { setAuth } = useAuthState();

  const ws = useRef<WebSocket>();

  useEffect(() => {
    ws.current = new WebSocket(URL);

    if (ws.current) {
      ws.current.addEventListener('message', (message: MessageEvent) => {
        const text = message.data as string;
        const jsonData = JSON.parse(text) as CJson;
        setChecked(jsonData.r);
      });

      ws.current.addEventListener('open', () => {
        if (ws.current) {
          ws.current.send(`{ "t": "${token}", "r": ${role} })`);
        }
      });
    }
  }, [role, token]);

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
