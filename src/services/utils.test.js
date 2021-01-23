import {
  addEmptyString,
  filterArrayNumber,
  filterArrayString,
  numberToString,
  latrus,
} from './utils';

test('filterArrayString: remove empty items', () => {
  const result = filterArrayString(['1', '', '2', '']);
  expect(result).toHaveLength(2);
  expect(result[0]).toBe('1');
  expect(result[1]).toBe('2');
  expect(result).toEqual(expect.not.arrayContaining(['']));
});

test('filterArrayNumber: convert strings to numbers and remove 0', () => {
  const result = filterArrayNumber(['1', '', '2', '', '0']);
  expect(result).toHaveLength(2);
  expect(result[0]).toBe(1);
  expect(result[1]).toBe(2);
  expect(result).toEqual(expect.not.arrayContaining([0]));
});

test('addEmptyString: remove empty items and add empty string to end of array', () => {
  const result = addEmptyString(['1', '', '2']);
  expect(result).toHaveLength(3);
  expect(result[0]).toBe('1');
  expect(result[1]).toBe('2');
  expect(result[2]).toBe('');

  const result2 = addEmptyString();
  expect(result2).toHaveLength(1);
  expect(result2[0]).toBe('');
});

test('numberToString: convert numbers to strings', () => {
  const result = numberToString([1, 2, 0]);
  expect(result).toHaveLength(3);
  expect(result[0]).toBe('1');
  expect(result[1]).toBe('2');
  expect(result[2]).toBe('0');
});

test('latrus: convert latin to cyrillic', () => {
  expect(latrus('qwe')).toBe('йцу');
  expect(latrus('qwertyuiop[]asdfghjkl;\'zxcvbnm,.QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>')).toBe(
    'йцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ',
  );
});
