import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import { Certificate, CertificateList } from '../models/certificate';
import { Company, CompanyList } from '../models/company';
import { Contact, ContactList } from '../models/contact';
import { Department, DepartmentList } from '../models/department';
import { Education, EducationList, EducationShort } from '../models/education';
import { Kind, KindList } from '../models/kind';
import { Post, PostList } from '../models/post';
import { Practice, PracticeList, PracticeShort } from '../models/practice';
import { Rank, RankList } from '../models/rank';
import { Scope, ScopeList } from '../models/scope';
import { Siren, SirenList } from '../models/siren';
import { SirenType, SirenTypeList } from '../models/sirentype';

import { useAuthState } from './auth';
import { useWebSocketState } from './websocket';

export const URL = 'ws://127.0.0.1:9090';

export type SelectItem = {
  id: number;
  name: string;
};

export type Item =
  | undefined
  | Certificate
  | Company
  | Contact
  | Department
  | Education
  | Kind
  | Post
  | Practice
  | Rank
  | Scope
  | Siren
  | SirenType;

export type List =
  | CertificateList
  | CompanyList
  | ContactList
  | DepartmentList
  | EducationList
  | EducationShort
  | KindList
  | PostList
  | PracticeList
  | PracticeShort
  | RankList
  | ScopeList
  | SirenList
  | SirenTypeList;

// // type AuthJson = {
// //   token?: string;
// //   error?: string;
// // };

type JsonListScheme =
  | undefined
  | {
      command: 'Get';
      name: 'CertificateList';
      object: { CertificateList: CertificateList[] };
      error: string;
    }
  | { command: 'Get'; name: 'CompanyList'; object: { CompanyList: CompanyList[] }; error: string }
  | { command: 'Get'; name: 'CompanySelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { command: 'Get'; name: 'ContactList'; object: { ContactList: ContactList[] }; error: string }
  | { command: 'Get'; name: 'ContactSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | {
      command: 'Get';
      name: 'DepartmentList';
      object: { DepartmentList: DepartmentList[] };
      error: string;
    }
  | {
      command: 'Get';
      name: 'DepartmentSelect';
      object: { SelectItem: SelectItem[] };
      error: string;
    }
  | {
      command: 'Get';
      name: 'EducationList';
      object: { EducationList: EducationList[] };
      error: string;
    }
  | {
      command: 'Get';
      name: 'EducationNear';
      object: { EducationShort: EducationShort[] };
      error: string;
    }
  | { command: 'Get'; name: 'KindList'; object: { KindList: KindList[] }; error: string }
  | { command: 'Get'; name: 'KindSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { command: 'Get'; name: 'PostGoSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { command: 'Get'; name: 'PostList'; object: { PostList: PostList[] }; error: string }
  | { command: 'Get'; name: 'PostSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | {
      command: 'Get';
      name: 'PracticeList';
      object: { PracticeList: PracticeList[] };
      error: string;
    }
  | {
      command: 'Get';
      name: 'PracticeNear';
      object: { PracticeShort: PracticeShort[] };
      error: string;
    }
  | { command: 'Get'; name: 'RankList'; object: { RankList: RankList[] }; error: string }
  | { command: 'Get'; name: 'RankSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { command: 'Get'; name: 'ScopeList'; object: { ScopeList: ScopeList[] }; error: string }
  | { command: 'Get'; name: 'ScopeSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { command: 'Get'; name: 'SirenList'; object: { SirenList: SirenList[] }; error: string }
  | {
      command: 'Get';
      name: 'SirenTypeList';
      object: { SirenTypeList: SirenTypeList[] };
      error: string;
    }
  | {
      command: 'Get';
      name: 'SirenTypeSelect';
      object: { SelectItem: SelectItem[] };
      error: string;
    };

type JsonItemScheme =
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Certificate'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Company'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Contact'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Department'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Education'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Kind'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Post'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Practice'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Rank'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Scope'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'Siren'; error: string }
  | { command: 'Insert' | 'Update' | 'Delete'; name: 'SirenType'; error: string };

export const AddEventOpenItem = (
  ws: MutableRefObject<WebSocket | undefined>,
  name: string,
  id: string,
  setLoaded: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  const number_id = Number(id);
  if (number_id !== 0) {
    ws.current?.addEventListener('open', () => {
      ws.current?.send(
        `{"command":{"Get":{"Item":{"name":"${name}","id":${number_id}}}},"addon":"${token}"}`,
      );
    });
  } else {
    setLoaded(true);
  }
};

export const AddEventMessageGet = (
  ws: MutableRefObject<WebSocket | undefined>,
  fn: (message: MessageEvent, setData: Dispatch<SetStateAction<Item>>) => void,
  setData: Dispatch<SetStateAction<Item>>,
): void => {
  ws.current?.addEventListener('message', (event: MessageEvent) => {
    fn(event, setData);
  });
};

export const GetList = (name: string): [List[], string] => {
  const { state } = useContext(AuthContext);
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    state.ws.addEventListener('message', (message: MessageEvent) => {
      const text = message.data as string;
      const jsonData = JSON.parse(text) as JsonListScheme;

      if (jsonData?.command === 'Get') {
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
      }
    });

    state.ws.addEventListener('open', () => {
      state.ws.send(`{"command":{"Get":{"List":"${name}"}},"addon":"${state.token}"}`);
    });

    return (): void => {
      state.ws.close();
    };
  }, [name, state.token]);

  return [list, error];
};

export const GetSelect = (name: string): [SelectItem[], string] => {
  const { auth } = useAuthState();
  const { ws } = useWebSocketState();
  const [list, setSelect] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (ws) {
      ws.addEventListener('message', (message: MessageEvent) => {
        const text = message.data as string;
        const jsonData = JSON.parse(text) as JsonListScheme;
        if (jsonData?.command === 'Get') {
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
        }
      });

      ws.addEventListener('open', () => {
        ws.send(`{"command":{"Get":{"List":"${name}"}},"addon":"${auth.token}"}`);
      });

      // return (): void => {
      //   ws.close();
      // };
    }
  }, [name, auth.token, ws]);

  return [list, error];
};

export const SetItem = (
  ws: WebSocket | undefined,
  id: number,
  name: string,
  item: Item,
  status: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  ws?.addEventListener('message', (message: MessageEvent) => {
    const text = message.data as string;
    const jsonData = JSON.parse(text) as JsonItemScheme;
    const command = id === 0 ? 'Insert' : 'Update';

    if (jsonData?.command === command && jsonData.name === name) {
      status(true);
    }
  });

  ws?.send(
    `{"command":{"${id === 0 ? 'Insert' : 'Update'}":{"${name}":${JSON.stringify(
      item,
    )}}},"addon":"${token}"}`,
  );
};

export const DelItem = (
  ws: WebSocket | undefined,
  id: number,
  name: string,
  status: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  ws?.addEventListener('message', (message: MessageEvent) => {
    const text = message.data as string;
    const jsonData = JSON.parse(text) as JsonItemScheme;

    if (jsonData?.command === 'Delete' && jsonData.name === name) {
      status(true);
    }
  });

  ws?.send(`{"command":{"Delete":{"name":"${name}","id":${id}}},"addon":"${token}"}`);
};
