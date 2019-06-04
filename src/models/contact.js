import {array, object, number, string, date} from 'yup';
import { EmailSchema } from './email';
import { PhoneSchema } from './phone';
import { FaxSchema } from './fax';
import { SelectItemSchema } from './selectitem';

export const ContactSchema = object({
    id: number().positive().integer(),
    name: string().required(),
    address: string(),
    birthday: date(),
    company: SelectItemSchema,
    company_id: number().positive().integer(),
    post: SelectItemSchema,
    post_id: number().integer(),
    department: SelectItemSchema,
    department_id: number().positive().integer(),
    post_go: SelectItemSchema,
    post_go_id: number().positive().integer(),
    rank: SelectItemSchema,
    rank_id: number().positive().integer(),
    emails: array().of(EmailSchema),
    phones: array().of(PhoneSchema),
    faxes: array().of(FaxSchema),
    note: string(),
});

export const ContactListSchema = object({
  id: number().positive().integer(),
  name: string().required(),
  company_id: number().positive().integer(),
  company_name: string(),
  post_name: string(),
  phones: array().of(string()),
  faxes: array().of(string()),
});

export const ContactItemSchema = object({
  id: number().positive().integer(),
  name: string().required(),
  department_name: string(),
  post_name: string(),
  post_go_name: string(),
});
