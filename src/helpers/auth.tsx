import React, { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

export type AuthData = {
  name: string;
  role: number;
  token: string;
  checked: boolean;
};

interface CJson {
  r: boolean;
}

export const AuthContext = createContext<Partial<AuthData>>({});

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

async function checkAuth(token: string): Promise<boolean> {
  return fetch('http://127.0.0.1:9090/api/go/check', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ t: token }),
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
  const role = localStorage.getItem('r');

  if (token && name && role) {
    const check = await checkAuth(token);
    if (check) {
      auth.checked = true;
      auth.name = name;
      auth.role = Number(role);
      return;
    }
  }
  history.push('/login');
}
