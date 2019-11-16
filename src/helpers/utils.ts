export const addEmptyString = (values: string[] | undefined): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.filter(value => value !== '');
  }
  list.push('');
  return list;
};

export const numberToString = (values: number[] | undefined): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.map(value => value.toString());
  }
  return list;
};

export async function fetchData(uri: string): Promise<any> {
  try {
    const response = await fetch(uri);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error;
  }
}