import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { Pagination } from '../../components/pagination';
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
  const [hasError, setErrors] = useState<string>();
  const [currentPage, setCurrentPage] = useState(0);
  const [contacts, setContacts] = useState<ContactList[]>([]);

  const search = '';
  let filteredLength = 0;
  const itemsOnPage = 20;

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

  const filteredData = (): ContactList[] => {
    if (search !== '') {
      filteredLength = contacts.length;
      return contacts;
    }
    const sliceData = contacts.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
    filteredLength = contacts.length;
    return sliceData;
  };

  const receiveChildValue = (value: number): void => {
    setCurrentPage(value - 1);
  };

  const Paginate = (): JSX.Element | null =>
    filteredLength / itemsOnPage > 2 ? (
      <Pagination
        currentPage={currentPage + 1}
        lastPage={Math.ceil(filteredLength / itemsOnPage)}
        callback={receiveChildValue}
      />
    ) : null;

  const Table = (): JSX.Element | null => (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="w-1/4 px-4 py-2">Фамилия Имя Отчество</th>
          <th className="w-1/4 px-4 py-2">Организация</th>
          <th className="xl:w-1/4 sm:hidden px-4 py-2">Должность</th>
          <th className="w-16 px-4 py-2">Телефоны</th>
          <th className="lg:w-16 hidden px-4 py-2">Факсы</th>
        </tr>
      </thead>
    </table>
  );

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

  return hasError ? <div>No data</div> : <Table />;
};
