import React, { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';

import { FormField } from '../../components/formfield';
import { useAuthState } from '../../services/auth';

interface TJson {
  t: string;
  r: number;
}

const URL = process.env.REACT_APP_LOGINURL || '/go/login';

export const Login = (): JSX.Element => {
  const { setAuth } = useAuthState();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const submit = (): void => {
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ u: name, p: btoa(pass) }),
    })
      .then((response) => response.json())
      .then((response) => response as TJson)
      .then((jsonData) => {
        setAuth({
          type: 'SetAuth',
          data: {
            user: {
              role: jsonData.r,
              name,
              token: jsonData.t,
            },
            check: true,
            login: true,
          },
        });
      });
  };

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
