import { boolean, object, number, string } from "yup";

export const Post = object({
  id: number()
    .positive()
    .integer(),
  name: string().required(),
  go: boolean(),
  note: string()
});
