import { object, number, string } from "yup";

export const ScopeScheme = object({
  id: number()
    .positive()
    .integer(),
  name: string().required(),
  note: string()
});
