import React, { ChangeEvent, Dispatch, KeyboardEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FormField } from '../../components/formfield';
import { ReducerActions, ServerToken, useAuthState } from '../../helpers/auth';
import { useWebSocketState } from '../../helpers/websocket';

const loginAuthWSListener = (
  message: MessageEvent,
  id: number,
  name: string,
  setAuth: Dispatch<ReducerActions>,
): void => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as ServerToken;
  if (jsonData.data.Token) {
    if (jsonData.id === id && jsonData.data.Token.r > 0) {
      setAuth({
        type: 'SetAuth',
        data: {
          checked: true,
          name,
          role: jsonData.data.Token.r,
          token: jsonData.data.Token.t,
          login: true,
        },
      });
    } else {
      setAuth({
        type: 'ClearAuth',
      });
    }
  }
};

interface LocationState {
  from: {
    pathname: string;
  };
}

export const Login = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const { auth, setAuth } = useAuthState();
  const { from } = location.state || { from: { pathname: '/' } };
  const { ws } = useWebSocketState();
  const id = Math.floor(Math.random() * Math.floor(9223372036854775807));

  // const mounted = useRef(false);

  useEffect(() => {
    // mounted.current = true;

    // if (mounted.current) {
    ws.addEventListener('message', (message: MessageEvent) => {
      loginAuthWSListener(message, id, name, setAuth);
    });
    // }

    return (): void => {
      ws.removeEventListener('message', (message: MessageEvent) => {
        loginAuthWSListener(message, id, name, setAuth);
      });
    };
  }, [name]);

  useEffect(() => {
    if (auth.login && auth.checked) {
      history.replace(from);
    }
  }, [auth.checked, auth.login]);

  const submit = (): void => {
    ws.send(`{ "id": ${id}, "u": "${name}", "p": "${btoa(pass)}" }`);
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
