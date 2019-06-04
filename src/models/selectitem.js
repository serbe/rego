import {object, number, string} from 'yup';

export const SelectItemScheme = object({
  id: number().positive().integer(),
  name: string().required(),
});
