import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useReducer,
} from 'react';

const loginURL = process.env.REACT_APP_LOGINURL || '/go/login';
const checkURL = process.env.REACT_APP_CHECKURL || '/go/check';

export type User = {
  role: number;
  name: string;
  token: string;
};

export type AuthState = {
  user: User;
  login: boolean;
  check: boolean;
};

export interface CJson {
  r: boolean;
}

const initialAuthState: AuthState = {
  user: { role: 0, name: '', token: '' },
  login: false,
  check: false,
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
    }
  | {
      type: 'Checked';
    }
  | {
      type: 'Unchecked';
    };

interface SetAuthState {
  dispatch: Dispatch<ReducerActions>;
}

interface TJson {
  t: string;
  r: number;
}

const initialSetAuthState: SetAuthState = {
  dispatch: () => {
    return true;
  },
};

export const login = (name: string, pass: string, setAuth: Dispatch<ReducerActions>): void => {
  fetch(loginURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ u: name, p: btoa(pass) }),
  })
    .then((response) => response.json())
    .then((response) => response as TJson)
    .then((jsonData) => {
      setAuth({
        type: 'SetAuth',
        data: {
          user: {
            role: jsonData.r,
            name,
            token: jsonData.t,
          },
          check: true,
          login: true,
        },
      });
    });
};

export const check = (token: string, role: string): void => {
  fetch(checkURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ t: token, r: role }),
  })
    .then((response) => response.json())
    .then((response) => response as CJson)
    .then((jsonData) => {
      return jsonData.r;
    });
};

export const logout = (): void => {
  clearStorage();
};

export const AuthContext = createContext(initialAuthState);

export const SetAuthContext = createContext(initialSetAuthState);

interface AuthProviderProperties {
  children: ReactNode;
}

export const getStorage = (): User => {
  const userStorage: string | null = localStorage.getItem('user');
  const user: User = { role: 0, name: '', token: '' };
  if (userStorage) {
    const u: User | undefined = JSON.parse(userStorage);
    if (u) {
      user.name = u.name;
      user.role = u.role;
      user.token = u.token;
    }
  }
  return user;
};

const setStorage = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

const clearStorage = (): void => {
  localStorage.removeItem('user');
};

export const reducer = (authState: AuthState, action: ReducerActions): AuthState => {
  switch (action.type) {
    case 'SetAuth': {
      setStorage(action.data.user);
      return {
        user: action.data.user,
        login: action.data.login,
        check: action.data.check,
      };
    }
    case 'ClearAuth': {
      clearStorage();
      return {
        user: { role: 0, name: '', token: '' },
        login: false,
        check: true,
      };
    }
    case 'SetLogin': {
      return {
        ...authState,
        login: action.data,
        check: true,
      };
    }
    case 'Checked': {
      return {
        ...authState,
        check: true,
      };
    }
    case 'Unchecked': {
      return {
        ...authState,
        check: false,
      };
    }
    default:
      return authState;
  }
};

export const AuthProvider = (properties: AuthProviderProperties): ReactElement => {
  const { children } = properties;

  const user = getStorage();
  const initState: AuthState = {
    user,
    login: false,
    check: false,
  };

  const [state, dispatch] = useReducer(reducer, initState);

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

export const checkStorage = (
  setChecker: Dispatch<SetStateAction<boolean>>,
  setLogin: Dispatch<SetStateAction<boolean>>,
): void => {
  const user = getStorage();

  fetch(checkURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{ "t": "${user.token}", "r": ${user.role} }`,
  })
    .then((response) => response.json())
    .then((response) => response as CJson)
    .then((jsonData) => {
      if (jsonData.r) {
        setLogin(true);
        setChecker(true);
      } else {
        setLogin(false);
        setChecker(true);
      }
    });
};
