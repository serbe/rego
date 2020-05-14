import React, { useState, useEffect } from 'react';

import { TableData, Column } from '../../components/table-data';
import { ContactList } from '../../models/contact';
import { rws } from '../../netapi';

type CLWS = {
  name: string;
  object: {
    ContactList?: ContactList[];
  };
  error?: string;
};

export const Contacts = (): JSX.Element => {
  const [contacts, setContacts] = useState<ContactList[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data.name && data.name === 'ContactList' && data.object.ContactList) {
        setContacts(data.object.ContactList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"ContactList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  const columns: Column[] = [
    {
      field: 'name',
      label: 'Фамилия Имя Отчество',
      linkBase: '/contacts/',
      linkField: 'id',
      className: 'w250',
    },
    {
      field: 'company_name',
      label: 'Организация',
      linkBase: '/compaines/',
      linkField: 'company_id',
      className: 'is-hidden-mobile w250',
    },
    { field: 'post_name', label: 'Должность', className: 'is-hidden-touch w250' },
    { field: 'phones', label: 'Телефоны', array: true, className: 'w95' },
    {
      field: 'faxes',
      label: 'Факсы',
      array: true,
      className: 'is-hidden-mobile w95',
    },
  ];

  return error ? <div>No data</div> : <TableData data={contacts} columns={columns} paginate={20} />;
};
