import { User } from './auth';

export const authHeader = (): string | undefined => {
  const userStorage = localStorage.getItem('user');
  if (userStorage) {
    const user: User | undefined = JSON.parse(userStorage);
    if (user && user.token) {
      return user.token;
    }
  }
  return undefined;
};
