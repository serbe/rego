import React, { ChangeEvent, useEffect, useState } from 'react';
import { SelectItem } from '../models/selectitem';
import { rws } from '../netapi';
import { Icon } from './icon';
import './select.css';

export interface SelectValues {
  id: number;
  setter: (event: number) => void;
}

interface SelectProps {
  name: string;
  id?: number;
  icon?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  label?: string;
  listName?: string;
  setter: (event: number) => void;
}

type CLWS = {
  name: string;
  object: {
    SelectItem?: SelectItem[];
  };
  error?: string;
};

export const Select = (properties: SelectProps): JSX.Element => {
  const { name, id, label, icon, color, listName, setter } = properties;

  const [opened, setOpened] = useState(false);
  const [itemID, setItemID] = useState(id || 0);
  const [list, setList] = useState<SelectItem[]>([{ id: 0, name: '' }]);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as CLWS;
      if (data?.name === listName && data.object.SelectItem && data.object.SelectItem.length > 0) {
        setList(data.object.SelectItem);
      }

      if (data.error) {
        setError(data.error);
      }
    });
    if (listName) rws.send(`{"Get":{"List":"${listName}"}}`);

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
      setValue(currentItem?.name || '');
    }
  }, [list, id]);

  const currentValue = (): string => {
    if (opened) {
      return value || '';
    }
    const currentItem = list.find((item) => item.id === itemID);
    return currentItem?.name || '';
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
          name={name}
          className={`input ${color ? `is-${color}` : ''}`}
          type="text"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          value={currentValue()}
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
            icon={icon}
            position="left"
            color={color !== 'primary' ? color : undefined}
            key="SelectIconLeft"
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
                setter(ListItem.id);
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
