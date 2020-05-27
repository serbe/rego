import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SData, Search, Paginate } from '../../components/table';
import { ContactList } from '../../models/contact';
import { splitNumbers, useInput } from '../../helpers/utils';
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
  const [filteredData, setFilteredData] = useState<ContactList[]>([]);
  const [search, changeSearch] = useInput('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValues, setSearchValues] = useState<SData[]>([]);
  const [filteredLength, setFilteredLength] = useState(0);
  const [error, setError] = useState<string>();
  const history = useHistory();

  const itemsOnPage = 20;

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as CLWS;
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

  useEffect(() => {
    const sv: SData[] = [];
    contacts.map((row, index): void => {
      let rowString = '';
      const values = Object.values(row);
      values.map((value): void => {
        if (value && typeof value !== 'number') {
          if (typeof value === 'string') {
            rowString += value;
          } else if (Array.isArray(value)) {
            rowString += value.join('');
          }
        }
      });
      sv.push({ id: index, data: rowString.toLowerCase() });
    });
    setSearchValues(sv);
    setFilteredData(contacts);
    setFilteredLength(contacts.length);
  }, [contacts]);

  useEffect(() => {
    if (search.length < 2) {
      const dataLength = contacts.length;
      if (filteredLength !== dataLength) {
        setFilteredData(contacts);
        setFilteredLength(dataLength);
      }
    } else {
      const searchArray = search.toLowerCase().split(' ');
      const temporaryFilteredData = contacts.filter((_, index) =>
        searchArray.every((value: string) => searchValues[index].data.includes(value)),
      );
      const temporaryFilteredLength = temporaryFilteredData.length;
      if (temporaryFilteredLength !== filteredLength) {
        if (currentPage > 1 && currentPage + 1 > Math.ceil(temporaryFilteredLength / itemsOnPage)) {
          setCurrentPage(Math.ceil(temporaryFilteredLength / itemsOnPage) - 1);
        }
        setFilteredData(temporaryFilteredData);
        setFilteredLength(temporaryFilteredLength);
      }
    }
  }, [search]);

  const paginationData = (): ContactList[] => {
    return filteredData.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
  };

  const Body = (): JSX.Element => (
    <>
      {paginationData().map((contact, index) => (
        <tr key={`tr${contact.id}${index}`}>
          <td
            onClick={(): void => history.push(`/contacts/${contact.id}`)}
            role="gridcell"
            className="w250"
          >
            {contact.name}
          </td>
          <td
            onClick={(): void => history.push(`/compaines/${contact.company_id || 0}`)}
            role="gridcell"
            className="is-hidden-mobile w250"
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

  // <Table data={contacts} columns={columns} paginate={20} />
  return error ? (
    <></>
  ) : (
    <>
      {Search(search, changeSearch)}
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
      {Paginate(filteredLength, itemsOnPage, currentPage, setCurrentPage)}
    </>
  );
};
