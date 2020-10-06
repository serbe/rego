import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useReducer,
} from 'react';

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

interface TJson {
  t: string;
  r: number;
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
    }
  | {
      type: 'SetLogin';
      data: boolean;
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

export const reducer = (authState: AuthState, action: ReducerActions): AuthState => {
  switch (action.type) {
    case 'SetAuth': {
      setStorage(action.data.role, action.data.name, action.data.token);
      return {
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
        role: 0,
        name: '',
        token: '',
        login: false,
        checked: true,
      };
    }
    case 'SetLogin': {
      return {
        ...authState,
        login: action.data,
        checked: true,
      };
    }
    default:
      return authState;
  }
};

export const AuthProvider = (properties: AuthProviderProperties): ReactElement => {
  const { children } = properties;

  const { role, name, token } = getStorage();
  const initialState: AuthState = {
    role,
    name,
    token,
    login: false,
    checked: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setState: SetAuthState = { dispatch };

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

// interface CheckAuthProperties {
//   ws: WebSocket;
//   auth: AuthState;
//   setAuth: Dispatch<ReducerActions>;
//   checked: boolean;
//   setChecked: Dispatch<SetStateAction<boolean>>;
// }

export const checkAuthWSListener = (
  message: MessageEvent,
  setAuth: Dispatch<ReducerActions>,
  setChecked: Dispatch<SetStateAction<boolean>>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as CJson;
  if (jsonData.r) {
    setAuth({
      type: 'SetLogin',
      data: true,
    });
  } else {
    setAuth({
      type: 'ClearAuth',
    });
  }
  setChecked(true);
};

export const loginAuthWSListener = (
  message: MessageEvent,
  name: string,
  setAuth: Dispatch<ReducerActions>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as TJson;
  setAuth({
    type: 'SetAuth',
    data: {
      checked: true,
      name,
      role: jsonData.r,
      token: jsonData.t,
      login: true,
    },
  });
};
