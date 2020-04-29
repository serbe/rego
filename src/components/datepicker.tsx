import React, { useState, useEffect } from 'react';

interface DatePickerProps {
  value?: string;
  callback: (value: string) => void;
  label?: string;
}

export const DatePicker = (properties: DatePickerProps): JSX.Element => {
  const { value, callback, label } = properties;

  const [year, setYear] = useState(' ');
  const [month, setMonth] = useState(' ');
  const [day, setDay] = useState(' ');

  useEffect(() => {
    const date = `${year}-${month}-${day}`;
    callback(date);
  }, [callback, day, month, year]);

  useEffect(() => {
    if (value) {
      const values = value.split('-');
      if (values.length === 3) {
        setYear(values[0]);
        setMonth(values[1]);
        setDay(values[2]);
      }
    }
  }, [value]);

  const Label = (): JSX.Element | null =>
    label ? (
      <label className="label" key="DateLabel">
        {label}
      </label>
    ) : null;

  const Days = (): JSX.Element => {
    const days = new Date(Number(year), Number(month), 0).getDate();
    const list = [' '];
    for (let i = 1; i <= days; i += 1) {
      list.push(i.toString().length === 1 ? `0${i}` : i.toString());
    }
    return (
      <select>
        {list.map((item) => (
          <option
            key={item}
            selected={item === day}
            value={item}
            onSelect={(): void => setDay(item)}
          >
            {item}
          </option>
        ))}
      </select>
    );
  };

  const Months = (): JSX.Element => {
    const list = [' '];
    for (let i = 1; i < 13; i += 1) {
      list.push(i.toString().length === 1 ? `0${i}` : i.toString());
    }
    return (
      <select>
        {list.map((item) => (
          <option key={item} selected={item === month} onSelect={(): void => setMonth(item)}>
            {item}
          </option>
        ))}
      </select>
    );
  };

  const Years = (): JSX.Element => {
    const currentYear = new Date().getFullYear();
    const list = [' '];
    for (let i = currentYear; i > currentYear - 100; i -= 1) {
      list.push(i.toString());
    }
    return (
      <select>
        {list.map((item) => (
          <option key={item} selected={item === year} onSelect={(): void => setYear(item)}>
            {item}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="field">
      <Label />
      <div className="field has-addons">
        <p className="control">
          <span className="select">
            <Days />
          </span>
        </p>
        <p className="control">
          <span className="select">
            <Months />
          </span>
        </p>
        <p className="control">
          <span className="select">
            <Years />
          </span>
        </p>
      </div>
    </div>
  );
};
