import { object, number, string } from "yup";
import { SelectItemScheme } from "./selectitem";

export const EducationScheme = object({
  id: number()
    .positive()
    .integer(),
  contact_id: number()
    .positive()
    .integer(),
  contact: SelectItemScheme,
  post_id: number()
    .positive()
    .integer(),
  post: SelectItemScheme,
  start_date: string(),
  end_date: string(),
  note: string()
});
