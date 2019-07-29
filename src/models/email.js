import { object, number, string } from "yup";

export const EmailScheme = object({
  id: number()
    .positive()
    .integer(),
  email: string().email()
});
