import { object, number, string } from "yup";

export const SirenTypeScheme = object({
  id: number()
    .positive()
    .integer(),
  name: string().required(),
  radius: number().integer(),
  note: string()
});
