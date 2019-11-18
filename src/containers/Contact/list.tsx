import React, { useState, useEffect, FC } from 'react';

import { Table } from '../../components/table';
import { ContactList } from '../../models/contact';
import { fetchData } from '../../helpers/utils';

export const Contacts: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [contacts, setContacts] = useState<ContactList[]>([]);

  useEffect(() => {
    fetchData('/api/go/contact/list')
      .then(response =>
        response.ContactList ? setContacts(response.ContactList) : setErrors(true),
      )
      .catch(error => setErrors(error));
  }, []);

  const columns = [
    {
      field: 'name',
      label: 'Фамилия Имя Отчество',
      linkBase: '/contacts/',
      linkField: 'id',
    },
    {
      field: 'company_name',
      label: 'Организация',
      linkBase: '/compaines/',
      linkField: 'company_id',
      className: 'is-hidden-mobile',
    },
    { field: 'post_name', label: 'Должность', className: 'is-hidden-touch' },
    { field: 'phones', label: 'Телефоны', array: true },
    {
      field: 'faxes',
      label: 'Факсы',
      array: true,
      className: 'is-hidden-touch',
    },
  ];

  return hasError ? (
    <div>No data</div>
  ) : (
    <Table data={contacts} columns={columns} hoverable narrow striped paginate={20} />
  );
};
