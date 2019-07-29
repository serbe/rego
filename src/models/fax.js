import { object, number, string, boolean } from "yup";

export const FaxScheme = object({
  id: number()
    .positive()
    .integer(),
  phone: string(),
  fax: boolean()
});
