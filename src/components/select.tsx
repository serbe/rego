import React, { useState, SyntheticEvent, useEffect, FC } from 'react';

import { Icon } from './icon';
import { SelectItem } from '../models/selectitem';

// import './select.css';

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

  const onInput = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setItemID(0);
  };

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

  const SelectList = (): JSX.Element => {
    const items = filteredList.map((ListItem) => (
      <div className="select-item input" key={ListItem.id}>
        {ListItem.name}
      </div>
    ));
    return <>{items}</>;
  };

  const SelectBox = (): JSX.Element | null =>
    opened ? (
      <div className="select-box" key="SelectOpened">
        <SelectList />
      </div>
    ) : null;

  return (
    <div className="field">
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <input
            // className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            defaultValue="test"
          />
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">
              Dropdown item
            </a>
            <a className="dropdown-item">Other dropdown item</a>
            <a href="#" className="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" className="dropdown-item">
              Other dropdown item
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              With a divider
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
