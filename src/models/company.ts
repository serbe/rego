import {Email} from './email';
import {Phone} from './phone';
import {Fax} from './fax';
import {SelectItem} from './selectitem';
import {PracticeItem} from './practice';
import {ContactItem} from './contact';

export interface Company {
  id: number;
  name: string;
  address: string;
  scope: SelectItem;
  scope_id: number;
  note: string;
  emails: Email[];
  phones: Phone[];
  faxes: Fax[];
  practices: PracticeItem[];
  contacts: ContactItem[];
}
