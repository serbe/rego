import { SelectItem } from "./selectitem";

export interface Contact {
  id: number,
  name?: string,
  address?: string,
  birthday?: Date,
  company?: SelectItem,
  company_id?: number,
  post?: SelectItem,
  post_id?: number,
  department?: SelectItem,
  department_id?: number,
  post_go?: SelectItem,
  post_go_id?: number,
  rank?: SelectItem,
  rank_id?: number,
  emails?: Array<string>,
  phones?: Array<string>,
  faxes?: Array<string>,
  note?: string
};

export interface ContactList {
  id?: number,
  name: string,
  company_id?: number,
  company_name?: string,
  post_name?: string,
  phones?: Array<string>,
  faxes?: Array<string>,
};

export interface ContactItem {
  id: number,
  name?: string,
  department_name?: string,
  post_name?: string,
  post_go_name?: string
};
