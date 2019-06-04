import {object, number, string} from 'yup';

export const EmailSchema = object({
  id: number().positive().integer(),
  email: string().email(),
});
