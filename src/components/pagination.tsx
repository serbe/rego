/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import clsx from "clsx";

interface PaginationProps {
  current_page: number;
  last_page: number;
  callback: any;
  rounded?: boolean;
  size?: "small" | "normal" | "medium" | "large";
}

type PaginationLinkProps = {
  check: boolean;
  index: number;
  link?: number;
  ellipsis?: boolean;
};

export const Pagination: React.FC<PaginationProps> = (
  props: PaginationProps
) => {
  const { current_page, last_page, callback, rounded, size } = props;

  const Prev = () =>
    current_page > 1 ? (
      <a
        className="pagination-previous"
        onClick={() => callback(current_page - 1)}
        key="PaginationPrev"
        href="#"
      >
        Назад
      </a>
    ) : null;

  const Next = () =>
    current_page < last_page ? (
      <a
        className="pagination-next"
        onClick={() => callback(current_page + 1)}
        key="PaginationNext"
      >
        Далее
      </a>
    ) : null;

  const PaginationLink = ({
    check,
    index,
    link,
    ellipsis
  }: PaginationLinkProps) => {
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
          onClick={() => (link === current_page ? null : () => callback(link))}
        >
          {link}
        </a>
      );
    };
    return check ? (
      <li key={`li${index}`}>
        <Tag />
      </li>
    ) : null;
  };

  const navClasses = clsx([
    "pagination",
    "is-centered",
    { size } ? `is-${size}` : null,
    [{ "is-rounded": { rounded } }]
  ]);

  return (
    <nav className={navClasses} key="nav">
      <Prev />
      <Next />
      <ul className="pagination-list" key="ul">
        <PaginationLink check={current_page !== 1} index={1} link={1} />
        <PaginationLink check={current_page > 3} index={2} ellipsis />
        <PaginationLink
          check={current_page > 2}
          index={3}
          link={current_page - 1}
        />
        <PaginationLink check index={4} link={current_page} />
        <PaginationLink
          check={current_page < last_page - 1}
          index={5}
          link={current_page + 1}
        />
        <PaginationLink
          check={current_page < last_page - 2}
          index={6}
          ellipsis
        />
        <PaginationLink
          check={current_page !== last_page}
          index={7}
          link={last_page}
        />
      </ul>
    </nav>
  );
};
