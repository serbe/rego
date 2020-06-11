import { Dispatch, useReducer } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Certificate, CertificateList } from '../models/certificate';
import { Company, CompanyList } from '../models/company';
import { Contact, ContactList } from '../models/contact';
import { Department, DepartmentList } from '../models/department';
import { Education, EducationList } from '../models/education';
import { Kind, KindList } from '../models/kind';
import { Post, PostList } from '../models/post';
import { Practice, PracticeList, PracticeNear } from '../models/practice';
import { Rank, RankList } from '../models/rank';
import { Scope, ScopeList } from '../models/scope';
import { Siren, SirenList } from '../models/siren';
import { SirenType, SirenTypeList } from '../models/sirentype';

type State = {
  Certificate?: Certificate;
  CertificateList?: CertificateList[];
  Company?: Company;
  CompanyList?: CompanyList[];
  Contact?: Contact;
  ContactList?: ContactList[];
  Department?: Department;
  DepartmentList?: DepartmentList[];
  Education?: Education;
  EducationList?: EducationList[];
  Kind?: Kind;
  KindList?: KindList[];
  Post?: Post;
  PostList?: PostList[];
  Practice?: Practice;
  PracticeList?: PracticeList[];
  PracticeNear?: PracticeNear[];
  Rank?: Rank;
  RankList?: RankList[];
  Scope?: Scope;
  ScopeList?: ScopeList[];
  Siren?: Siren;
  SirenList?: SirenList[];
  SirenType?: SirenType[];
  SirenTypeList?: SirenTypeList;
  Error?: string;
};

type SocketValues = {
  Certificate?: Certificate;
  CertificateList?: CertificateList[];
  Company?: Company;
  CompanyList?: CompanyList[];
  Contact?: Contact;
  ContactList?: ContactList[];
  Department?: Department;
  DepartmentList?: DepartmentList[];
  Education?: Education;
  EducationList?: EducationList[];
  Kind?: Kind;
  KindList?: KindList[];
  Post?: Post;
  PostList?: PostList[];
  Practice?: Practice;
  PracticeList?: PracticeList[];
  PracticeNear?: PracticeNear[];
  Rank?: Rank;
  RankList?: RankList[];
  Scope?: Scope;
  ScopeList?: ScopeList[];
  Siren?: Siren;
  SirenList?: SirenList[];
  SirenType?: SirenType[];
  SirenTypeList?: SirenTypeList;
  Error?: string;
  Dispatch: Dispatch<JsonScheme>;
};

type JsonScheme =
  | { name: 'Certificate'; object: { Certificate?: Certificate }; error?: string }
  | { name: 'CertificateList'; object: { CertificateList?: CertificateList[] }; error?: string }
  | { name: 'Company'; object: { Company?: Company }; error?: string }
  | { name: 'CompanyList'; object: { CompanyList?: CompanyList[] }; error?: string }
  | { name: 'Contact'; object: { Contact?: Contact }; error?: string }
  | { name: 'ContactList'; object: { ContactList?: ContactList[] }; error?: string }
  | { name: 'Department'; object: { Department?: Department }; error?: string }
  | { name: 'DepartmentList'; object: { DepartmentList?: DepartmentList[] }; error?: string }
  | { name: 'Education'; object: { Education?: Education }; error?: string }
  | { name: 'EducationList'; object: { EducationList?: EducationList[] }; error?: string }
  | { name: 'Kind'; object: { Kind?: Kind }; error?: string }
  | { name: 'KindList'; object: { KindList?: KindList[] }; error?: string }
  | { name: 'Post'; object: { Post?: Post }; error?: string }
  | { name: 'PostList'; object: { PostList?: PostList[] }; error?: string }
  | { name: 'Practice'; object: { Practice?: Practice }; error?: string }
  | { name: 'PracticeList'; object: { PracticeList?: PracticeList[] }; error?: string }
  | { name: 'PracticeNear'; object: { PracticeNear?: PracticeNear[] }; error?: string }
  | { name: 'Rank'; object: { Rank?: Rank }; error?: string }
  | { name: 'RankList'; object: { RankList?: RankList[] }; error?: string }
  | { name: 'Scope'; object: { Scope?: Scope }; error?: string }
  | { name: 'ScopeList'; object: { ScopeList?: ScopeList[] }; error?: string }
  | { name: 'Siren'; object: { Siren?: Siren }; error?: string }
  | { name: 'SirenList'; object: { SirenList?: SirenList[] }; error?: string }
  | { name: 'SirenType'; object: { SirenType?: SirenType[] }; error?: string }
  | { name: 'SirenTypeList'; object: { SirenTypeList?: SirenTypeList }; error?: string };

