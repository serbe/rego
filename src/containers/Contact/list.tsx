import React, { useState, useEffect, FC } from 'react';
import { Table } from '../../components/table';
import { ContactList } from '../../models/contact';

export const Contacts: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [contacts, setContacts] = useState<ContactList[]>([]);

  async function fetchData(): Promise<void> {
    const res = await fetch('/api/go/contact/list');
    res
      .json()
      .then(res => setContacts(res.data['ContactList']))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
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
