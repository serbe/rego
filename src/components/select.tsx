import './select.css';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { GetSelect, SelectItem } from '../helpers/fetcher';
import { Icon } from './icon';

export interface SelectValues {
  id?: number;
  setter: (event?: number) => void;
}

interface SelectProps {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
  id?: number;
  label?: string;
  listName: string;
  name: string;
  setter: (event?: number) => void;
}

export const Select = (properties: SelectProps): JSX.Element => {
  const { name, id, label, icon, color, listName, setter } = properties;

  const [opened, setOpened] = useState(false);
  const [itemID, setItemID] = useState(id || 0);
  const [list, error] = GetSelect(listName);
  const [value, setValue] = useState<string>();
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    setItemID(id || 0);
  }, [id]);

  useEffect(() => {
    if (list[0].id !== 0) {
      list.unshift({ id: 0, name: '' });
    }
    if (!id && itemID === 0) {
      setValue('');
    } else {
      const currentItem = list.find((item) => item.id === id);
      setValue(currentItem?.name || '');
    }
  }, [list, id, itemID]);

  useEffect(() => {
    if (opened) {
      setCurrentValue(value || '');
    } else {
      const currentItem = list.find((item) => item.id === itemID);
      setCurrentValue(currentItem?.name || '');
    }
  }, [itemID, list, opened, value]);

  const filteredList = (): SelectItem[] => {
    if (currentValue.trim().length === 0) {
      return list;
    }

    const inputArray = currentValue.split(' ');

    return list.filter(
      (listItem) =>
        listItem.name === '' ||
        inputArray.every((value: string) => new RegExp(value, 'i').exec(listItem.name)),
    );
  };

  return (
    <div className="field" key={name}>
      {label && (
        <label className="label" key="SelectLabel">
          {label}
        </label>
      )}
      <div
        className={`control is-expanded select is-fullwidth ${icon ? 'has-icons-left' : ''}`}
        key={`${name}-control`}
      >
        <input
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          className={`input ${color ? `is-${color}` : ''}`}
          name={name}
          type="text"
          value={currentValue}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setValue(event.target.value);
          }}
          onFocus={(): void => {
            setOpened(true);
          }}
          onBlur={(): void => {
            setTimeout(() => setOpened(false), 300);
          }}
          key={`${name}-input`}
        />
        {icon && (
          <Icon
            color={color !== 'primary' ? color : undefined}
            icon={icon}
            key="SelectIconLeft"
            position="left"
          />
        )}
      </div>
      {!error && opened && (
        <div className="select-box" key={`${name}-dropdown`}>
          {filteredList().map((ListItem, index) => (
            <div
              className="select-item"
              key={`${name}-${index}`}
              onMouseDown={(): void => {
                setItemID(ListItem.id);
                setValue(ListItem.name);
                setter(ListItem.id === 0 ? undefined : ListItem.id);
              }}
              role="row"
              tabIndex={index}
            >
              {ListItem.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
