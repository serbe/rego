import React, { ChangeEvent } from 'react';

import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { StringInputProperties } from '../components/input';

export type Certificate = {
  id: number;
  num?: string;
  contact_id?: number;
  company_id?: number;
  cert_date?: string;
  note?: string;
};

export const CertificateEmpty: Certificate = {
  id: 0,
};

export type CertificateList = {
  id: number;
  num?: string;
  contact_id?: number;
  contact_name?: string;
  company_id?: number;
  company_name?: string;
  cert_date?: string;
  note?: string;
};

export const CertificateNumberInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="num"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      properties.setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Серийный номер удостоверения"
    icon="tag"
  />
);

export const CertificateDateInput = (properties: DatePickerValues): JSX.Element => (
  <DatePicker
    name="cert-date"
    label="Дата выдачи"
    value={properties.value}
    setter={properties.setter}
  />
);
