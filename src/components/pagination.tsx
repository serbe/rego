import React, { FC } from "react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  callback: (num: number) => void;
  rounded?: boolean;
  size?: "small" | "normal" | "medium" | "large";
}

type PaginationLinkProps = {
  check: boolean;
  index: number;
  link?: number;
  ellipsis?: boolean;
};

export const Pagination: FC<PaginationProps> = (props: PaginationProps) => {
  const { currentPage, lastPage, callback, rounded, size } = props;

  const Prev = (): JSX.Element | null =>
    currentPage > 1 ? (
      <a
        className="pagination-previous"
        onClick={(): void => callback(currentPage - 1)}
        key="PaginationPrev"
        href="#prev"
      >
        Назад
      </a>
    ) : null;

  const Next = (): JSX.Element | null =>
    currentPage < lastPage ? (
      <a
        className="pagination-next"
        onClick={(): void => callback(currentPage + 1)}
        key="PaginationNext"
        href="#next"
      >
        Далее
      </a>
    ) : null;

  const PaginationLink = ({
    check,
    index,
    link,
    ellipsis
  }: PaginationLinkProps): JSX.Element | null => {
    const Tag = (): JSX.Element => {
      return ellipsis ? (
        <span className="pagination-ellipsis">&hellip;</span>
      ) : (
        <a
          className={
            link === currentPage
              ? "pagination-link is-current"
              : "pagination-link"
          }
          onClick={(): void | null => (link ? callback(link) : null)}
          href="#link"
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
        <PaginationLink check={currentPage !== 1} index={1} link={1} />
        <PaginationLink check={currentPage > 3} index={2} ellipsis />
        <PaginationLink
          check={currentPage > 2}
          index={3}
          link={currentPage - 1}
        />
        <PaginationLink check index={4} link={currentPage} />
        <PaginationLink
          check={currentPage < lastPage - 1}
          index={5}
          link={currentPage + 1}
        />
        <PaginationLink check={currentPage < lastPage - 2} index={6} ellipsis />
        <PaginationLink
          check={currentPage !== lastPage}
          index={7}
          link={lastPage}
        />
      </ul>
    </nav>
  );
};
