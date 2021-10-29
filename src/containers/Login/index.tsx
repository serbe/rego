import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';

import { FormField } from '../../components/formfield';
import { login, useAuthState } from '../../services/auth';

export const Login = (): JSX.Element => {
  const { setAuth } = useAuthState();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const submit = (): void => login(name, pass, setAuth);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container w300">
      <form onSubmit={submitHandler}>
        <div className="box mt-4">
          <h3 className="title is-3">Авторизация</h3>
          <FormField
            name="name"
            type="text"
            icon="user"
            label="Имя пользователя"
            autocomplete="udds-password"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setName(event.target.value);
            }}
          />
          <FormField
            name="password"
            type="password"
            icon="key"
            label="Пароль"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setPass(event.target.value);
            }}
            onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
              if (event.key === 'Enter') {
                submit();
              }
            }}
          />
          <div className="field">
            <div className="control">
              <button type="button" className="button" onClick={() => submit()}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
