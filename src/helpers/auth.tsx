import React, { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

export type State = {
  name: string;
  role: number;
  token: string;
  checked: boolean;
};

interface CJson {
  r: boolean;
}

const initialArguments: State = {
  name: '',
  role: 0,
  token: '',
  checked: false,
};

export const AuthContext = createContext<State>(initialArguments);

export type AuthValues = {
  state: State;
  dispatch: Dispatch<ReducerActions>;
};

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

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'CREATE_PRODUCT':
//       return [
//         ...state,
//         {
//           id: action.payload.id,
//           name: action.payload.name,
//           price: action.payload.price,
//         }
//       ]
//     case 'DELETE_PRODUCT':
//       return [
//         ...state.filter(product => product.id !== action.payload.id),
//       ]
//     default:
//       return state;
//   }
// }

async function checkAuth(token: string, role: number): Promise<boolean> {
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

async function InitAuthContext() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const name = localStorage.getItem('u');
  const token = localStorage.getItem('t');
  const role = Number(localStorage.getItem('r'));

  if (token && name && role) {
    const check = await checkAuth(token, role);
    if (check) {
      auth.checked = true;
      auth.name = name;
      auth.role = role;
      return;
    }
  }
  history.push('/login');
}

export const Auth = (properties: AuthProperties): JSX.Element => {
  const { children } = properties;
  const [state, dispatch] = useReducer(reducer, initialArguments);

  const contentValues = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <AuthContext.Provider value={contentValues}>{children}</AuthContext.Provider>;
};
