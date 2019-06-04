import { object, number, string } from 'yup';
import { SelectItemScheme } from './selectitem';

export const CertificateScheme = object({
  id: number().positive().integer(),
  num: string(),
  contact_id: number().positive().integer(),
  contact: SelectItemScheme,
  company_id: number().positive().integer(),
  company: SelectItemScheme,
  cert_date: string(),
  note: string(),
});