const URL = 'ws://127.0.0.1:9090';

const initialArguments: State = {};

// export const rwsContext = createContext(rws);

const reducer = (state: State, action: JsonScheme): State => {
  switch (action.name) {
    case 'Certificate':
      return { ...state, Certificate: action.object.Certificate, Error: action.error };
    case 'CertificateList':
      return { ...state, CertificateList: action.object.CertificateList, Error: action.error };
    case 'Company':
      return { ...state, Company: action.object.Company, Error: action.error };
    case 'CompanyList':
      return { ...state, CompanyList: action.object.CompanyList, Error: action.error };
    case 'Contact':
      return { ...state, Contact: action.object.Contact, Error: action.error };
    case 'ContactList':
      return { ...state, ContactList: action.object.ContactList, Error: action.error };
    case 'Department':
      return { ...state, Department: action.object.Department, Error: action.error };
    case 'DepartmentList':
      return { ...state, DepartmentList: action.object.DepartmentList, Error: action.error };
    case 'Education':
      return { ...state, Education: action.object.Education, Error: action.error };
    case 'EducationList':
      return { ...state, EducationList: action.object.EducationList, Error: action.error };
    case 'Kind':
      return { ...state, Kind: action.object.Kind, Error: action.error };
    case 'KindList':
      return { ...state, KindList: action.object.KindList, Error: action.error };
    case 'Post':
      return { ...state, Post: action.object.Post, Error: action.error };
    case 'PostList':
      return { ...state, PostList: action.object.PostList, Error: action.error };
    case 'Post':
      return { ...state, Post: action.object.Post, Error: action.error };
    case 'PostList':
      return { ...state, PostList: action.object.PostList, Error: action.error };
    case 'PostList':
      return { ...state, PostList: action.object.PostList, Error: action.error };
    case 'Rank':
      return { ...state, Rank: action.object.Rank, Error: action.error };
    case 'RankList':
      return { ...state, RankList: action.object.RankList, Error: action.error };
    case 'SirenType':
      return { ...state, SirenType: action.object.SirenType, Error: action.error };
    case 'SirenTypeList':
      return { ...state, SirenTypeList: action.object.SirenTypeList, Error: action.error };
    case 'Siren':
      return { ...state, Siren: action.object.Siren, Error: action.error };
    case 'SirenList':
      return { ...state, SirenList: action.object.SirenList, Error: action.error };
    case 'Scope':
      return { ...state, Scope: action.object.Scope, Error: action.error };
    case 'ScopeList':
      return { ...state, ScopeList: action.object.ScopeList, Error: action.error };
    default:
      return state;
  }
};

export const Socket = (): SocketValues => {
  const [
    {
      Certificate,
      CertificateList,
      Company,
      CompanyList,
      Contact,
      ContactList,
      Department,
      DepartmentList,
      Education,
      EducationList,
      Kind,
      KindList,
      Post,
      PostList,
      Practice,
      PracticeList,
      Rank,
      RankList,
      Scope,
      ScopeList,
      Siren,
      SirenList,
      SirenType,
      SirenTypeList,
      Error,
    },
    dispatch,
  ] = useReducer(reducer, initialArguments);

  const rws = new ReconnectingWebSocket(URL);

  rws.addEventListener('message', (message: MessageEvent) => {
    const data = JSON.parse(message.data) as JsonScheme;
    dispatch(data);
  });

  rws.addEventListener('close', () => {
    console.log('close rws');
    rws.close();
  });

  return {
    Certificate,
    CertificateList,
    Company,
    CompanyList,
    Contact,
    ContactList,
    Department,
    DepartmentList,
    Education,
    EducationList,
    Kind,
    KindList,
    Post,
    PostList,
    Practice,
    PracticeList,
    Rank,
    RankList,
    Scope,
    ScopeList,
    Siren,
    SirenList,
    SirenType,
    SirenTypeList,
    Error,
    Dispatch: dispatch,
  };
};
