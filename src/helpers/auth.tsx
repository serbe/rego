import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
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
    }
  | {
      type: 'SetLogin';
      data: boolean;
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
        role: 0,
        name: '',
        token: '',
        login: false,
        checked: true,
      };
    }
    case 'SetLogin': {
      return {
        ...authState,
        login: action.data,
        checked: true,
      };
    }
    default:
      return authState;
  }
};

export const AuthProvider = (properties: AuthProviderProperties): ReactElement => {
  const { children } = properties;

  const storage = getStorage();
  const initState: AuthState = {
    role: storage.role,
    name: storage.name,
    token: storage.token,
    login: false,
    checked: false,
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

// export const CheckStorage = (): void => {
//   const { name, token, role } = getStorage();
//   const { setAuth } = useAuthState();

//   useEffect(() => {
//     fetch('/api/go/check', {
//       method: 'POST',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: `{ "t": "${token}", "r": ${role} })`,
//     })
//       .then((response) => response.json())
//       .then((response) => response as CJson)
//       .then((jsonData) => {
//         if (jsonData.r) {
//           setAuth({
//             type: 'SetAuth',
//             data: {
//               role,
//               name,
//               token,
//               login: true,
//               checked: true,
//             },
//           });
//         } else {
//           setAuth({
//             type: 'ClearAuth',
//           });
//         }
//       })
//       .catch((err) => {
//         console.log('error', err);
//       });
//   }, [role, token]);
// };
