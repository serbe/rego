import { useHistory } from 'react-router-dom';

import { DatePicker, DatePickerValues } from '../components/datepicker';
import { Select, SelectValues } from '../components/select';
import { tinyDate, trClass } from '../services/utils';

export type Education = {
  id: number;
  contact_id?: number;
  start_date?: string;
  end_date?: string;
  post_id?: number;
  note?: string;
};

export const EducationEmpty: Education = {
  id: 0,
};

export type EducationList = {
  id: number;
  contact_id?: number;
  contact_name?: string;
  start_date?: string;
  end_date?: string;
  start_str?: string;
  end_str?: string;
  post_id?: number;
  post_name?: string;
  note?: string;
};

export type EducationShort = {
  id: number;
  contact_id: number;
  contact_name: string;
  start_date: string;
};

export const EducationNameSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    name="education-contact-name"
    label="Полное имя обучаемого"
    listName="ContactSelect"
    id={id}
    icon="user"
    setter={setter}
  />
);

export const EducationStartDateInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker
    name="education-start-date"
    label="Дата начала обучения"
    value={value}
    setter={setter}
  />
);

export const EducationEndDateInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker
    name="education-end-date"
    label="Дата окончания обучения"
    value={value}
    setter={setter}
  />
);

export const EducationNearList = ({ list }: { list: EducationShort[] }): JSX.Element => {
  const history = useHistory();
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map((row) => (
          <tr key={row.id} className={trClass(row.start_date)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/educations/${row.id}`)}
              role="gridcell"
            >
              {tinyDate(row.start_date)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/contacts/${row.contact_id}`)}
              role="gridcell"
            >
              {row.contact_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
