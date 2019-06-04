import { object, number, string } from 'yup';

export const DepartmentScheme = object({
  id: number().positive().integer(),
  name: string().required(),
  note: string(),
});
