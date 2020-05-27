import React from 'react';
import { Pagination } from './pagination';
import { Input } from './input';

export type SData = {
  id: number;
  data: string;
};

export const Search = (
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
): JSX.Element => (
  <p className="control mb1 mwt" key="TableSearch">
    <Input
      name="search"
      className="input is-expanded"
      placeholder="Поиск"
      onChange={onChange}
      value={value}
    />
  </p>
);

export const Paginate = (
  fLength: number,
  itemsOnPage: number,
  currentPage: number,
  setCurrentPage: (value: number) => void,
): JSX.Element => {
  const receiveChildValue = (value: number): void => {
    setCurrentPage(value - 1);
  };
  return fLength / itemsOnPage > 2 ? (
    <Pagination
      currentPage={currentPage + 1}
      lastPage={Math.ceil(fLength / itemsOnPage)}
      callback={receiveChildValue}
    />
  ) : (
    <></>
  );
};
