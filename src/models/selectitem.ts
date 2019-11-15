export type SelectItem = {
  id: number;
  name: string;
};

export const addEmptyStr = (values: string[] | undefined) => {
  let arr: string[] = [];
  if (values) {
    arr = values.filter(val => val !== '');
  }
  arr.push('');
  return arr;
};

export const numToStr = (values: number[] | undefined) => {
  let arr: string[] = [];
  if (values) {
    arr = values.map(val => val.toString());
  }
  return arr;
};
