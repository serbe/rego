import { CertificateList } from './certificate';
import { CompanyList } from './company';
import { ContactList } from './contact';
import { EducationList, EducationShort } from './education';
import { PracticeList, PracticeShort } from './practice';

export type ModelsList =
  | CertificateList
  | CompanyList
  | ContactList
  | EducationList
  | EducationShort
  | PracticeList
  | PracticeShort;
