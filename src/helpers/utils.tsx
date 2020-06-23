import React from 'react';

export const URL = 'http://127.0.0.1:9090/';

type getProperties = {
  id?: number;
  name: string;
};

// export const getList = (name: string) =>

// export const getItem = (id: number, name: string) => {
//   const body = properties.id
//     ? JSON.stringify({ Get: { Item: { name: properties.name, id: properties.id } } })
//     : JSON.stringify({ Get: { List: properties.name } });
//   fetch(URL, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       accept: 'application/json',
//     },
//     body: body,
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// , { ChangeEvent, Dispatch, SetStateAction, useState }

// export function useFormFields<T>(
//   initialValues: T,
// ): {
//   formFields: T;
//   handleChange: (key: keyof T) => (event: ChangeEvent<HTMLInputElement>) => void;
// } {
//   const [formFields, setFormFields] = useState<T>(initialValues);
//   const handleChange = (key: keyof T) => (event: ChangeEvent<HTMLInputElement>): void =>
//     setFormFields((previous: T) => ({ ...previous, [key]: event.target.value }));
//   return { formFields, handleChange };
// }

// export function useInput(
//   initialValue: string,
// ): [string, (event: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<string>>] {
//   const [value, setValue] = useState(initialValue);
//   function handleChange(event: ChangeEvent<HTMLInputElement>): void {
//     setValue(event.target.value);
//   }
//   return [value, handleChange, setValue];
// }

// export function useID(initialValue: number): [number, Dispatch<SetStateAction<number>>] {
//   const [value, setValue] = useState(initialValue);
//   return [value, setValue];
// }

export function stringNoNull(value?: string): string {
  return value || '';
}

export function numberNoNull(value?: number): number {
  return value || 0;
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
