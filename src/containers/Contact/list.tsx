import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { List, Search } from '../../components/table';
import { splitNumbers } from '../../helpers/utils';
import { ContactList, ContactListJsonScheme } from '../../models/contact';

export const Contacts = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<ContactList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): ContactList[] => {
    return paginationData();
  };

  useEffect(() => {
    const rws = new ReconnectingWebSocket('ws://127.0.0.1:9090');

    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as ContactListJsonScheme;
      if (data.name && data.name === 'ContactList' && data.object.ContactList) {
        setData(data.object.ContactList);
      }
      if (data.error) {
        setError(data.error);
      }
    });

    rws.addEventListener('open', () => {
      rws.send('{"Get":{"List":"ContactList"}}');
    });

    rws.onclose = () => {
      rws.close();
    };

    return (): void => {
      rws.close();
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
      <Search value={search} setter={setSearch} />
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
