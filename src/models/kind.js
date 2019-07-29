import { object, number, string } from "yup";

export const Kind = object({
  id: number()
    .positive()
    .integer(),
  name: string().required(),
  short_name: string(),
  note: string()
});
