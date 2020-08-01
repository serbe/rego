import { filterArrayString } from './utils';

test('filterArrayString: remove empty items', () => {
  const result = filterArrayString(['1', '', '2', '']);
  expect(result).toHaveLength(2);
  expect(result[0]).toBe('1');
  expect(result[1]).toBe('2');
});
