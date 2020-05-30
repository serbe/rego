import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { splitNumbers } from '../../helpers/utils';
import { ContactList, ContactListJsonScheme } from '../../models/contact';
import { rws } from '../../netapi';

export const Contacts = (): JSX.Element => {
  const [data, setData] = useState<ContactList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();
  const history = useHistory();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): ContactList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as ContactListJsonScheme;
      if (data.name && data.name === 'ContactList' && data.object.ContactList) {
        setData(data.object.ContactList);
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

  const Body = (): JSX.Element => (
    <>
      {tableData().map((contact, index) => (
        <tr key={`tr${contact.id}${index}`}>
          <td
            onClick={(): void => history.push(`/contacts/${contact.id}`)}
            role="gridcell"
            className="w250 link"
          >
            {contact.name}
          </td>
          <td
            onClick={(): void => history.push(`/compaines/${contact.company_id || 0}`)}
            role="gridcell"
            className="is-hidden-mobile w250 link"
          >
            {contact.company_name}
          </td>
          <td className="is-hidden-touch w250">{contact.post_name}</td>
          <td className="w95">{splitNumbers(contact.phones)}</td>
          <td className="is-hidden-mobile w95">{splitNumbers(contact.faxes)}</td>
        </tr>
      ))}
    </>
  );

  return error ? (
    <></>
  ) : (
    <>
      {Search(search, setSearch)}
      <table className="table is-narrow">
        <tbody>
          <tr>
            <th className="w250">Фамилия Имя Отчество</th>
            <th className="is-hidden-mobile w250">Организация</th>
            <th className="is-hidden-touch w250">Должность</th>
            <th className="w95">Телефоны</th>
            <th className="is-hidden-mobile w95">Факсы</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
