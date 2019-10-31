export type Contact = {
  id: number;
  name?: string;
  company_id?: number;
  department_id?: number;
  post_id?: number;
  post_go_id?: number;
  rank_id?: number;
  birthday?: string;
  note?: string;
  emails?: string[];
  phones?: number[];
  faxes?: number[];
  educations?: string[];
};

export type ContactList = {
  id: number;
  name?: string;
  company_id?: number;
  company_name?: string;
  post_name?: string;
  phones?: number[];
  faxes?: number[];
};

export type ContactShort = {
  id: number;
  name?: string;
  department_name?: string;
  post_name?: string;
  post_go_name?: string;
};
