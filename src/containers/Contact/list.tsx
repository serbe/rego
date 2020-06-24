import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Data, Search } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { splitNumbers } from '../../helpers/utils';
import { ContactList } from '../../models/contact';

export const Contacts = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('ContactList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): ContactList[] => {
    return paginationData();
  };

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
