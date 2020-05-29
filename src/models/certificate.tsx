import React from 'react';
import { FormField } from '../components/formfield';
import { InputValues } from '../components/input';
import { DatePicker, DatePickerValues } from '../components/datepicker';

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

export const CertificateNumberInput = (values: InputValues): JSX.Element => {
  const { value, onChange } = values;
  return (
    <FormField
      name="num"
      value={value}
      onChange={onChange}
      label="Серийный номер удостоверения"
      icon="tag"
    />
  );
};

export const CertificateDateInput = (values: DatePickerValues): JSX.Element => {
  const { value, onChange } = values;
  return <DatePicker name="cert-date" label="Дата выдачи" value={value} setter={onChange} />;
};
