import {SelectItem} from './selectitem';

export interface Siren {
  id: number;
  num_id: number;
  num_pass: string;
  siren_type_id: string;
  siren_type: SelectItem;
  address: string;
  radio: string;
  desk: string;
  contact_id: number;
  contact: SelectItem;
  company_id: number;
  company: SelectItem;
  latitude: string;
  longitude: string;
  stage: string;
  own: string;
  note: string;
}
