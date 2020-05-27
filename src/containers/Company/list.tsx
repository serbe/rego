import React, { useState, useEffect } from 'react';

// import { Table, Column } from '../../components/table';
import { CompanyList } from '../../models/company';
import { rws } from '../../netapi';

type CLWS = {
  name: string;
  object: {
    CompanyList?: CompanyList[];
  };
  error?: string;
};

export const Companies = (): JSX.Element => {
  const [companies, setCompanies] = useState<CompanyList[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as CLWS;
      if (data.name && data.name === 'CompanyList' && data.object.CompanyList) {
        setCompanies(data.object.CompanyList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"CompanyList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

  // const columns: Column[] = [
  //   {
  //     field: 'name',
  //     label: 'Наименование',
  //     linkBase: '/companies/',
  //     linkField: 'id',
  //     className: 'w250',
  //   },
  //   {
  //     field: 'address',
  //     label: 'Адрес',
  //     className: 'w250 is-hidden-touch',
  //   },
  //   {
  //     field: 'scope_name',
  //     label: 'Сфера деятельности',
  //     className: 'w250 is-hidden-mobile',
  //   },
  //   { field: 'phones', label: 'Телефоны', array: true, className: 'w95' },
  //   {
  //     field: 'faxes',
  //     label: 'Факсы',
  //     array: true,
  //     className: 'is-hidden-touch w95',
  //   },
  //   {
  //     field: 'practices',
  //     label: 'Тренировки',
  //     array: true,
  //     className: 'is-hidden-touch is-hidden-desktop-only w95',
  //   },
  // ];

  return error ? (
    <div>No data</div>
  ) : (
    <div className="">{/* <Table data={companies} columns={columns} paginate={20} /> */}</div>
  );
};
