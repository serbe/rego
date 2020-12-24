import React from 'react';

export const filterArrayString = (values: string[]): string[] => {
  return values.filter((value: string) => value !== '');
};

export const filterArrayNumber = (values: string[]): number[] => {
  return values.map((value: string) => Number(value)).filter((value: number) => value !== 0);
};

// export const stringNoNull = (value?: string): string => {
//   return value || '';
// };

// export const numberNoNull = (value?: number): number => {
//   return value || 0;
// };

export const addEmptyString = (values?: string[]): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.filter((value) => value !== '');
  }
  list.push('');
  return list;
};

export const numberToString = (values?: number[]): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.map((value) => value.toString());
  }
  return list;
};

export const splitStrings = (items?: string[]): JSX.Element => (
  <>
    {items &&
      items.map((arrayItem: string, index: number) => <div key={`div${index}`}>{arrayItem}</div>)}
  </>
);

export const splitNumbers = (items?: number[]): JSX.Element => (
  <>
    {items &&
      items.map((arrayItem: number, index: number) => <div key={`div${index}`}>{arrayItem}</div>)}
  </>
);
