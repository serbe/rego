/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import clsx from "clsx";

interface IPaginationProps {
  current_page: number;
  last_page: number;
  callback: Function;
  rounded?: boolean;
  size?: "small" | "normal" | "medium" | "large";
}

interface IPrevProps {
  current_page: number;
  callback: Function;
}

interface INextProps {
  current_page: number;
  last_page: number;
  callback: Function;
}

interface IItemProps {
  current_page: number;
  callback: Function;
  check: boolean;
  index: number;
  link?: number;
  ellipsis?: boolean;
}

class Prev extends React.Component<IPrevProps> {
  render() {
    const { current_page, callback } = this.props;
    return current_page > 1 ? (
      <a
        className="pagination-previous"
        onClick={() => callback(current_page - 1)}
        key="PaginationPrev"
        href="#"
      >
        Назад
      </a>
    ) : null;
  }
}

class Next extends React.Component<INextProps> {
  render() {
    const { current_page, last_page, callback } = this.props;
    return current_page < last_page ? (
      <a
        className="pagination-next"
        onClick={() => callback(current_page + 1)}
        key="PaginationNext"
      >
        Далее
      </a>
    ) : null;
  }
}

class Item extends React.Component<IItemProps> {
  render() {
    const { current_page, callback, check, index, link, ellipsis } = this.props;
    const Tag = () => {
      return ellipsis ? (
        <span className="pagination-ellipsis">&hellip;</span>
      ) : (
        <a
          className={
            link === current_page
              ? "pagination-link is-current"
              : "pagination-link"
          }
          onClick={link === current_page ? undefined : () => callback(link)}
        >
          {link}
        </a>
      );
    };
    return check ? (
      <li key={`li${index}`}>
        <Tag />
      </li>
    ) : (
      undefined
    );
  }
}

export class Pagination extends React.Component<IPaginationProps> {
  render() {
    const { current_page, last_page, callback, rounded, size } = this.props;
    const navClasses = clsx([
      "pagination",
      "is-centered",
      { size } ? `is-${size}` : null,
      [{ "is-rounded": { rounded } }]
    ]);

    return (
      <nav className={navClasses} key="nav">
        <Prev current_page={current_page} callback={callback} />
        <Next
          current_page={current_page}
          last_page={last_page}
          callback={callback}
        />
        <ul className="pagination-list" key="ul">
          <Item
            current_page={current_page}
            callback={callback}
            check={current_page !== 1}
            index={1}
            link={1}
            ellipsis={false}
          />
          <Item
            current_page={current_page}
            callback={callback}
            check={current_page > 3}
            index={2}
            ellipsis
          />
          <Item
            current_page={current_page}
            callback={callback}
            check={current_page > 2}
            index={3}
            link={current_page - 1}
          />
          <Item
            current_page={current_page}
            callback={callback}
            check
            index={4}
            link={current_page}
          />
          <Item
            current_page={current_page}
            callback={callback}
            check={current_page < last_page - 1}
            index={5}
            link={current_page + 1}
          />
          <Item
            current_page={current_page}
            callback={callback}
            check={current_page < last_page - 2}
            index={6}
            ellipsis
          />
          <Item
            current_page={current_page}
            callback={callback}
            check={current_page !== last_page}
            index={7}
            link={last_page}
          />
        </ul>
      </nav>
    );
  }
}
