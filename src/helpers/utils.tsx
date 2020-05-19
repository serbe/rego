import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export function useFormFields<T>(
  initialValues: T,
): {
  formFields: T;
  handleChange: (key: keyof T) => (event: ChangeEvent<HTMLInputElement>) => void;
} {
  const [formFields, setFormFields] = useState<T>(initialValues);
  const handleChange = (key: keyof T) => (event: ChangeEvent<HTMLInputElement>): void =>
    setFormFields((previous: T) => ({ ...previous, [key]: event.target.value }));
  return { formFields, handleChange };
}

export function useInput(
  initialValue: string,
): [string, (event: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState(initialValue);
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }
  return [value, handleChange, setValue];
}

export function useID(initialValue: number): [number, Dispatch<SetStateAction<number>>] {
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}

export function stringNoNull(value?: string): string {
  return value ? value : '';
}

export function numberNoNull(value?: number): number {
  return value ? value : 0;
}

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
