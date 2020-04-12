import React, { FC, useState, ChangeEvent } from 'react';

interface SearchProps {
  currentPage: number;
  lastPage: number;
  callback: (num: number) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<SearchProps> = (properties: SearchProps) => {
  const { currentPage, lastPage, callback, onChange } = properties;

  return <></>;
};
