import React, { ChangeEvent, useState, useContext } from 'react';

import { AuthContext } from '../helpers/auth';
import { FormField } from './formfield';

interface TJson {
  t: string;
  r: number;
}

export const Login = (): JSX.Element => {
  const { dispatch } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const submit = (): void => {
    fetch('http://127.0.0.1:9090/api/go/login', {
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
        dispatch({
          type: 'SetAuth',
          data: {
            checked: true,
            name: name,
            role: jsonData.r,
            token: jsonData.t,
            login: true,
          },
        });
        return;
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div className="container w300">
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
      />
      <div className="field">
        <div className="control">
          <button className="button" onClick={() => submit()}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};
