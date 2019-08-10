import { SelectItem } from "./selectitem";

export interface Practice {
  id: number,
  company_id?: number,
  company?: SelectItem,
  company_name?: string,
  kind_id?: number,
  kind?: SelectItem,
  kind_name?: string,
  date_of_practice?: string,
  topic?: string,
  note?: string
};

export interface PracticeItem {
  id: number,
  date_str?: string,
  kind_name?: string,
  topic?: string
};
