import React, { useState, SyntheticEvent, useEffect, FC } from 'react';
import clsx from 'clsx';

import { Icon } from './icon';
import { SelectItem } from '../models/selectitem';

import './select.css';

interface SelectProps {
  selected: SelectItem;
  iconLeft?: string;
  iconRight?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'normal' | 'medium' | 'large';
  state?: string;
  label?: string;
  list: SelectItem[];
  itemName: string;
  inputReference?: {
    <T>(initialValue: T): React.MutableRefObject<T>;
    <T>(initialValue: T | null): React.RefObject<T>;
    <T = undefined>(): React.MutableRefObject<T | undefined>;
  };
}

export const Select: FC<SelectProps> = (properties: SelectProps) => {
  const {
    selected,
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
  const [item, setItem] = useState(selected);
  const [filteredList, setFilteredList] = useState(list);

  useEffect(() => {
    const fList =
      item.name.length > 0
        ? list.filter(
            (listItem) => listItem.name === '' || new RegExp(item.name, 'i').exec(listItem.name),
          )
        : list;
    setFilteredList(fList);
  }, [item.name, list]);

  const onInput = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setItem({ id: 0, name: target.value });
  };

  const controlClasses = clsx([
    'control',
    'is-expanded',
    'select',
    'is-fullwidth',
    {
      'has-icons-left': iconLeft,
      'has-icons-right': iconRight,
    },
  ]);

  const inputClasses = clsx([
    'input',
    {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
      [`is-${state}`]: state,
    },
  ]);

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
      <div className="select-item input" key={ListItem.id} onClick={(): void => setItem(ListItem)}>
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
      <Label />
      <div className={controlClasses} onClick={(): void => setOpened(true)}>
        <input
          ref={inputReference}
          name={itemName}
          className={inputClasses}
          placeholder={selected.name}
          value={item.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onInput(event)}
          onBlur={(): NodeJS.Timeout => setTimeout(() => setOpened(false), 300)}
        />
        <IconLeft />
        <IconRight />
        <SelectBox />
      </div>
    </div>
  );
};
