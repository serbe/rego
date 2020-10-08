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
  | {
      command: 'CertificateList';
      data: { DBData: { CertificateList: CertificateList[] } };
      error: string;
    }
  | { command: 'CompanyList'; data: { DBData: { CompanyList: CompanyList[] } }; error: string }
  | { command: 'ContactList'; data: { DBData: { ContactList: ContactList[] } }; error: string }
  | {
      command: 'DepartmentList';
      data: { DBData: { DepartmentList: DepartmentList[] } };
      error: string;
    }
  | {
      command: 'EducationList';
      data: { DBData: { EducationList: EducationList[] } };
      error: string;
    }
  | {
      command: 'EducationNear';
      data: { DBData: { EducationShort: EducationShort[] } };
      error: string;
    }
  | { command: 'KindList'; data: { DBData: { KindList: KindList[] } }; error: string }
  | { command: 'PostList'; data: { DBData: { PostList: PostList[] } }; error: string }
  | {
      command: 'PracticeList';
      data: { DBData: { PracticeList: PracticeList[] } };
      error: string;
    }
  | {
      command: 'PracticeNear';
      data: { DBData: { PracticeShort: PracticeShort[] } };
      error: string;
    }
  | { command: 'RankList'; data: { DBData: { RankList: RankList[] } }; error: string }
  | { command: 'ScopeList'; data: { DBData: { ScopeList: ScopeList[] } }; error: string }
  | { command: 'SirenList'; data: { DBData: { SirenList: SirenList[] } }; error: string }
  | {
      command: 'SirenTypeList';
      data: { DBData: { SirenTypeList: SirenTypeList[] } };
      error: string;
    };

type JsonSelectScheme =
  | { command: 'CompanySelect'; data: { DBData: { SelectItem: SelectItem[] } }; error: string }
  | { command: 'ContactSelect'; data: { DBData: { SelectItem: SelectItem[] } }; error: string }
  | {
      command: 'DepartmentSelect';
      data: { DBData: { SelectItem: SelectItem[] } };
      error: string;
    }
  | { command: 'KindSelect'; data: { DBData: { SelectItem: SelectItem[] } }; error: string }
  | { command: 'PostGoSelect'; data: { DBData: { SelectItem: SelectItem[] } }; error: string }
  | { command: 'PostSelect'; data: { DBData: { SelectItem: SelectItem[] } }; error: string }
  | { command: 'RankSelect'; data: { DBData: { SelectItem: SelectItem[] } }; error: string }
  | { command: 'ScopeSelect'; data: { DBData: { SelectItem: SelectItem[] } }; error: string }
  | {
      command: 'SirenTypeSelect';
      data: { DBData: { SelectItem: SelectItem[] } };
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

  if (jsonData.command && jsonData.data.DBData) {
    if (jsonData.error === '') {
      switch (jsonData.command) {
        case 'CertificateList':
          setList(jsonData.data.DBData.CertificateList);
          break;
        case 'CompanyList':
          setList(jsonData.data.DBData.CompanyList);
          break;
        case 'ContactList':
          setList(jsonData.data.DBData.ContactList);
          break;
        case 'DepartmentList':
          setList(jsonData.data.DBData.DepartmentList);
          break;
        case 'EducationList':
          setList(jsonData.data.DBData.EducationList);
          break;
        case 'EducationNear':
          setList(jsonData.data.DBData.EducationShort);
          break;
        case 'KindList':
          setList(jsonData.data.DBData.KindList);
          break;
        case 'PostList':
          setList(jsonData.data.DBData.PostList);
          break;
        case 'PracticeList':
          setList(jsonData.data.DBData.PracticeList);
          break;
        case 'PracticeNear':
          setList(jsonData.data.DBData.PracticeShort);
          break;
        case 'RankList':
          setList(jsonData.data.DBData.RankList);
          break;
        case 'ScopeList':
          setList(jsonData.data.DBData.ScopeList);
          break;
        case 'SirenList':
          setList(jsonData.data.DBData.SirenList);
          break;
        case 'SirenTypeList':
          setList(jsonData.data.DBData.SirenTypeList);
          break;
        default:
          setError('unknown list');
      }
    } else {
      setError(jsonData.error);
    }
  }
};

export const GetList = (name: string): [List[], string] => {
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState<string>('');
  const { auth } = useAuthState();
  const { ws } = useWebSocketState();

  useEffect(() => {
    if (ws.readyState === 1 && auth.token !== '') {
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
        const jsonData = JSON.parse(text) as JsonSelectScheme;
        if (jsonData.command && jsonData.data.DBData.SelectItem) {
          if (jsonData.error === '') {
            if (jsonData.data.DBData.SelectItem.length === 0) {
              setSelect([{ id: 0, name: '' }]);
            } else {
              setSelect(jsonData.data.DBData.SelectItem);
            }
          } else {
            setError(jsonData.error);
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
