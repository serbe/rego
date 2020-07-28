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

// const initialStateContext: AuthContextType = {
//   state: initialState,
//   dispatch: () => {},
// };

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

export async function checkAuth(token: string, role: number): Promise<boolean> {
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
}

export const getStorage = (): {
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
