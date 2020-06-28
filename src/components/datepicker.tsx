import React, { useEffect, useState } from 'react';

export type DatePickerValues = {
  value?: string;
  setter: (value?: string) => void;
};

interface DatePickerProps {
  label?: string;
  name: string;
  setter: (value: string) => void;
  value?: string;
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

export const DatePicker = (properties: DatePickerProps): JSX.Element => {
  const { name, value, setter, label } = properties;

  const [year, setYear] = useState(' ');
  const [month, setMonth] = useState(' ');
  const [day, setDay] = useState(' ');
  const [rawDate, setRawDate] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (value && value !== rawDate) {
      const values = value.split('-');
      if (values.length === 3) {
        setRawDate(value);
        setYear(values[0]);
        setMonth(values[1]);
        setDay(values[2]);
        setDate(new Date(Number(values[0]), Number(values[1]), 0));
      }
    }
  }, [rawDate, value]);

  useEffect(() => {
    const strdate = `${year}-${month}-${day}`;
    if (strdate !== rawDate) {
      setRawDate(strdate);
      setter(strdate);
    }
  }, [day, month, setter, rawDate, year]);

  return (
    <div className="field" key={name}>
      {label && (
        <label className="label" key="DateLabel">
          {label}
        </label>
      )}
      <div className="field has-addons">
        <div className="control">
          <div className="select">
            <select
              className="select"
              value={day}
              key={`${name}day`}
              onChange={(event) => setDay(event.target.value)}
              onBlur={(event) => setDay(event.target.value)}
            >
              {listDate(date).map((item, index) => (
                <option key={`${name}day-${index}`} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select
              className="select"
              value={month}
              key={`${name}month`}
              onChange={(event) => setMonth(event.target.value)}
              onBlur={(event) => setMonth(event.target.value)}
            >
              {listMonth().map((item, index) => (
                <option key={`${name}month-${index}`} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select
              className="select"
              value={year}
              key={`${name}year`}
              onChange={(event) => setYear(event.target.value)}
              onBlur={(event) => setYear(event.target.value)}
            >
              {listYears().map((item, index) => (
                <option key={`${name}year-${index}`} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
