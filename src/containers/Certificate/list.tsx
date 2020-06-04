import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { List, Search } from '../../components/table';
import { CertificateList, CertificateListJsonScheme } from '../../models/certificate';

export const Certificates = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<CertificateList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): CertificateList[] => {
    return paginationData();
  };

  useEffect(() => {
    const rws = new ReconnectingWebSocket('ws://127.0.0.1:9090');

    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as CertificateListJsonScheme;
      if (data.name && data.name === 'CertificateList' && data.object.CertificateList) {
        setData(data.object.CertificateList);
      }
      if (data.error) {
        setError(data.error);
      }
    });

    rws.addEventListener('open', () => {
      rws.send(`{"Get":{"List":"CertificateList"}}`);
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
