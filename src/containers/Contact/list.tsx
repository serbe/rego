import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { Pagination } from '../../components/pagination';
import { ContactList } from '../../models/contact';
import { splitNumbers } from '../../helpers/utils';
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

  const Table = (): JSX.Element => (
    <table className="table-fixed mx-auto">
      <thead>
        <tr>
          <th className="w-64 p-2">Фамилия Имя Отчество</th>
          <th className="w-64 hide-less-md p-2">Организация</th>
          <th className="w-64 hide-less-lg p-2">Должность</th>
          <th className="w-32 p-2">Телефоны</th>
          <th className="w-32 hide-less-lg p-2">Факсы</th>
        </tr>
      </thead>
      <TBody />
      <Paginate />
    </table>
  );

  const TBody = (): JSX.Element | null => (
    <tbody>
      {filteredData().map(
        (row: ContactList, index: number): JSX.Element => (
          <tr key={`tr${row.id}${index}`}>
            <td className="w-1/3 p-2">
              <Link to={`/contacts/${row.id}`}>{row.name}</Link>
            </td>
            <td className="w-1/3 hide-less-md p-2">
              <Link to={`/compaines/${row.company_id}`}>{row.company_name}</Link>
            </td>
            <td className="w-1/3 hide-less-lg p-2">{row.post_name}</td>
            <td className="w-24 p-2 text-right">{splitNumbers(row.phones)}</td>
            <td className="w-24 hide-less-lg p-2 text-right">{splitNumbers(row.faxes)}</td>
          </tr>
        ),
      )}
    </tbody>
  );

  return hasError ? <div>No data</div> : <Table />;
};
