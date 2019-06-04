import {object, number, string, boolean} from 'yup';

export const FaxSchema = object({
  id: number().positive().integer(),
  phone: string(),
  fax: boolean(),
});
