import React, { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

export type State = {
  name: string;
  role: number;
  token: string;
  checked: boolean;
  login: boolean;
};

interface CJson {
  r: boolean;
}

export interface DispatchProperties {
  dispatch: Dispatch<ReducerActions>;
}

export const initialState: State = {
  name: '',
  role: 0,
  token: '',
  checked: false,
  login: false,
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
        name: action.data.name,
        role: action.data.role,
        token: action.data.token,
        checked: action.data.checked,
        login: action.data.login,
      };
    }
    case 'ClearAuth': {
      localStorage.setItem('u', '');
      localStorage.setItem('t', '');
      localStorage.setItem('r', '0');
      return {
        ...state,
        name: '',
        role: 0,
        token: '',
        checked: true,
        login: false,
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
  name: string;
  token: string;
  role: number;
} => {
  return {
    name: localStorage.getItem('u') || '',
    token: localStorage.getItem('t') || '',
    role: Number(localStorage.getItem('r')) || 0,
  };
};

export const CheckStorage = async (): Promise<State> => {
  const { name, token, role } = getStorage();

  let state: State = {
    checked: false,
    name: '',
    role: 0,
    token: '',
    login: false,
  };

  const check = await checkAuth(name, token, role);

  const promise = new Promise<State>((resolve, reject) => {
    if (check) {
      state = {
        checked: true,
        name: name,
        role: role,
        token: token,
        login: true,
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
