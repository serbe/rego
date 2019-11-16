export type Column = {
  field: string;
  label?: string;
  witdh?: string;
  array?: boolean;
  linkBase?: string;
  linkField?: string;
  className?: string;
};

export const addEmptyStr = (values: string[] | undefined): string[] => {
  let arr: string[] = [];
  if (values) {
    arr = values.filter(val => val !== '');
  }
  arr.push('');
  return arr;
};

export const numToStr = (values: number[] | undefined): string[] => {
  let arr: string[] = [];
  if (values) {
    arr = values.map(val => val.toString());
  }
  return arr;
};
