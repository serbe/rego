import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Certificate, CertificateEmpty, CertificateList } from '../models/certificate';
import { Company, CompanyEmpty, CompanyList } from '../models/company';
import { Contact, ContactEmpty, ContactList } from '../models/contact';
import { Department, DepartmentEmpty, DepartmentList } from '../models/department';
import { Education, EducationEmpty, EducationList, EducationShort } from '../models/education';
import { Kind, KindEmpty, KindList } from '../models/kind';
import { Post, PostEmpty, PostList } from '../models/post';
import { Practice, PracticeEmpty, PracticeList, PracticeShort } from '../models/practice';
import { Rank, RankEmpty, RankList } from '../models/rank';
import { Scope, ScopeEmpty, ScopeList } from '../models/scope';
import { Siren, SirenEmpty, SirenList } from '../models/siren';
import { SirenType, SirenTypeEmpty, SirenTypeList } from '../models/sirentype';
import { useAuthState } from './auth';

const URL = process.env.REACT_APP_JSONURL || '/go/json';

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

export const GetItem = (name: string, id: string): Item => {
  const { auth } = useAuthState();
  const [data, setData] = useState<Item>();

  useEffect(() => {
    const NumberID = Number(id);
    if (NumberID !== 0) {
      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{"command":{"Get":{"Item":{"name":"${name}","id":${NumberID}}}},"addon":"${auth.user.token}"}`,
      })
        .then((response) => response.json())
        .then((response) => response as JsonGetItemScheme)
        .then((jsonData) => {
          if (jsonData?.command === 'Get') {
            switch (jsonData?.name) {
              case 'Certificate':
                setData(jsonData.object.Certificate);
                break;
              case 'Company':
                setData(jsonData.object.Company);
                break;
              case 'Contact':
                setData(jsonData.object.Contact);
                break;
              case 'Department':
                setData(jsonData.object.Department);
                break;
              case 'Education':
                setData(jsonData.object.Education);
                break;
              case 'Kind':
                setData(jsonData.object.Kind);
                break;
              case 'Post':
                setData(jsonData.object.Post);
                break;
              case 'Practice':
                setData(jsonData.object.Practice);
                break;
              case 'Rank':
                setData(jsonData.object.Rank);
                break;
              case 'Scope':
                setData(jsonData.object.Scope);
                break;
              case 'Siren':
                setData(jsonData.object.Siren);
                break;
              case 'SirenType':
                setData(jsonData.object.SirenType);
                break;
              // default:
              //   throw new Error('unknown item');
            }
          }
          // throw new Error('unknown item');
        });
    } else {
      switch (name) {
        case 'Certificate':
          setData(CertificateEmpty);
          break;
        case 'Company':
          setData(CompanyEmpty);
          break;
        case 'Contact':
          setData(ContactEmpty);
          break;
        case 'Department':
          setData(DepartmentEmpty);
          break;
        case 'Education':
          setData(EducationEmpty);
          break;
        case 'Kind':
          setData(KindEmpty);
          break;
        case 'Post':
          setData(PostEmpty);
          break;
        case 'Practice':
          setData(PracticeEmpty);
          break;
        case 'Rank':
          setData(RankEmpty);
          break;
        case 'Scope':
          setData(ScopeEmpty);
          break;
        case 'Siren':
          setData(SirenEmpty);
          break;
        case 'SirenType':
          setData(SirenTypeEmpty);
          break;
        // default:
        //   throw new Error('unknown item');
      }
    }
  }, [id, name, auth.user.token]);
  return data;
};

export const GetList = (name: string): List[] => {
  const { auth } = useAuthState();
  const [list, setList] = useState<List[]>([]);

  useEffect(() => {
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{"command":{"Get":{"List":"${name}"}},"addon":"${auth.user.token}"}`,
    })
      .then((response) => response.json())
      .then((response) => response as JsonListScheme)
      .then((jsonData) => {
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
          }
        }
      });
  }, [name, auth.user.token]);

  return list;
};

export const GetSelect = (name: string): [SelectItem[], string] => {
  const { auth } = useAuthState();
  const [list, setSelect] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{"command":{"Get":{"List":"${name}"}},"addon":"${auth.user.token}"}`,
    })
      .then((response) => response.json())
      .then((response) => response as JsonListScheme)
      .then((jsonData) => {
        if (jsonData?.command === 'Get') {
          switch (jsonData?.name) {
            case 'CompanySelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'ContactSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'DepartmentSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'KindSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'PostSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'PostGoSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'RankSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'ScopeSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            case 'SirenTypeSelect':
              jsonData.object.SelectItem.length > 0
                ? setSelect(jsonData.object.SelectItem)
                : setSelect([{ id: 0, name: '' }]);
              break;
            // default:
            //   throw new Error('unknown select');
          }
          // } else {
          //   throw new Error('unknown select');
        }
      })
      .catch(() => {
        return setError('unknown select');
      });
  }, [name, auth.user.token]);

  return [list, error];
};

export const SetItem = (
  id: number,
  name: string,
  item: Item,
  status: Dispatch<SetStateAction<boolean>>,
  token: string,
): void => {
  fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{ "command": { "${id === 0 ? 'Insert' : 'Update'}": { "${name}": ${JSON.stringify(
      item,
    )} } }, "addon": "${token}" }`,
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
  fetch(URL, {
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
