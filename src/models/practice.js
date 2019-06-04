import { object, number, string } from 'yup';
import { SelectItemScheme } from './selectitem';

export const PracticeScheme = object({
  id: number().positive().integer(),
  company_id: number().positive().integer(),
  company: SelectItemScheme,
  company_name: string(),
  kind_id: number().positive().integer(),
  kind: SelectItemScheme,
  kind_name: string(),
  date_of_practice: string(),
  topic: string(),
  note: string(),
});

export const PracticeItemScheme = object({
  id: number().positive().integer(),
  date_str: string(),
  kind_name: string(),
  topic: string(),
});
