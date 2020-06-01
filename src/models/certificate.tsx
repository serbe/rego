import React, { ChangeEvent } from 'react';
import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { FieldStringProperties } from '../components/input';

export type CertificateJsonScheme = {
  name: string;
  object: {
    Certificate?: Certificate;
  };
  error?: string;
};

export type CertificateListJsonScheme = {
  name: string;
  object: {
    CertificateList?: CertificateList[];
  };
  error?: string;
};

export type Certificate = {
  id: number;
  num?: string;
  contact_id?: number;
  company_id?: number;
  cert_date?: string;
  note?: string;
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

export const CertificateNumberInput = (values: FieldStringProperties): JSX.Element => {
  const { value, setter } = values;
  return (
    <FormField
      name="num"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(event.target.value)}
      label="Серийный номер удостоверения"
      icon="tag"
    />
  );
};

export const CertificateDateInput = (values: DatePickerValues): JSX.Element => {
  const { value, setter } = values;
  return <DatePicker name="cert-date" label="Дата выдачи" value={value} setter={setter} />;
};
