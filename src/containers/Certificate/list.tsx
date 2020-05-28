import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SData, Search, Paginate, List } from '../../components/table';
import { splitNumbers, useInput, splitStrings } from '../../helpers/utils';
import { CertificateList, CertificateListJsonScheme } from '../../models/certificate';
import { rws } from '../../netapi';

export const Certificates = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { paginationData } = List({
    dataName: 'CertificateList',
    dataType: CertificateList,
    jsonType: CertificateListJsonScheme,
    jsonObject: data.object.CertificateList,
  });
  // const [filteredData, setFilteredData] = useState<CertificateList[]>([]);
  // const [search, changeSearch] = useInput('');
  // const [currentPage, setCurrentPage] = useState(0);
  // const [searchValues, setSearchValues] = useState<SData[]>([]);
  // const [filteredLength, setFilteredLength] = useState(0);
  // const [error, setError] = useState<string>();
  // const history = useHistory();

  // const itemsOnPage = 20;

  // useEffect(() => {
  //   rws.addEventListener('message', (message: MessageEvent) => {
  //     const data = JSON.parse(message.data) as CertificateListJsonScheme;
  //     if (data.name && data.name === 'CertificateList' && data.object.CertificateList) {
  //       setCertificates(data.object.CertificateList);
  //     }
  //     if (data.error) {
  //       setError(data.error);
  //     }
  //   });
  //   rws.send('{"Get":{"List":"CertificateList"}}');

  //   return (): void => {
  //     rws.removeEventListener('message', (message: MessageEvent) => {
  //       console.log('removeEventListener', message);
  //     });
  //   };
  // }, []);

  // useEffect(() => {
  //   const sv: SData[] = [];
  //   certificates.map((row, index): void => {
  //     let rowString = '';
  //     const values = Object.values(row);
  //     values.map((value): void => {
  //       if (value && typeof value !== 'number') {
  //         if (typeof value === 'string') {
  //           rowString += value;
  //         } else if (Array.isArray(value)) {
  //           rowString += value.join('');
  //         }
  //       }
  //     });
  //     sv.push({ id: index, data: rowString.toLowerCase() });
  //   });
  //   setSearchValues(sv);
  //   setFilteredData(certificates);
  //   setFilteredLength(certificates.length);
  // }, [certificates]);

  // useEffect(() => {
  //   if (search.length < 2) {
  //     const dataLength = certificates.length;
  //     if (filteredLength !== dataLength) {
  //       setFilteredData(certificates);
  //       setFilteredLength(dataLength);
  //     }
  //   } else {
  //     const searchArray = search.toLowerCase().split(' ');
  //     const temporaryFilteredData = certificates.filter((_, index) =>
  //       searchArray.every((value: string) => searchValues[index].data.includes(value)),
  //     );
  //     const temporaryFilteredLength = temporaryFilteredData.length;
  //     if (temporaryFilteredLength !== filteredLength) {
  //       if (currentPage > 1 && currentPage + 1 > Math.ceil(temporaryFilteredLength / itemsOnPage)) {
  //         setCurrentPage(Math.ceil(temporaryFilteredLength / itemsOnPage) - 1);
  //       }
  //       setFilteredData(temporaryFilteredData);
  //       setFilteredLength(temporaryFilteredLength);
  //     }
  //   }
  // }, [search]);

  // const paginationData = (): CertificateList[] => {
  //   return filteredData.slice(currentPage * itemsOnPage, (currentPage + 1) * itemsOnPage);
  // };

  const Body = (): JSX.Element => (
    <>
      {paginationData().map((certificate, index) => (
        <tr key={`tr${certificate.id}${index}`}>
          <td
            onClick={(): void => history.push(`/certificates/${certificate.id}`)}
            role="gridcell"
            className="link"
          >
            {certificate.num}
          </td>
          <td>{certificate.contact_name}</td>
          <td
            onClick={(): void => history.push(`/companies/${certificate.company_id || 0}`)}
            role="gridcell"
            className="is-hidden-mobile link"
          >
            {certificate.company_name}
          </td>
          <td>{certificate.cert_date}</td>
          <td className="is-hidden-mobile">{certificate.note}</td>
        </tr>
      ))}
    </>
  );

  return error ? (
    <></>
  ) : (
    <>
      {Search(search, changeSearch)}
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
      {Paginate(filteredLength, itemsOnPage, currentPage, setCurrentPage)}
    </>
  );
};
