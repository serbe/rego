import React, { useState, useEffect, FC } from 'react';

// import { Table } from '../../components/table';
import { CertificateList } from '../../models/certificate';
// import { fetchData } from '../../helpers/utils';

export const Certificates: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [certificates, setCertificates] = useState<CertificateList[]>([]);

  // useEffect(() => {
  //   fetchData('/api/go/certificate/list')
  //     .then((response) =>
  //       response.CertificateList ? setCertificates(response.CertificateList) : setErrors(true),
  //     )
  //     .catch((error) => setErrors(error));
  // }, []);

  const columns = [
    {
      field: 'num',
      label: 'Номер',
      linkBase: '/certificates/',
      linkField: 'id',
    },
    {
      field: 'contact_name',
      label: 'Фамилия Имя Отчество',
    },
    {
      field: 'company_name',
      label: 'Учебно-методический центр',
      linkBase: '/companies/',
      linkField: 'company_id',
      className: 'is-hidden-mobile',
    },
    { field: 'cert_date', label: 'Дата' },
    {
      field: 'note',
      label: 'Заметка',
      className: 'is-hidden-mobile',
    },
  ];

  return hasError ? (
    <div>No data</div>
  ) : (
    // <Table data={certificates} columns={columns} hoverable narrow striped paginate={20} />
    <div></div>
  );
};
