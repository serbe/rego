import { action, makeObservable, observable } from 'mobx';

// import { createContext } from 'react';

export interface Auth {
  role: number;
  name: string;
  token: string;
  login: boolean;
  checked: boolean;
}

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

const initAuth = (): Auth => {
  const { role, name, token } = getStorage();
  return {
    role,
    name,
    token,
    login: false,
    checked: false,
  };
};

class AuthStore {
  @observable auth = initAuth();

  constructor() {
    makeObservable(this);
  }

  @action clearAuth = () => {
    clearStorage();
    this.auth = {
      role: 0,
      name: '',
      token: '',
      login: false,
      checked: false,
    };
  };

  @action setAuth = (auth: Auth) => {
    setStorage(auth.role, auth.name, auth.token);
    this.auth = auth;
  };
}
