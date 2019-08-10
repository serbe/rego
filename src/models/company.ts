import { SelectItem } from "./selectitem";

export interface Company {
  id: number,
  name?: string,
  address?: string,
  scope?: SelectItem,
  scope_id?: number,
  note?: string
  emails?: Array<string>,
  phones?: Array<string>,
  faxes?: Array<string>
};
