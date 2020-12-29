// import React, { createContext, Dispatch, ReactNode, useReducer, useMemo } from 'react';
// import { Certificate, CertificateList } from '../models/certificate';
// import { Company, CompanyList } from '../models/company';
// import { Contact, ContactList } from '../models/contact';
// import { Department, DepartmentList } from '../models/department';
// import { Education, EducationList, EducationShort } from '../models/education';
// import { Kind, KindList } from '../models/kind';
// import { Post, PostList } from '../models/post';
// import { Practice, PracticeList, PracticeShort } from '../models/practice';
// import { Rank, RankList } from '../models/rank';
// import { Scope, ScopeList } from '../models/scope';
// import { Siren, SirenList } from '../models/siren';
// import { SirenType, SirenTypeList } from '../models/sirentype';

export const URL = 'http://127.0.0.1:9090/api/go/json';

// // export const ws = new WebSocket(URL);

// const initialArguments: State = {
//   data: null,
//   token: '',
//   isAuth: false,
//   getList: null,
//   getItem: null,
// };

// const initContext: SocketValues = {
//   state: initialArguments,
//   dispatch: () => null,
// };

// export const SocketContext = createContext<SocketValues>(initContext);

// export type State = {
//   data: JsonScheme;
//   token: string;
//   isAuth: boolean;
//   getList: ((name: string) => void) | null;
//   getItem: ((name: string, id: number) => void) | null;
// };

// export type SocketValues = {
//   state: State;
//   dispatch: Dispatch<ReducerActions>;
// };

// type SocketProperties = {
//   children: ReactNode;
// };

// type JsonScheme =
//   | null
//   | { name: 'Certificate'; object: { Certificate?: Certificate }; error?: string }
//   | { name: 'CertificateList'; object: { CertificateList?: CertificateList[] }; error?: string }
//   | { name: 'Company'; object: { Company?: Company }; error?: string }
//   | { name: 'CompanyList'; object: { CompanyList?: CompanyList[] }; error?: string }
//   | { name: 'Contact'; object: { Contact?: Contact }; error?: string }
//   | { name: 'ContactList'; object: { ContactList?: ContactList[] }; error?: string }
//   | { name: 'Department'; object: { Department?: Department }; error?: string }
//   | { name: 'DepartmentList'; object: { DepartmentList?: DepartmentList[] }; error?: string }
//   | { name: 'Education'; object: { Education?: Education }; error?: string }
//   | { name: 'EducationList'; object: { EducationList?: EducationList[] }; error?: string }
//   | { name: 'EducationNear'; object: { EducationShort?: EducationShort[] }; error?: string }
//   | { name: 'Kind'; object: { Kind?: Kind }; error?: string }
//   | { name: 'KindList'; object: { KindList?: KindList[] }; error?: string }
//   | { name: 'Post'; object: { Post?: Post }; error?: string }
//   | { name: 'PostList'; object: { PostList?: PostList[] }; error?: string }
//   | { name: 'Practice'; object: { Practice?: Practice }; error?: string }
//   | { name: 'PracticeList'; object: { PracticeList?: PracticeList[] }; error?: string }
//   | { name: 'PracticeNear'; object: { PracticeShort?: PracticeShort[] }; error?: string }
//   | { name: 'Rank'; object: { Rank?: Rank }; error?: string }
//   | { name: 'RankList'; object: { RankList?: RankList[] }; error?: string }
//   | { name: 'Scope'; object: { Scope?: Scope }; error?: string }
//   | { name: 'ScopeList'; object: { ScopeList?: ScopeList[] }; error?: string }
//   | { name: 'Siren'; object: { Siren?: Siren }; error?: string }
//   | { name: 'SirenList'; object: { SirenList?: SirenList[] }; error?: string }
//   | { name: 'SirenType'; object: { SirenType?: SirenType }; error?: string }
//   | { name: 'SirenTypeList'; object: { SirenTypeList?: SirenTypeList[] }; error?: string };

// type ReducerActions =
//   | { name: 'ClearEducationNear' }
//   | { name: 'ClearCertificate' }
//   | { name: 'ClearCertificateList' }
//   | { name: 'ClearCompany' }
//   | { name: 'ClearCompanyList' }
//   | { name: 'ClearContact' }
//   | { name: 'ClearContactList' }
//   | { name: 'ClearPracticeNear' }
//   | { name: 'GetEducationNear' }
//   | { name: 'GetCertificate' }
//   | { name: 'GetCertificateList' }
//   | { name: 'GetCompany' }
//   | { name: 'GetCompanyList' }
//   | { name: 'GetContact' }
//   | { name: 'GetContactList' }
//   | { name: 'GetPracticeNear' }
//   | JsonScheme;

