import { array, object, number, string, date } from "yup";
import { EmailScheme } from "./email";
import { PhoneScheme } from "./phone";
import { FaxScheme } from "./fax";
import { SelectItemScheme } from "./selectitem";

export const ContactScheme = object({
  id: number()
    .positive()
    .integer(),
  name: string().required(),
  address: string(),
  birthday: date(),
  company: SelectItemScheme,
  company_id: number()
    .positive()
    .integer(),
  post: SelectItemScheme,
  post_id: number().integer(),
  department: SelectItemScheme,
  department_id: number()
    .positive()
    .integer(),
  post_go: SelectItemScheme,
  post_go_id: number()
    .positive()
    .integer(),
  rank: SelectItemScheme,
  rank_id: number()
    .positive()
    .integer(),
  emails: array().of(EmailScheme),
  phones: array().of(PhoneScheme),
  faxes: array().of(FaxScheme),
  note: string()
});

export const ContactListScheme = object({
  id: number()
    .positive()
    .integer(),
  name: string().required(),
  company_id: number()
    .positive()
    .integer(),
  company_name: string(),
  post_name: string(),
  phones: array().of(string()),
  faxes: array().of(string())
});

export const ContactItemScheme = object({
  id: number()
    .positive()
    .integer(),
  name: string().required(),
  department_name: string(),
  post_name: string(),
  post_go_name: string()
});
