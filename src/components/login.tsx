import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { useAuthState } from '../helpers/auth';
import { URL } from '../helpers/fetcher';
import { FormField } from './formfield';

interface TJson {
  t: string;
  r: number;
}

export const Login = (): JSX.Element => {
  const { setAuth } = useAuthState();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const ws = useRef<WebSocket>();

  useEffect(() => {
    ws.current = new WebSocket(URL);

    ws.current.addEventListener('message', (message: MessageEvent) => {
      const text = message.data as string;
      const jsonData = JSON.parse(text) as TJson;
      console.log(jsonData);
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
    });

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const submit = (): void => {
    if (ws.current) {
      ws.current.send(`{ "u": "${name}", "p": "${btoa(pass)}" }`);
    }
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
            event.key === 'Enter' && submit();
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
    </div>
  );
};
