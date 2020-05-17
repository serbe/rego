import React, { memo, useEffect, useState } from 'react';

interface DatePickerProps {
  name: string;
  value?: string;
  callback: (value: string) => void;
  label?: string;
}

const listDate = (date: Date): string[] => {
  const days = date.getDate();
  const list = [' '];
  for (let i = 1; i <= days; i += 1) {
    list.push(i.toString().length === 1 ? `0${i}` : i.toString());
  }
  return list;
};

const listMonth = (): string[] => {
  const list = [' '];
  for (let i = 1; i < 13; i += 1) {
    list.push(i.toString().length === 1 ? `0${i}` : i.toString());
  }
  return list;
};

const listYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  const list = [' '];
  for (let i = currentYear; i > currentYear - 100; i -= 1) {
    list.push(i.toString());
  }
  return list;
};

export const NoMemoDatePicker = (properties: DatePickerProps): JSX.Element => {
  const { name, value, callback, label } = properties;

  const [year, setYear] = useState(() => ' ');
  const [month, setMonth] = useState(() => ' ');
  const [day, setDay] = useState(() => ' ');
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    if (value) {
      const values = value.split('-');
      if (values.length === 3) {
        setYear(values[0]);
        setMonth(values[1]);
        setDay(values[2]);
        setDate(new Date(Number(values[0]), Number(values[1]), 0));
      }
    }
  }, [value]);

  const handleChangeDay = (newday: string): void => {
    setDay(newday);
    const strdate = `${year}-${month}-${newday}`;
    if (strdate.length === 10) callback(strdate);
  };

  const handleChangeMonth = (newmonth: string): void => {
    setMonth(newmonth);
    const strdate = `${year}-${newmonth}-${day}`;
    if (strdate.length === 10) callback(strdate);
  };

  return (
    <div className="field" key={name}>
      {label && (
        <label className="label" key="DateLabel">
          {label}
        </label>
      )}
      <div className="field has-addons">
        <p className="control">
          <span className="select">
            <select className="select" value={day} key={`${name}day`}>
              {listDate(date).map((item, index) => (
                <option
                  key={`${name}day-${index}`}
                  value={item}
                  onSelect={(): void => handleChangeDay(item)}
                >
                  {item}
                </option>
              ))}
            </select>
          </span>
        </p>
        <p className="control">
          <span className="select">
            <select className="select" value={month} key={`${name}month`}>
              {listMonth().map((item, index) => (
                <option
                  key={`${name}month-${index}`}
                  onSelect={(): void => handleChangeMonth(item)}
                >
                  {item}
                </option>
              ))}
            </select>
          </span>
        </p>
        <p className="control">
          <span className="select">
            <select className="select" value={year} key={`${name}year`}>
              {listYears().map((item, index) => (
                <option key={`${name}year-${index}`} onSelect={(): void => setYear(item)}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </p>
      </div>
    </div>
  );
};

export const DatePicker = memo(NoMemoDatePicker);
