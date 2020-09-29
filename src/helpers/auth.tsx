import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

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

export const AuthProvider = (properties: AuthProviderProperties): ReactElement => {
  const { children } = properties;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

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

export const CheckStorage = (): void => {
  const { name, token, role } = getStorage();
  const [checked, setChecked] = useState(false);
  const { setAuth } = useAuthState();

  useEffect(() => {
    fetch('/api/go/check', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{ "t": "${token}", "r": ${role} })`,
    })
      .then((response) => response.json())
      .then((response) => response as CJson)
      .then((jsonData) => {
        setChecked(jsonData.r);
      })
      .catch(() => {
        setChecked(false);
      });
  }, [role, token]);

  useEffect(() => {
    if (checked) {
      setAuth({
        type: 'SetAuth',
        data: {
          role,
          name,
          token,
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
