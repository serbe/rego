import './select.css';

import { ChangeEvent, useEffect, useState } from 'react';

import { GetSelect, SelectItem } from '../services/fetcher';
import { Icon } from './icon';

export interface SelectValues {
  id?: number;
  setter: (event?: number) => void;
}

interface SelectProperties {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
  id?: number;
  label?: string;
  listName: string;
  name: string;
  setter: (event?: number) => void;
}

export const Select = ({
  name,
  id,
  label,
  icon,
  color,
  listName,
  setter,
}: SelectProperties): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const [itemID, setItemID] = useState(id || 0);
  const [list, error] = GetSelect(listName);
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (itemID === 0 && id) {
      setItemID(id);
    }
    if (list[0].id !== 0) {
      list.unshift({ id: 0, name: '' });
    }
    if (!id && id === 0) {
      setValue('');
    } else {
      const currentItem = list.find((item) => item.id === id);
      setValue(currentItem?.name || '');
    }
  }, [list, id, itemID]);

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
        inputArray.every((listItemValue: string) =>
          new RegExp(listItemValue, 'i').exec(listItem.name),
        ),
    );
  };

  return (
    <div className="field" key={name}>
      {label && (
        <label className="label" key="SelectLabel" htmlFor={`select-${name}-id`}>
          {label}
        </label>
      )}
      <div
        id={`select-${name}-id`}
        className={`control is-expanded select is-fullwidth ${icon ? 'has-icons-left' : ''}`}
        key={`${name}-control`}
      >
        <input
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          className={`input ${color ? `is-${color}` : ''}`}
          name={name}
          type="text"
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
          autoComplete="off"
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
              key={`${name}-${ListItem.id}`}
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
