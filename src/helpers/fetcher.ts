import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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

export const URL = 'ws://127.0.0.1:9090/ws';

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
  ws: WebSocket | undefined,
  name: string,
  id: string,
  setLoaded: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  const numberID = Number(id);
  if (numberID !== 0 && ws) {
    ws.addEventListener('open', () => {
      ws.send(
        `{"command":{"Get":{"Item":{"name":"${name}","id":${numberID}}}},"addon":"${token}"}`,
      );
    });
  } else {
    setLoaded(true);
  }
};

export const AddEventMessageGet = (
  ws: WebSocket | undefined,
  fn: (message: MessageEvent, setData: Dispatch<SetStateAction<Item>>) => void,
  setData: Dispatch<SetStateAction<Item>>,
): void => {
  if (ws) {
    ws.addEventListener('message', (event: MessageEvent) => {
      fn(event, setData);
    });
  }
};

const getListListener = (
  message: MessageEvent,
  setList: Dispatch<SetStateAction<List[]>>,
  setError: Dispatch<SetStateAction<string>>,
) => {
  const text = message.data as string;
  const jsonData = JSON.parse(text) as JsonListScheme;

  if (jsonData?.command === 'Get') {
    switch (jsonData?.name) {
      case 'CertificateList':
        setList(jsonData.object.CertificateList);
        break;
      case 'CompanyList':
        setList(jsonData.object.CompanyList);
        break;
      case 'ContactList':
        setList(jsonData.object.ContactList);
        break;
      case 'DepartmentList':
        setList(jsonData.object.DepartmentList);
        break;
      case 'EducationList':
        setList(jsonData.object.EducationList);
        break;
      case 'EducationNear':
        setList(jsonData.object.EducationShort);
        break;
      case 'KindList':
        setList(jsonData.object.KindList);
        break;
      case 'PostList':
        setList(jsonData.object.PostList);
        break;
      case 'PracticeList':
        setList(jsonData.object.PracticeList);
        break;
      case 'PracticeNear':
        setList(jsonData.object.PracticeShort);
        break;
      case 'RankList':
        setList(jsonData.object.RankList);
        break;
      case 'ScopeList':
        setList(jsonData.object.ScopeList);
        break;
      case 'SirenList':
        setList(jsonData.object.SirenList);
        break;
      case 'SirenTypeList':
        setList(jsonData.object.SirenTypeList);
        break;
      default:
        setError('unknown list');
    }
  }
};

export const GetList = (name: string): [List[], string] => {
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState<string>('');
  const { auth } = useAuthState();
  const { ws } = useWebSocketState();

  useEffect(() => {
    if (ws.readyState === 1) {
      ws.send(`{"command":{"Get":{"List":"${name}"}},"addon":"${auth.token}"}`);
    }

    ws.addEventListener('message', (message: MessageEvent) => {
      getListListener(message, setList, setError);
    });

    return () => {
      ws.removeEventListener('message', (message: MessageEvent) => {
        getListListener(message, setList, setError);
      });
    };
  }, [auth.token, name, ws.readyState]);

  return [list, error];
};

export const GetSelect = (name: string): [SelectItem[], string] => {
  const { auth } = useAuthState();
  const [list, setSelect] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>('');

  const ws = useRef<WebSocket>();

  useEffect(() => {
    ws.current = new WebSocket(URL);
    if (ws.current) {
      ws.current.addEventListener('message', (message: MessageEvent) => {
        const text = message.data as string;
        const jsonData = JSON.parse(text) as JsonListScheme;
        if (jsonData?.command === 'Get') {
          switch (jsonData?.name) {
            case 'CompanySelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'ContactSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'DepartmentSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'KindSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'PostSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'PostGoSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'RankSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'ScopeSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            case 'SirenTypeSelect':
              if (jsonData.object.SelectItem.length > 0) {
                setSelect(jsonData.object.SelectItem);
              } else {
                setSelect([{ id: 0, name: '' }]);
              }
              break;
            default:
              setError('unknown list');
          }
        }
      });

      ws.current.addEventListener('open', () => {
        if (ws.current) {
          ws.current.send(`{"command":{"Get":{"List":"${name}"}},"addon":"${auth.token}"}`);
        }
      });
    }

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
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
  if (ws) {
    ws.addEventListener('message', (message: MessageEvent) => {
      const text = message.data as string;
      const jsonData = JSON.parse(text) as JsonItemScheme;
      const command = id === 0 ? 'Insert' : 'Update';

      if (jsonData?.command === command && jsonData.name === name) {
        status(true);
      }
    });

    ws.send(
      `{"command":{"${id === 0 ? 'Insert' : 'Update'}":{"${name}":${JSON.stringify(
        item,
      )}}},"addon":"${token}"}`,
    );
  }
};

export const DelItem = (
  ws: WebSocket | undefined,
  id: number,
  name: string,
  status: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  if (ws) {
    ws.addEventListener('message', (message: MessageEvent) => {
      const text = message.data as string;
      const jsonData = JSON.parse(text) as JsonItemScheme;

      if (jsonData?.command === 'Delete' && jsonData.name === name) {
        status(true);
      }
    });

    ws.send(`{"command":{"Delete":{"name":"${name}","id":${id}}},"addon":"${token}"}`);
  }
};