// const reducer = (state: State, action: ReducerActions): State => {
//   switch (action.name) {
//     case 'Certificate':
//       return { ...state, certificate: action.object.Certificate, error: action.error };
//     case 'CertificateList':
//       return {
//         ...state,
//         certificateList: action.object.CertificateList || [],
//         error: action.error,
//       };
//     case 'Company':
//       return { ...state, company: action.object.Company, error: action.error };
//     case 'CompanyList':
//       return { ...state, companyList: action.object.CompanyList || [], error: action.error };
//     case 'Contact':
//       return { ...state, contact: action.object.Contact, error: action.error };
//     case 'ClearContactList':
//       return { ...state, contactList: [], error: undefined };
//     case 'GetContactList': {
//       state.rws.send('{"Get":{"List":"ContactList"}}');
//       return state;
//     }
//     case 'ContactList':
//       return { ...state, contactList: action.object.ContactList || [], error: action.error };
//     case 'Department':
//       return { ...state, department: action.object.Department, error: action.error };
//     case 'DepartmentList':
//       return { ...state, departmentList: action.object.DepartmentList || [], error: action.error };
//     case 'Education':
//       return { ...state, education: action.object.Education, error: action.error };
//     case 'EducationList':
//       return { ...state, educationList: action.object.EducationList || [], error: action.error };
//     case 'ClearEducationNear':
//       return { ...state, educationShort: [], error: undefined };
//     case 'GetEducationNear': {
//       state.rws.send('{"Get":{"List":"EducationNear"}}');
//       return state;
//     }
//     case 'EducationNear':
//       return { ...state, educationShort: action.object.EducationShort || [], error: action.error };
//     case 'Kind':
//       return { ...state, kind: action.object.Kind, error: action.error };
//     case 'KindList':
//       return { ...state, kindList: action.object.KindList || [], error: action.error };
//     case 'Post':
//       return { ...state, post: action.object.Post, error: action.error };
//     case 'PostList':
//       return { ...state, postList: action.object.PostList || [], error: action.error };
//     case 'Practice':
//       return { ...state, practice: action.object.Practice, error: action.error };
//     case 'PracticeList':
//       return { ...state, practiceList: action.object.PracticeList || [], error: action.error };
//     case 'ClearPracticeNear':
//       return { ...state, practiceShort: [], error: undefined };
//     case 'GetPracticeNear': {
//       state.rws.send('{"Get":{"List":"PracticeNear"}}');
//       return state;
//     }
//     case 'PracticeNear': {
//       return { ...state, practiceShort: action.object.PracticeShort || [], error: action.error };
//     }
//     case 'Rank':
//       return { ...state, rank: action.object.Rank, error: action.error };
//     case 'RankList':
//       return { ...state, rankList: action.object.RankList || [], error: action.error };
//     case 'Scope':
//       return { ...state, scope: action.object.Scope, error: action.error };
//     case 'ScopeList':
//       return { ...state, scopeList: action.object.ScopeList || [], error: action.error };
//     case 'Siren':
//       return { ...state, siren: action.object.Siren, error: action.error };
//     case 'SirenList':
//       return { ...state, sirenList: action.object.SirenList || [], error: action.error };
//     case 'SirenType':
//       return { ...state, sirenType: action.object.SirenType, error: action.error };
//     case 'SirenTypeList':
//       return { ...state, sirenTypeList: action.object.SirenTypeList || [], error: action.error };
//     default:
//       return state;
//   }
// };

// // {
// //   Certificate,
// //   CertificateList,
// //   Company,
// //   CompanyList,
// //   Contact,
// //   ContactList,
// //   Department,
// //   DepartmentList,
// //   Education,
// //   EducationList,
// //   EducationShort,
// //   Kind,
// //   KindList,
// //   Post,
// //   PostList,
// //   Practice,
// //   PracticeList,
// //   Rank,
// //   RankList,
// //   Scope,
// //   ScopeList,
// //   Siren,
// //   SirenList,
// //   SirenType,
// //   SirenTypeList,
// //   Error,
// // },

// export const Socket = (properties: SocketProperties): JSX.Element => {
//   const { children } = properties;
//   const [state, dispatch] = useReducer(reducer, initialArguments);

//   state.rws.addEventListener('message', (message: MessageEvent) => {
//     const data = JSON.parse(message.data) as JsonScheme;
//     dispatch(data);
//   });

//   state.rws.addEventListener('close', () => {
//     console.log('close rws');
//     state.rws.close();
//   });

//   const contentValues = useMemo(
//     () => ({
//       state,
//       dispatch,
//     }),
//     [state, dispatch],
//   );

//   return <SocketContext.Provider value={contentValues}>{children}</SocketContext.Provider>;
// };
