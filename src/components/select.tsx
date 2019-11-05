import React, { useState, SyntheticEvent, useRef } from "react";
import clsx from "clsx";

import { Icon } from "./icon";
import { SelectItem } from "../models/selectitem";

interface SelectProps {
  selected: SelectItem;
  iconLeft?: string;
  iconRight?: string;
  color?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "small" | "normal" | "medium" | "large";
  state?: string;
  label?: string;
  list?: SelectItem[];
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

  const [opened, setOpened] = useState(false);
  const [searchText, setSearchText] = useState(selected.name);
  const [mousedown, setMousedown] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [loaded, setLoaded] = useState(false);

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
    <label className="label" key="SelectLabel">
      {label && placeholder ? placeholder : label}
    </label>
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
        <SelectList />
      </div>
    ) : null;

  const listWithFilter = (): SelectItem[] | null =>
    list ? searchText.length > 0
      ? list.filter(item => item.name.match(new RegExp(searchText, "i")))
      : list : null;

  const item = (): SelectItem =>
    selected ? { id: selected.id, name: selected.name } : { id: 0, name: "" };

  const openOptions = () => {
    setLoaded(true);
    // this.$refs.vueSelect.focus();
    setSearchText("");
    setPlaceholder(selected.name);
    setOpened(true);
    setMousedown(false);
  };

  const closeOptions = () => {
    setOpened(false);
  };

  const mousedownItem = () => {
    setMousedown(true);
  };

  const selectItem = (item: SelectItem) => {
    setSearchText(item.name);
    closeOptions();
    // if (this.itemName) {
    //   this.$emit("select", item, this.itemName);
    // } else {
    //   this.$emit("select", item);
    // }
  };

  const onBlur = () => {
    if (!mousedown) {
      setSearchText(selected.name);
      closeOptions();
    }
  };

  const onInput = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setSearchText(target.value);
  };

  return (
    <div className="field">
      <Label />
      <div className={controlClasses} onClick={() => openOptions()}>
        <input
          ref={selectRef}
          className={inputClasses}
          placeholder={placeholder === "" && label ? label : placeholder}
          defaultValue={loaded ? searchText : item.name}
          onInput={e => onInput(e)}
          onBlur={onBlur}
        />
        <IconLeft />
        <IconRight />
        {/* <SelectBox /> */}
      </div>
    </div>
  );
};

Select.defaultProps = {
  selected: { id: 0, name: "" }
};
