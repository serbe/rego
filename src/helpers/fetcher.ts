import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';

import { Item, JsonScheme, List, SelectItem } from '../models/impersonal';

type AuthJson = {
  token?: string;
  error?: string;
};

export const URL = 'ws://127.0.0.1:9090/api/go';

export const NewWS = new WebSocket(URL);

export const AddEventOpenItem = (
  ws: MutableRefObject<WebSocket | undefined>,
  name: string,
  id: string,
  setLoaded: Dispatch<SetStateAction<boolean>>,
): void => {
  const number_id = Number(id);
  if (number_id !== 0) {
    ws.current?.addEventListener('open', () => {
      ws.current?.send(`{"Get":{"Item":{"name":"${name}","id":${number_id}}}}`);
    });
  } else {
    setLoaded(true);
  }
};

export const AddEventOpenList = (
  ws: MutableRefObject<WebSocket | undefined>,
  name: string,
): void => {
  ws.current?.addEventListener('open', () => {
    ws.current?.send(`{"Get":{"List":"${name}"}}`);
  });
};

export const AddEventMessageGet = (
  ws: MutableRefObject<WebSocket | undefined>,
  fn: (
    message: MessageEvent,
    setData: Dispatch<SetStateAction<Item>>,
    setLoaded: Dispatch<SetStateAction<boolean>>,
  ) => void,
  setData: Dispatch<SetStateAction<Item>>,
  setLoaded: Dispatch<SetStateAction<boolean>>,
): void => {
  ws.current?.addEventListener('message', (event: MessageEvent) => {
    fn(event, setData, setLoaded);
  });
};

export const Login = (name: string, password: string): [string | undefined, string | undefined] => {
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Login: { name: name, password: password } }),
    })
      .then((response) => response.json())
      .then((response) => {
        const jsonData = response as AuthJson;
        setToken(jsonData.token);
        setError(jsonData.error);
        return;
      })
      .catch((error) => setError(error as string));
  }, [name, password]);
  return [token, error];
};

export const GetList = (name: string): [List[], string] => {
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.addEventListener('message', (message: MessageEvent) => {
      const text = message.data as string;
      const jsonData = JSON.parse(text) as JsonScheme;

      switch (jsonData?.name) {
        case 'CertificateList':
          return setList(jsonData.object.CertificateList);
        case 'CompanyList':
          return setList(jsonData.object.CompanyList);
        case 'ContactList':
          return setList(jsonData.object.ContactList);
        case 'DepartmentList':
          return setList(jsonData.object.DepartmentList);
        case 'EducationList':
          return setList(jsonData.object.EducationList);
        case 'EducationNear':
          return setList(jsonData.object.EducationShort);
        case 'KindList':
          return setList(jsonData.object.KindList);
        case 'PostList':
          return setList(jsonData.object.PostList);
        case 'PracticeList':
          return setList(jsonData.object.PracticeList);
        case 'PracticeNear':
          return setList(jsonData.object.PracticeShort);
        case 'RankList':
          return setList(jsonData.object.RankList);
        case 'ScopeList':
          return setList(jsonData.object.ScopeList);
        case 'SirenList':
          return setList(jsonData.object.SirenList);
        case 'SirenTypeList':
          return setList(jsonData.object.SirenTypeList);
        default:
          return setError('unknown list');
      }
    });

    ws.addEventListener('open', () => {
      ws.send(`{"Get":{"List":"${name}"}}`);
    });

    return (): void => {
      ws.close();
    };
  }, [name]);

  return [list, error];
};

export const GetSelect = (name: string): [SelectItem[], string] => {
  const [list, setSelect] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.addEventListener('message', (message: MessageEvent) => {
      const text = message.data as string;
      const jsonData = JSON.parse(text) as JsonScheme;
      switch (jsonData?.name) {
        case 'CompanySelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'ContactSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'DepartmentSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'KindSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'PostSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'PostGoSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'RankSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'ScopeSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        case 'SirenTypeSelect':
          return jsonData.object.SelectItem.length > 0
            ? setSelect(jsonData.object.SelectItem)
            : setSelect([{ id: 0, name: '' }]);
        default:
          return setError('unknown list');
      }
    });

    ws.addEventListener('open', () => {
      ws.send(`{"Get":{"List":"${name}"}}`);
    });

    return (): void => {
      ws.close();
    };
  }, [name]);

  return [list, error];
};

export const SetItem = (
  ws: MutableRefObject<WebSocket | undefined>,
  id: number,
  name: string,
  item: Item,
  status: Dispatch<SetStateAction<boolean>>,
): void => {
  ws.current?.addEventListener('message', (message: MessageEvent) => {
    const text = message.data as string;
    const jsonData = JSON.parse(text) as JsonScheme;

    if (jsonData?.name === '' && jsonData.object.Res) {
      status(true);
    }
  });

  ws.current?.send(`{"${id === 0 ? 'Insert' : 'Update'}":{"${name}":${JSON.stringify(item)}}}`);
};
