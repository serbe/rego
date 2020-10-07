import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FormField } from '../../components/formfield';
import { loginAuthWSListener, useAuthState } from '../../helpers/auth';
import { useWebSocketState } from '../../helpers/websocket';

interface LocationState {
  from: {
    pathname: string;
  };
}

export const Login = (): JSX.Element => {
  const { auth, setAuth } = useAuthState();
  const { ws } = useWebSocketState();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: '/' } };

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    if (mounted.current) {
      ws.addEventListener('message', (message: MessageEvent) => {
        loginAuthWSListener(message, name, setAuth);
      });
    }

    return (): void => {
      ws.removeEventListener('message', (message: MessageEvent) => {
        loginAuthWSListener(message, name, setAuth);
      });
    };
  }, [name]);

  useEffect(() => {
    console.log('login mounted', mounted.current);
  }, [mounted]);

  useEffect(() => {
    if (auth.login && auth.checked) {
      history.replace(from);
    }
  }, [auth.checked, auth.login]);

  const submit = (): void => {
    ws.send(`{ "u": "${name}", "p": "${btoa(pass)}" }`);
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
