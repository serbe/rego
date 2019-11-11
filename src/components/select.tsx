import React, { useState, SyntheticEvent, useEffect, FC } from "react";
import clsx from "clsx";

import { Icon } from "./icon";
import { SelectItem } from "../models/selectitem";

import "./select.css";

interface SelectProps {
  selected: SelectItem;
  iconLeft?: string;
  iconRight?: string;
  color?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "small" | "normal" | "medium" | "large";
  state?: string;
  label?: string;
  list: SelectItem[];
  itemName: string;
  inputRef?: any;
}

export const Select: FC<SelectProps> = (props: SelectProps) => {
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
    inputRef
  } = props;

  if (list[0].id !== 0) {
    list.unshift({ id: 0, name: "" });
  }

  const [opened, setOpened] = useState(false);
  const [item, setItem] = useState(selected);
  const [filteredList, setFilteredList] = useState(list);

  useEffect(() => {
    let f_list =
      item.name.length > 0
        ? list.filter(
            list_item =>
              list_item.name === "" ||
              list_item.name.match(new RegExp(item.name, "i"))
          )
        : list;
    setFilteredList(f_list);
  }, [item.name, list]);

  const onInput = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setItem({ id: 0, name: target.value });
  };

  const controlClasses = clsx([
    "control",
    "is-expanded",
    "select",
    "is-fullwidth",
    {
      "has-icons-left": iconLeft,
      "has-icons-right": iconRight
    }
  ]);

  const inputClasses = clsx([
    "input",
    {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
      [`is-${state}`]: state
    }
  ]);

  const Label = () =>
    label ? (
      <label className="label" key="SelectLabel">
        {label}
      </label>
    ) : null;

  const IconLeft = () =>
    iconLeft ? (
      <Icon
        icon={iconLeft}
        position="left"
        color={color !== "primary" ? color : undefined}
        size={size}
        key="SelectIconLeft"
      />
    ) : null;

  const IconRight = () =>
    iconRight ? (
      <Icon
        icon={iconRight}
        position="right"
        color={color !== "primary" ? color : undefined}
        size={size}
        key="SelectIconRight"
      />
    ) : null;

  const SelectList = () => {
    const items = filteredList.map((item, _index) => (
      <div
        className="select-item input"
        key={item.id}
        onClick={() => setItem(item)}
      >
        {item.name}
      </div>
    ));
    return <>{items}</>;
  };

  const SelectBox = () =>
    opened ? (
      <div className="select-box" key="SelectOpened">
        <SelectList />
      </div>
    ) : null;

  return (
    <div className="field">
      <Label />
      <div className={controlClasses} onClick={() => setOpened(true)}>
        <input
          ref={inputRef}
          name={itemName}
          className={inputClasses}
          placeholder={selected.name}
          value={item.name}
          onChange={e => onInput(e)}
          onBlur={() => setTimeout(() => setOpened(false), 300)}
        />
        <IconLeft />
        <IconRight />
        <SelectBox />
      </div>
    </div>
  );
};
