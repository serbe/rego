import { array, object, number, string } from 'yup';

import { EmailScheme } from './email';
import { PhoneScheme } from './phone';
import { FaxScheme } from './fax';
import { SelectItemScheme } from './selectitem';
import { PracticeItemScheme } from './practice';
import { ContactItemScheme } from './contact';

export const CompanyScheme = object({
  id: number().positive().integer(),
  name: string().required(),
  address: string(),
  scope: array().of(SelectItemScheme),
  scope_id: number(),
  note: string(),
  emails: array().of(EmailScheme),
  phones: array().of(PhoneScheme),
  faxes: array().of(FaxScheme),
  practices: array().of(PracticeItemScheme),
  contacts: array().of(ContactItemScheme),
});
