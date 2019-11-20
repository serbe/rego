import { CertificateList } from './certificate';
import { CompanyList } from './company';
import { EducationList, EducationShort } from './education';
import { PracticeList, PracticeShort } from './practice';

export type ModelsList =
  | CertificateList
  | CompanyList
  | EducationList
  | EducationShort
  | PracticeList
  | PracticeShort;
