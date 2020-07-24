import React, { ChangeEvent, useState } from 'react';

import { FormField } from '../../components/formfield';

const setUser = (user: string, token: string, role: number): void => {
  localStorage.setItem('u', user);
  localStorage.setItem('t', token);
  localStorage.setItem('r', role.toString());
};

interface TJson {
  t: string;
  r: number;
}

export const Login = (): JSX.Element => {
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
        setUser(name, jsonData.t, jsonData.r); // GfhjkmUsera12
        return;
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div className="container w300">
      <div className="field has-text-centered">
        <h2>Авторизация</h2>
      </div>
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
