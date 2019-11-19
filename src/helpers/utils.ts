import { Company, CompanyList } from '../models/company';
import { Contact, ContactList } from '../models/contact';
import { Certificate, CertificateList } from '../models/certificate';
import { SelectItem } from '../models/selectitem';
import { EducationShort } from '../models/education';
import { PracticeShort } from '../models/practice';

export interface JsonData {
  Contact?: Contact;
  ContactList?: ContactList[];
  Company?: Company;
  CompanyList?: CompanyList[];
  Certificate: Certificate;
  CertificateList: CertificateList[];
  SelectItem: SelectItem[];
  EducationShort: EducationShort[];
  PracticeShort: PracticeShort[];
}

export interface Response {
  data: JsonData;
  error?: string;
  ok: boolean;
}

export const addEmptyString = (values: string[] | undefined): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.filter(value => value !== '');
  }
  list.push('');
  return list;
};

export const numberToString = (values: number[] | undefined): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.map(value => value.toString());
  }
  return list;
};

export async function fetchData(uri: string): Promise<JsonData> {
  try {
    const response = await fetch(uri);
    const responseJson: Response = await response.json();
    return responseJson.data;
  } catch (error) {
    return error;
  }
}
