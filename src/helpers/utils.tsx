import React from 'react';

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
    {items
      ? items.map((arrayItem: string, index: number) => <div key={`div${index}`}>{arrayItem}</div>)
      : undefined}
  </>
);

export const splitNumbers = (items?: number[]): JSX.Element => (
  <>
    {items
      ? items.map((arrayItem: number, index: number) => <div key={`div${index}`}>{arrayItem}</div>)
      : undefined}
  </>
);
