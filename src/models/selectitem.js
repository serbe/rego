import {object, number, string} from 'yup';

export const SelectItemSchema = object({
  id: number().positive().integer(),
  name: string(),
});
