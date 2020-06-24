import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Data, Search } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { CertificateList } from '../../models/certificate';

export const Certificates = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('CertificateList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): CertificateList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((certificate, index) => (
        <tr key={`tr${certificate.id}${index}`}>
          <td
            onClick={(): void => history.push(`/certificates/${certificate.id}`)}
            role="gridcell"
            className="link nowrap"
          >
            {certificate.num}
          </td>
          <td
            onClick={(): void => history.push(`/contacts/${certificate.contact_id || 0}`)}
            role="gridcell"
            className="link"
          >
            {certificate.contact_name}
          </td>
          <td
            onClick={(): void => history.push(`/companies/${certificate.company_id || 0}`)}
            role="gridcell"
            className="is-hidden-mobile link"
          >
            {certificate.company_name}
          </td>
          <td className="nowrap">{certificate.cert_date}</td>
          <td className="is-hidden-mobile">{certificate.note}</td>
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
            <th>Номер</th>
            <th>Фамилия Имя Отчество</th>
            <th className="is-hidden-mobile">Учебно-методический центр</th>
            <th>Дата</th>
            <th className="is-hidden-mobile">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
