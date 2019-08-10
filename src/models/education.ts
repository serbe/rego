import { SelectItem } from "./selectitem";

export interface Education {
  id: number,
  contact_id?: number,
  contact?: SelectItem,
  post_id?: number,
  post?: SelectItem,
  start_date?: string,
  end_date?: string,
  note?: string
};
