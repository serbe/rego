import { object, number, string } from 'yup';

export const RankScheme = object({
  id: number().positive().integer(),
  name: string().required(),
  note: string(),
});
