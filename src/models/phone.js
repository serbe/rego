import {object, number, string, boolean} from 'yup';

export const PhoneSchema = object({
  id: number().positive().integer(),
  phone: string(),
  fax: boolean(),
});
