import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

export type State = {
  name: string;
  role: number;
  token: string;
  checked: boolean;
};

interface CJson {
  r: boolean;
}

const initialState: State = {
  name: '',
  role: 0,
  token: '',
  checked: false,
};

type AuthContextType = {
  state: State;
  dispatch: Dispatch<ReducerActions>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProperties {
  children: ReactNode;
}

type ReducerActions =
  | {
      type: 'SetAuth';
      data: State;
    }
  | {
      type: 'ClearAuth';
    };

const reducer = (state: State, action: ReducerActions): State => {
  switch (action.type) {
    case 'SetAuth': {
      localStorage.setItem('u', action.data.name);
      localStorage.setItem('t', action.data.token);
      localStorage.setItem('r', action.data.role.toString());
      state.name = action.data.name;
      state.role = action.data.role;
      state.token = action.data.token;
      state.checked = action.data.checked;
      return state;
    }
    case 'ClearAuth': {
      localStorage.setItem('u', '');
      localStorage.setItem('t', '');
      localStorage.setItem('r', '0');
      state.name = '';
      state.role = 0;
      state.token = '';
      state.checked = false;
      return state;
    }
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
  };

  const check = await checkAuth(name, token, role);

  const promise = new Promise<State>((resolve, reject) => {
    if (check) {
      state = {
        checked: true,
        name: name,
        role: role,
        token: token,
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

  // const contentValues = useMemo(
  //   () => ({
  //     state,
  //     dispatch,
  //   }),
  //   [state, dispatch],
  // );

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
