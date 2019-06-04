import { object, number, string } from 'yup';
import { SelectItemScheme } from './selectitem';

export const SirenScheme = object({
  id: number().positive().integer(),
  num_id: number().positive().integer(),
  num_pass: string(),
  siren_type_id: string(),
  siren_type: SelectItemScheme,
  address: string(),
  radio: string(),
  desk: string(),
  contact_id: number().positive().integer(),
  contact: SelectItemScheme,
  company_id: number().positive().integer(),
  company: SelectItemScheme,
  latitude: string(),
  longitude: string(),
  stage: string(),
  own: string(),
  note: string(),
});
