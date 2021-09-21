import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

import { User } from '../models/user';

const checkURL = process.env.REACT_APP_CHECKURL || '/go/check';

interface CheckResponse {
  r: boolean;
}

export const setStorage = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearStorage = (): void => {
  localStorage.removeItem('user');
};

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

export const checkStorage = (
  setChecker: Dispatch<SetStateAction<boolean>>,
  setLogin: Dispatch<SetStateAction<boolean>>,
): void => {
  const user = getStorage();

  axios
    .post<CheckResponse>(checkURL, `{ "t": "${user.token}", "r": ${user.role} }`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((jsonData) => {
      if (jsonData.data.r) {
        setLogin(true);
        setChecker(true);
      } else {
        setLogin(false);
        setChecker(true);
      }
    });
};

// const check = (token: string, role: string): void => {
//   axios
//     .post<CheckResponse>(
//       checkURL,
//       { t: token, r: role },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     )
//     .then((jsonData) => {
//       return jsonData.data.r;
//     });
// };
