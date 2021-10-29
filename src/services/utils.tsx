export const filterArrayString = (values: string[]): string[] => {
  return values.filter((value: string) => value !== '');
};

export const filterArrayNumber = (values: string[]): number[] => {
  return values.map((value: string) => Number(value)).filter((value: number) => value !== 0);
};

export const latrus = (str: string): string => {
  const lat = '`qwertyuiop[]asdfghjkl;\'zxcvbnm,.~QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>';
  const rus = 'ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
  let word = '';
  for (let i = 0, L = str.length; i < L; i++) {
    const letter = str[i];
    const pos = lat.indexOf(letter);
    if (i === 0 && pos === -1) {
      return '';
    }
    word += pos === -1 ? letter : rus[pos];
  }
  return word;
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
      items.map((arrayItem: number, index: number) => (
        <div key={`div${index}`}>{prettyPhone(arrayItem.toString(10))}</div>
      ))}
  </>
);

export const diffMonth = (month: number, date?: Date): Date => {
  const newDate = date || new Date();
  newDate.setMonth(newDate.getMonth() - month);
  return newDate;
};

export const prettyPhone = (phone: string): string => {
  if (phone.length > 0) {
    phone = phone.replace(/[^0-9]/g, '');
    if (phone.length === 10) {
      phone = phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7-$1-$2-$3-$4');
    }
    if (phone.length === 11) {
      if (phone[0] === '8') {
        phone = `7${phone.slice(1)}`;
      }
      phone = phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1-$2-$3-$4-$5');
    }
    if (phone.length === 7) {
      phone = phone.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
    }
  }
  return phone;
};

export const trClass = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (date < new Date()) {
    return 'tr-green';
  }
  const newDate = diffMonth(1);
  if (date < newDate) {
    return 'tr-red';
  }
  return 'tr-yellow';
};

export const tinyDate = (date: string): string => {
  if (date.length === 10) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
  }
  return date;
};
