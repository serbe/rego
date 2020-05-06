import React, { useState, useEffect } from 'react';

import { Icon } from './icon';
import { SelectItem } from '../models/selectitem';
import { rws } from '../netapi';

import './select.css';

interface SelectProps {
  name?: string;
  id?: number;
  icon?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  // state?: string;
  label?: string;
  listName?: string;
  callback: (event: number) => void;
}

type CLWS = {
  name: string;
  object: {
    SelectItem?: SelectItem[];
  };
  error?: string;
};

export const Select = (properties: SelectProps): JSX.Element => {
  const { name, id, label, icon, color, listName, callback } = properties;

  const [opened, setOpened] = useState(false);
  const [itemID, setItemID] = useState(id ? id : 0);
  const [list, setList] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data?.name === listName && data.object.SelectItem && data.object.SelectItem.length > 0) {
        setList(data.object.SelectItem);
      }

      if (data.error) {
        setError(data.error);
      }
    });
    rws.send(`{"Get":{"List":"${listName}"}}`);

    return function cleanup(): void {
      rws.removeEventListener('message', (message: unknown) => {
        console.log('removeEventListener', message);
      });
    };
  }, [listName]);

  useEffect(() => {
    if (list[0].id !== 0) {
      list.unshift({ id: 0, name: '' });
    }
    if (!id && id === 0) {
      setValue('');
    } else {
      const currentItem = list.find((item) => item.id === id);
      setValue(currentItem ? currentItem.name : '');
    }
  }, [list, id]);

  const Label = (): JSX.Element | null =>
    label ? (
      <label className="label" key="SelectLabel">
        {label}
      </label>
    ) : null;

  const LeftIcon = (): JSX.Element | null =>
    icon ? (
      <Icon
        icon={icon}
        position="left"
        color={color !== 'primary' ? color : undefined}
        key="SelectIconLeft"
      />
    ) : null;

  const currentValue = (): string => {
    if (opened) {
      return value ? value : '';
    }
    const currentItem = list.find((item) => item.id === itemID);
    return currentItem ? currentItem.name : '';
  };

  const filteredList = (): SelectItem[] => {
    const inputValue = currentValue();

    if (inputValue.trim().length === 0) {
      return list;
    }

    const inputArray = inputValue.split(' ');

    return list.filter(
      (listItem) =>
        listItem.name === '' ||
        inputArray.every((value: string) => new RegExp(value, 'i').exec(listItem.name)),
    );
  };

  const DropdownContent = (): JSX.Element | null =>
    error || !opened ? null : (
      <div className="select-box">
        {filteredList().map((ListItem) => (
          <div
            className="select-item"
            key={ListItem.id}
            onClick={(): void => {
              setItemID(ListItem.id);
              setValue(ListItem.name);
              callback(ListItem.id);
            }}
          >
            {ListItem.name}
          </div>
        ))}
      </div>
    );

  return (
    <div className="field">
      <Label />
      <div className={`control is-expanded select is-fullwidth ${icon ? 'has-icons-left' : ''}`}>
        <input
          name={name}
          className={`input ${color ? `is-${color}` : ''}`}
          type="text"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          value={currentValue()}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setValue(event.target.value);
          }}
          onFocus={(): void => {
            setOpened(true);
          }}
          onBlur={(): void => {
            setTimeout(() => setOpened(false), 300);
          }}
        />
        <LeftIcon />
      </div>
      <DropdownContent />
    </div>
  );
};
