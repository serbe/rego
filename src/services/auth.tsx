import axios from 'axios';
import { createContext, Dispatch, ReactElement, ReactNode, useContext, useReducer } from 'react';

import { User } from '../models/user';
import { clearStorage, getStorage, setStorage } from './storage';

const loginURL = process.env.REACT_APP_LOGINURL || '/go/login';

type AuthState = {
  user: User;
  login: boolean;
  check: boolean;
};

const initialAuthState: AuthState = {
  user: { role: 0, name: '', token: '' },
  login: false,
  check: false,
};

type ReducerActions =
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

interface TryResponse {
  t: string;
  r: number;
}

const initialSetAuthState: SetAuthState = {
  dispatch: () => {
    return true;
  },
};

export const login = (name: string, pass: string, setAuth: Dispatch<ReducerActions>): void => {
  axios
    .post<TryResponse>(
      loginURL,
      { u: name, p: btoa(pass) },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((jsonData) => {
      setAuth({
        type: 'SetAuth',
        data: {
          user: {
            role: jsonData.data.r,
            name,
            token: jsonData.data.t,
          },
          check: true,
          login: true,
        },
      });
    });
};

// const logout = (): void => {
//   clearStorage();
// };

const AuthContext = createContext(initialAuthState);

const SetAuthContext = createContext(initialSetAuthState);

const reducer = (authState: AuthState, action: ReducerActions): AuthState => {
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

export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
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
