import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker, DatePickerValues } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input, InputValues } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type SirenType = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export type SirenTypeList = {
  id: number;
  name?: string;
  radius?: number;
  note?: string;
};

export const SirenTypeIDSelect = (values: SelectValues): JSX.Element => {
  const { id, callback } = values;
  return (
    <Select
      name="siren_type_id"
      label="Тип сирены"
      listName="SyrenTypeSelect"
      id={id}
      icon="tag"
      callback={callback}
    />
  );
};
