import {SelectItem} from './selectitem';

export interface Certificate {
  id: number;
  num: string;
  contact_id: number;
  contact: SelectItem;
  company_id: number;
  company: SelectItem;
  cert_date: string;
  note: string;
}
