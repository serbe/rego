import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useAuthState } from '../helpers/auth';
import { FormField } from './formfield';

interface TJson {
  t: string;
  r: number;
}

const URL = '/api/go/login';

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
            checked: true,
            name,
            role: jsonData.r,
            token: jsonData.t,
            login: true,
          },
        });
      })
      .catch(() => {});
  };

  return (
    <div className="container w300">
      <div className="box mt-4">
        <h3 className="title is-3">Авторизация</h3>
        <FormField
          name="name"
          type="text"
          icon="user"
          label="Имя пользователя"
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
    </div>
  );
};
