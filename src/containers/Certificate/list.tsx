import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { CertificateList } from '../../models/certificate';
import { GetList } from '../../services/fetcher';

export const Certificates = (): JSX.Element => {
  const history = useHistory();
  const data = GetList('CertificateList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data,
    search,
  });

  const tableData = (): CertificateList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((certificate) => (
        <tr key={`tr${certificate.id}`}>
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
        </tr>
      ))}
    </>
  );

  return (
    <>
      <Bar value={search} setter={setSearch} name="certificates" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Номер</th>
            <th>Фамилия Имя Отчество</th>
            <th className="is-hidden-mobile">Учебно-методический центр</th>
            <th>Дата</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
