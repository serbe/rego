import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { CertificateList, CertificateListJsonScheme } from '../../models/certificate';
import { rws } from '../../netapi';

export const Certificates = (): JSX.Element => {
  const [data, setData] = useState<CertificateList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();
  const history = useHistory();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): CertificateList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as CertificateListJsonScheme;
      if (data.name && data.name === 'CertificateList' && data.object.CertificateList) {
        setData(data.object.CertificateList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send(`{"Get":{"List":"CertificateList"}}`);

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

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
      {Search(search, setSearch)}
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
