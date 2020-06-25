import { useEffect, useState } from 'react';

import { Item, JsonScheme, List, SelectItem } from '../models/impersonal';

type AuthJson = {
  token?: string;
  error?: string;
};

export const URL = 'http://127.0.0.1:9090/api/go/json';

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

export const GetItem = (name: string, id: string): [Item, string] => {
  const [item, setItem] = useState<Item>();
  const [error, setError] = useState<string>('');
  const number_id = Number(id);

  useEffect(() => {
    if (number_id !== 0) {
      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Get: { Item: { name: name, id: number_id } } }),
      })
        .then((response) => response.json())
        .then((response) => {
          const jsonData = response as JsonScheme;
          switch (jsonData?.name) {
            case 'Certificate':
              return setItem(jsonData.object.Certificate);
            case 'Company':
              return setItem(jsonData.object.Company);
            case 'Contact':
              return setItem(jsonData.object.Contact);
            case 'Department':
              return setItem(jsonData.object.Department);
            case 'Education':
              return setItem(jsonData.object.Education);
            case 'Kind':
              return setItem(jsonData.object.Kind);
            case 'Post':
              return setItem(jsonData.object.Post);
            case 'Practice':
              return setItem(jsonData.object.Practice);
            case 'Rank':
              return setItem(jsonData.object.Rank);
            case 'Scope':
              return setItem(jsonData.object.Scope);
            case 'Siren':
              return setItem(jsonData.object.Siren);
            case 'SirenType':
              return setItem(jsonData.object.SirenType);
            default:
              return setError('unknown item');
          }
        })
        .catch((error) => setError(error as string));
    }
  }, [name, number_id]);

  return [item, error];
};

export const GetList = (name: string): [List[], string] => {
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Get: { List: name } }),
    })
      .then((response) => response.json())
      .then((response) => {
        const jsonData = response as JsonScheme;
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
      })
      .catch((error) => setError(error as string));
  }, [name]);

  return [list, error];
};

export const GetSelect = (name: string): [SelectItem[], string] => {
  const [list, setSelect] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Get: { List: name } }),
    })
      .then((response) => response.json())
      .then((response) => {
        const jsonData = response as JsonScheme;
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
      })
      .catch((error) => setError(error as string));
  }, [name]);

  return [list, error];
};
