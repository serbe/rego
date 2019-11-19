import React, { useState, useEffect, FC } from 'react';

import { Table, Column } from '../../components/table';
import { CompanyList } from '../../models/company';
import { fetchData } from '../../helpers/utils';

export const Companies: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [companies, setCompanies] = useState<CompanyList[]>([]);

  useEffect(() => {
    fetchData('/api/go/company/list')
      .then(response =>
        response.CompanyList ? setCompanies(response.CompanyList) : setErrors(true),
      )
      .catch(error => setErrors(error));
  }, []);

  const isHiddenTouch = 'is-hidden-touch';
  const columns: Column[] = [
    {
      field: 'name',
      label: 'Наименование',
      linkBase: '/companies/',
      linkField: 'id',
    },
    {
      field: 'address',
      label: 'Адрес',
      className: isHiddenTouch,
    },
    {
      field: 'scope_name',
      label: 'Сфера деятельности',
      className: 'is-hidden-mobile',
    },
    { field: 'phones', label: 'Телефоны', array: true },
    {
      field: 'faxes',
      label: 'Факсы',
      array: true,
      className: isHiddenTouch,
    },
    {
      field: 'practices',
      label: 'Тренировки',
      array: true,
      className: isHiddenTouch,
    },
  ];

  return hasError ? (
    <div>No data</div>
  ) : (
    <div className="">
      <Table data={companies} columns={columns} hoverable narrow striped paginate={20} />
    </div>
  );
};
