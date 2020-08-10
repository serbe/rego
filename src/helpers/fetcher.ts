import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

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
import { AuthContext } from './auth';

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

// type AuthJson = {
//   token?: string;
//   error?: string;
// };

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

type JsonGetItemScheme =
  | { command: 'Get'; name: 'Certificate'; object: { Certificate: Certificate }; error: string }
  | { command: 'Get'; name: 'Company'; object: { Company: Company }; error: string }
  | { command: 'Get'; name: 'Contact'; object: { Contact: Contact }; error: string }
  | { command: 'Get'; name: 'Department'; object: { Department: Department }; error: string }
  | { command: 'Get'; name: 'Education'; object: { Education: Education }; error: string }
  | { command: 'Get'; name: 'Kind'; object: { Kind: Kind }; error: string }
  | { command: 'Get'; name: 'Post'; object: { Post: Post }; error: string }
  | { command: 'Get'; name: 'Practice'; object: { Practice: Practice }; error: string }
  | { command: 'Get'; name: 'Rank'; object: { Rank: Rank }; error: string }
  | { command: 'Get'; name: 'Scope'; object: { Scope: Scope }; error: string }
  | { command: 'Get'; name: 'Siren'; object: { Siren: Siren }; error: string }
  | { command: 'Get'; name: 'SirenType'; object: { SirenType: SirenType }; error: string };

export const GetItem = (name: string, id: string): [Item] => {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState<Item>();

  useEffect(() => {
    const number_id = Number(id);
    if (number_id !== 0) {
      fetch('/api/go/json', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{"command":{"Get":{"Item":{"name":"${name}","id":${number_id}}}},"addon":"${state.token}"}`,
      })
        .then((response) => response.json())
        .then((response) => response as JsonGetItemScheme)
        .then((jsonData) => {
          if (jsonData?.command === 'Get') {
            switch (jsonData?.name) {
              case 'Certificate':
                return setData(jsonData.object.Certificate);
              case 'Company':
                return setData(jsonData.object.Company);
              case 'Contact':
                return setData(jsonData.object.Contact);
              case 'Department':
                return setData(jsonData.object.Department);
              case 'Education':
                return setData(jsonData.object.Education);
              case 'Kind':
                return setData(jsonData.object.Kind);
              case 'Post':
                return setData(jsonData.object.Post);
              case 'Practice':
                return setData(jsonData.object.Practice);
              case 'Rank':
                return setData(jsonData.object.Rank);
              case 'Scope':
                return setData(jsonData.object.Scope);
              case 'Siren':
                return setData(jsonData.object.Siren);
              case 'SirenType':
                return setData(jsonData.object.SirenType);
              default:
                throw new Error('unknown item');
            }
          }
          throw new Error('unknown item');
        })
        .catch(() => {
          return;
        });
    }
  }, [id, name, state.token]);
  return [data];
};

export const GetList = (name: string): [List[], string] => {
  const { state } = useContext(AuthContext);
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/go/json', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{"command":{"Get":{"List":"${name}"}},"addon":"${state.token}"}`,
    })
      .then((response) => response.json())
      .then((response) => response as JsonListScheme)
      .then((jsonData) => {
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
              throw new Error('unknown list');
          }
        }
        throw new Error('unknown list');
      })
      .catch(() => {
        return setError('unknown list');
      });
  }, [name, state.token]);

  return [list, error];
};

export const GetSelect = (name: string): [SelectItem[], string] => {
  const { state } = useContext(AuthContext);
  const [list, setSelect] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/go/json', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{"command":{"Get":{"List":"${name}"}},"addon":"${state.token}"}`,
    })
      .then((response) => response.json())
      .then((response) => response as JsonListScheme)
      .then((jsonData) => {
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
              throw new Error('unknown select');
          }
        }
        throw new Error('unknown select');
      })
      .catch(() => {
        return setError('unknown select');
      });
  }, [name, state.token]);

  return [list, error];
};

export const SetItem = (
  id: number,
  name: string,
  item: Item,
  status: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  fetch('/api/go/json', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"command":{"${id === 0 ? 'Insert' : 'Update'}":{"${name}":${JSON.stringify(
      item,
    )}}},"addon":"${token}"}`,
  })
    .then((response) => response.json())
    .then((response) => response as JsonItemScheme)
    .then((jsonData) => {
      const command = id === 0 ? 'Insert' : 'Update';
      if (jsonData?.command === command && jsonData.name === name) {
        status(true);
      }
      return status(false);
    })
    .catch(() => {
      return status(false);
    });
};

export const DelItem = (
  id: number,
  name: string,
  status: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  fetch('/api/go/json', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"command":{"Delete":{"name":"${name}","id":${id}}},"addon":"${token}"}`,
  })
    .then((response) => response.json())
    .then((response) => response as JsonItemScheme)
    .then((jsonData) => {
      if (jsonData?.command === 'Delete' && jsonData.name === name) {
        status(true);
      }
      return status(false);
    })
    .catch(() => {
      return status(false);
    });
};
