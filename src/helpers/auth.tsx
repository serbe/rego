import React, { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

export type State = {
  role: number;
  name: string;
  token: string;
  login: boolean;
  checked: boolean;
};

interface CJson {
  r: boolean;
}

export interface DispatchProperties {
  dispatch: Dispatch<ReducerActions>;
}

export const initialState: State = {
  role: 0,
  name: '',
  token: '',
  login: false,
  checked: false,
};

type AuthContextType = {
  state: State;
  dispatch: Dispatch<ReducerActions>;
};

const initialContextValues: AuthContextType = {
  state: initialState,
  dispatch: () => {
    return true;
  },
};

export const AuthContext = createContext<AuthContextType>(initialContextValues);

interface AuthProperties {
  children: ReactNode;
}

export type ReducerActions =
  | {
      type: 'SetAuth';
      data: State;
    }
  | {
      type: 'ClearAuth';
    };

export const reducer = (state: State, action: ReducerActions): State => {
  switch (action.type) {
    case 'SetAuth': {
      localStorage.setItem('u', action.data.name);
      localStorage.setItem('t', action.data.token);
      localStorage.setItem('r', action.data.role.toString());
      return {
        ...state,
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
        ...state,
        role: 0,
        name: '',
        token: '',
        login: false,
        checked: true,
      };
    }
    default:
      return state;
  }
};

const checkAuth = async (name: string, token: string, role: number): Promise<boolean> => {
  if (name === '' || token === '' || role === 0) {
    return false;
  }
  return fetch('http://127.0.0.1:9090/api/go/check', {
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
    })
    .catch(() => {
      return false;
    });
};

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

export const CheckStorage = async (): Promise<State> => {
  const { name, token, role } = getStorage();

  let state: State = initialState;

  const check = await checkAuth(name, token, role);

  const promise = new Promise<State>((resolve, reject) => {
    if (check) {
      state = {
        role: role,
        name: name,
        token: token,
        login: true,
        checked: true,
      };
      resolve(state);
    } else {
      reject(state);
    }
    reject(state);
  });
  return promise;
};

export const Context = (properties: AuthProperties): JSX.Element => {
  const { children } = properties;
  const [state, dispatch] = useReducer(reducer, initialState);

  const contentValues = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <AuthContext.Provider value={contentValues}>{children}</AuthContext.Provider>;
};
