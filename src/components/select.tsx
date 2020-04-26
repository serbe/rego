import React, { useState, SyntheticEvent, useEffect, FC } from 'react';

import { Icon } from './icon';
import { SelectItem } from '../models/selectitem';

import './select.css';

interface SelectProps {
  id?: number;
  iconLeft?: string;
  iconRight?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'normal' | 'medium' | 'large';
  state?: string;
  label?: string;
  list: SelectItem[];
  itemName?: string;
  inputReference?: {
    <T>(initialValue: T): React.MutableRefObject<T>;
    <T>(initialValue: T | null): React.RefObject<T>;
    <T = undefined>(): React.MutableRefObject<T | undefined>;
  };
}

export const Select: FC<SelectProps> = (properties: SelectProps) => {
  const {
    id,
    iconLeft,
    iconRight,
    color,
    size,
    state,
    label,
    list,
    itemName,
    inputReference,
  } = properties;

  if (list[0].id !== 0) {
    list.unshift({ id: 0, name: '' });
  }

  const [opened, setOpened] = useState(false);
  const [itemID, setItemID] = useState(id ? id : 0);
  const [filteredList, setFilteredList] = useState(list);

  // useEffect(() => {
  //   const fList =
  //     item.name.length > 0
  //       ? list.filter(
  //           (listItem) => listItem.name === '' || new RegExp(item.name, 'i').exec(listItem.name),
  //         )
  //       : list;
  //   setFilteredList(fList);
  // }, [item.name, list]);

  const controlClasses = `control is-expanded select is-fullwidth ${
    iconLeft ? 'has-icons-left' : ''
  } ${iconRight ? 'has-icons-right' : ''}`;

  const inputClasses = `input ${color ? `is-${color}` : ''} ${size ? `is-${size}` : ''} ${
    state ? `is-${state}` : ''
  }`;

  const Label = (): JSX.Element | null =>
    label ? (
      <label className="label" key="SelectLabel">
        {label}
      </label>
    ) : null;

  const IconLeft = (): JSX.Element | null =>
    iconLeft ? (
      <Icon
        icon={iconLeft}
        position="left"
        color={color !== 'primary' ? color : undefined}
        size={size}
        key="SelectIconLeft"
      />
    ) : null;

  const IconRight = (): JSX.Element | null =>
    iconRight ? (
      <Icon
        icon={iconRight}
        position="right"
        color={color !== 'primary' ? color : undefined}
        size={size}
        key="SelectIconRight"
      />
    ) : null;

  const DropdownContent = (): JSX.Element => (
    <div className="dropdown-content ddm">
      {list.map((ListItem) => (
        <a
          className="dropdown-item"
          key={ListItem.id}
          href={`#${ListItem.name}`}
          onClick={(): void => {
            setItemID(ListItem.id);
          }}
        >
          {ListItem.name}
        </a>
      ))}
    </div>
  );

  const currentValue = (): string => {
    const value = list.find((item) => item.id === itemID);
    return value ? value.name : '';
  };

  return (
    <div className="field">
      <div className={`dropdown full-width ${opened ? 'is-active' : ''}`}>
        <div className="dropdown-trigger full-width">
          <input
            className="input"
            type="text"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            defaultValue={currentValue()}
            onFocus={(): void => {
              setOpened(true);
            }}
            onBlur={(): void => {
              setTimeout(() => setOpened(false), 300);
            }}
          />
        </div>
        <div className="dropdown-menu full-width" id="dropdown-menu" role="menu">
          <DropdownContent />
        </div>
      </div>
    </div>
  );
};
