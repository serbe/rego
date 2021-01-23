export const filterArrayString = (values: string[]): string[] => {
  return values.filter((value: string) => value !== '');
};

export const filterArrayNumber = (values: string[]): number[] => {
  return values.map((value: string) => Number(value)).filter((value: number) => value !== 0);
};

export const latrus = (str: string): string => {
  const lat = [
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    '[',
    ']',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    '\\',
    "'",
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    ',',
    '.',
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    '{',
    '}',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    ':',
    '"',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<',
    '>',
  ];
  const rus = [
    'й',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ъ',
    'ф',
    'ы',
    'в',
    'а',
    'п',
    'р',
    'о',
    'л',
    'д',
    'ж',
    'э',
    'я',
    'ч',
    'с',
    'м',
    'и',
    'т',
    'ь',
    'б',
    'ю',
    'Й',
    'Ц',
    'У',
    'К',
    'Е',
    'Н',
    'Г',
    'Ш',
    'Щ',
    'З',
    'Х',
    'Ъ',
    'Ф',
    'Ы',
    'В',
    'А',
    'П',
    'Р',
    'О',
    'Л',
    'Д',
    'Ж',
    'Э',
    'Я',
    'Ч',
    'С',
    'М',
    'И',
    'Т',
    'Ь',
    'Б',
    'Ю',
  ];
  let word = '';
  for (let i = 0, L = str.length; i < L; i++) {
    const letter = str[i];
    // if (mode=="lat") {
    //     for (var j=0, L=rus.length; j<L; j++) {
    //         if(rus[j]==letter) {word+=lat[j]}
    //     }
    // }
    // if (mode=="rus") {
    for (let j = 0, L = rus.length; j < L; j++) {
      if (lat[j] === letter) {
        word += rus[j];
      }
    }
    // }
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
      items.map((arrayItem: number, index: number) => <div key={`div${index}`}>{arrayItem}</div>)}
  </>
);
