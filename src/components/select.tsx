import React, { useState, SyntheticEvent, useRef, useEffect } from "react";
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
}

export const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    selected,
    iconLeft,
    iconRight,
    color,
    size,
    state,
    label,
    list,
    itemName
  } = props;

  const selectRef = useRef(null);

  const [opened, setOpened] = useState(true);
  const [searchText, setSearchText] = useState("");
  // const [mousedown, setMousedown] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [item, setItem] = useState(selected);

  useEffect(() => {
    if (selected) {
      console.log("selected", selected);
      setSearchText(selected.name);
    }
  }, [selected]);

  useEffect(() => {
    console.log("useEffect item", item);
  }, [item]);

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

  const Label = () => (
    label ?
      <label className="label" key="SelectLabel">
        {label}
      </label> : null
  );

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
    const filterlist = listWithFilter();
    const items = filterlist ? filterlist.map((item, _index) => (
      <div
        className="select-item"
        key={item.id}
        onClick={() => selectItem(item)}
      // mousedown={mousedownItem}
      >
        {item.name}
      </div>
    )) : null;
    return <>{items}</>;
  };

  const SelectBox = () =>
    opened ? (
      <div className="select-box" key="SelectOpened">
        <div
          className="select-item"
          onClick={() => selectItem({ id: 0, name: '' })}
        ></div>
        <SelectList />
      </div>
    ) : null;

  const listWithFilter = (): SelectItem[] | null =>
    list ? searchText.length > 0
      ? list.filter(item => item.name.match(new RegExp(searchText, "i")))
      : list : null;

  // const item = (): SelectItem =>
  //   selected ? { id: selected.id, name: selected.name } : { id: 0, name: "" };

  const openOptions = () => {
    // this.$refs.vueSelect.focus();
    setSearchText("");
    setPlaceholder(selected ? selected.name : "");
    setOpened(true);
    // setMousedown(false);
  };

  const closeOptions = () => {
    setOpened(false);
  };

  // const mousedownItem = () => {
  //   setMousedown(true);
  // };

  const selectItem = (item: SelectItem) => {
    console.log(item);
    setItem(item);
    closeOptions();
    // if (this.itemName) {
    //   this.$emit("select", item, this.itemName);
    // } else {
    //   this.$emit("select", item);
    // }
  };

  const onBlur = () => {
    // if (!mousedown) {
      // setSearchText(selected ? selected.name : "");
      closeOptions();
    // }
  };

  const onInput = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setItem({ id: 0, name: target.value });
  };

  return (
    <div className="field">
      <Label />
      <div className={controlClasses} onClick={() => openOptions()}>
        <input
          ref={selectRef}
          className={inputClasses}
          placeholder={placeholder === "" && label ? label : placeholder}
          value={item.name}
          onChange={e => onInput(e)}
          onBlur={onBlur}
        />
        <IconLeft />
        <IconRight />
        <SelectBox />
      </div>
    </div>
  );
};

Select.defaultProps = {
  selected: { id: 0, name: "" }
};
