import React, { useState, useEffect, FC } from 'react';

import { Table, Column } from '../../components/table';
import { ContactList } from '../../models/contact';
import { rws } from '../../netapi';

type CLWS = {
  name: string;
  object: {
    ContactList?: ContactList[];
  };
  error?: string;
};

export const Contacts: FC<{}> = () => {
  const [contacts, setContacts] = useState<ContactList[]>([]);
  const [hasError, setErrors] = useState<string>();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data.name && data.name === 'ContactList' && data.object.ContactList) {
        setContacts(data.object.ContactList);
      }
      if (data.error) {
        setErrors(data.error);
      }
    });
    rws.send('{"Get":{"List":"ContactList"}}');

    return function cleanup(): void {
      rws.removeEventListener('message', (message: unknown) => {
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
      className: 'w-1/3 p-2',
    },
    {
      field: 'company_name',
      label: 'Организация',
      linkBase: '/compaines/',
      linkField: 'company_id',
      className: 'w-1/3 hide-less-md p-2',
    },
    { field: 'post_name', label: 'Должность', className: 'w-1/3 hide-less-lg p-2' },
    { field: 'phones', label: 'Телефоны', array: true, className: 'w-24 p-2 text-right' },
    {
      field: 'faxes',
      label: 'Факсы',
      array: true,
      className: 'w-24 hide-less-lg p-2 text-right',
    },
  ];

  return hasError ? <div>No data</div> : <Table data={contacts} columns={columns} paginate={20} />;
};
