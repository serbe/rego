import React, { useState, useEffect, FC } from 'react';
import { Table } from '../../components/table';
import { CertificateList } from '../../models/certificate';

export const Certificates: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [certificates, setCertificates] = useState<CertificateList[]>([]);

  async function fetchData() {
    const res = await fetch('/api/go/certificate/list');
    res
      .json()
      .then(res => setCertificates(res.data['CertificateList']))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: 'num',
      label: 'Номер',
      link_base: '/certificates/',
      link_field: 'id',
    },
    {
      field: 'contact_name',
      label: 'Фамилия Имя Отчество',
    },
    {
      field: 'company_name',
      label: 'Учебно-методический центр',
      link_base: '/companies/',
      link_field: 'company_id',
      class_name: 'is-hidden-mobile',
    },
    { field: 'cert_date', label: 'Дата' },
    {
      field: 'note',
      label: 'Заметка',
      class_name: 'is-hidden-mobile',
    },
  ];

  return hasError ? (
    <div>No data</div>
  ) : (
    <Table data={certificates} columns={columns} hoverable narrow striped paginate={20} />
  );
};
