import React from 'react';

export const addEmptyString = (values: string[] | undefined): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.filter((value) => value !== '');
  }
  list.push('');
  return list;
};

export const numberToString = (values: number[] | undefined): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.map((value) => value.toString());
  }
  return list;
};

export const splitStrings = (items: string[] | undefined): JSX.Element => (
  <>
    {items
      ? items.map((arrayItem: string, index: number) => <div key={`div${index}`}>{arrayItem}</div>)
      : undefined}
  </>
);

export const splitNumbers = (items: number[] | undefined): JSX.Element => (
  <>
    {items
      ? items.map((arrayItem: number, index: number) => <div key={`div${index}`}>{arrayItem}</div>)
      : undefined}
  </>
);
