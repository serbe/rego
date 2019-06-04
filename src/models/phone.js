import { object, number, string, boolean } from 'yup';

export const PhoneScheme = object({
  id: number().positive().integer(),
  phone: string(),
  fax: boolean(),
});
