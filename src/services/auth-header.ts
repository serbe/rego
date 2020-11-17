import { User } from './auth';

export const authHeader = (): string | undefined => {
  let userStorage = localStorage.getItem('user');
  if (userStorage) {
    const user: User | undefined = JSON.parse(userStorage);
    if (user && user.token) {
      return user.token;
    }
  }
  return undefined;
};
