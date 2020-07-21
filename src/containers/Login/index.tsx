import React, { ChangeEvent, useState } from 'react';

import { FormField } from '../../components/formfield';

// import { URL } from '../../helpers/fetcher';

export const Login = (): JSX.Element => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  // const [token, setToken] = useState<string>();
  // const [error, setError] = useState<string>();
  // credentials: 'include',

  const submit = (): void => {
    fetch('http://127.0.0.1:9090/api/go/login', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Auth: { u: name, p: btoa(pass) } }),
    })
      .then((response) => {
        // const jsonData = response as AuthJson;
        // setToken(jsonData.token);
        // setError(jsonData.error);
        console.log(response);
        return;
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container ">
      <div className="content has-text-centered">
        <h2>Авторизация</h2>
      </div>
      <FormField
        name="name"
        type="text"
        icon="user"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          setName(event.target.value);
        }}
      />
      <FormField
        name="password"
        type="password"
        icon="key"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          setPass(event.target.value);
        }}
      />
      <button className="button" onClick={() => submit()}>
        Сохранить
      </button>
    </div>
  );
};
