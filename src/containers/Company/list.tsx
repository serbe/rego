import React, { useState, useEffect, FC } from 'react';

import { Table, Column } from '../../components/table';
import { CompanyList } from '../../models/company';
import { rws } from '../../netapi';

type CLWS = {
  name: string;
  object: {
    CompanyList?: CompanyList[];
  };
  error?: string;
};

export const Companies: FC<{}> = () => {
  const [companies, setCompanies] = useState<CompanyList[]>([]);
  const [hasError, setErrors] = useState<string>();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data.name && data.name === 'CompanyList' && data.object.CompanyList) {
        setCompanies(data.object.CompanyList);
      }
      if (data.error) {
        setErrors(data.error);
      }
    });
    rws.send('{"Get":{"List":"CompanyList"}}');

    return function cleanup(): void {
      rws.removeEventListener('message', (message: unknown) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  const columns: Column[] = [
    {
      field: 'name',
      label: 'Наименование',
      linkBase: '/companies/',
      linkField: 'id',
      className: 'w-1/3 p-2',
    },
    {
      field: 'address',
      label: 'Адрес',
      className: 'w-1/3 hide-less-md p-2',
    },
    {
      field: 'scope_name',
      label: 'Сфера деятельности',
      className: 'w-1/3 hide-less-lg p-2',
    },
    { field: 'phones', label: 'Телефоны', array: true, className: 'w-24 p-2 text-right' },
    {
      field: 'faxes',
      label: 'Факсы',
      array: true,
      className: 'w-24 hide-less-lg p-2 text-right',
    },
    {
      field: 'practices',
      label: 'Тренировки',
      array: true,
      className: 'w-24 hide-less-lg p-2',
    },
  ];

  return hasError ? (
    <div>No data</div>
  ) : (
    <div className="">
      <Table data={companies} columns={columns} paginate={20} />
    </div>
  );
};
