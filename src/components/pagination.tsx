import React, { FC } from 'react';

interface PaginationProps {
  centered?: boolean;
  currentPage: number;
  lastPage: number;
  callback: Function;
  rounded?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large';
}

interface ItemProps {
  check: boolean;
  index: number;
  link?: number;
  ellipsis?: boolean;
}

export const Pagination: FC<PaginationProps> = (properties: PaginationProps) => {
  const { currentPage, lastPage, callback, centered, rounded, size } = properties;

  const sizeClass = size ? `is-${size}` : '';
  const navClasses = `pagination ${sizeClass} ${rounded ? 'is-rounded' : ''} ${
    centered ? 'is-centered' : ''
  }`;

  const Previous = (): JSX.Element | null =>
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

  const Item = (properties: ItemProps): JSX.Element | null => {
    const { check, index, link, ellipsis } = properties;

    return check ? (
      <li key={`li${index}`}>
        {ellipsis ? (
          <span className="pagination-ellipsis">&hellip;</span>
        ) : (
          <a
            className={link === currentPage ? 'pagination-link is-current' : 'pagination-link'}
            onClick={link === currentPage ? undefined : (): void => callback(link)}
            href="#item"
          >
            {link}
          </a>
        )}
      </li>
    ) : null;
  };

  return (
    <nav className={navClasses} key="pagination" role="navigation" aria-label="pagination">
      <Previous />
      <Next />
      <ul className="pagination-list" key="ul">
        <Item check={currentPage !== 1} index={1} link={1} />
        <Item check={currentPage > 3} index={2} ellipsis />
        <Item check={currentPage > 2} index={3} link={currentPage - 1} />
        <Item check index={4} link={currentPage} />
        <Item check={currentPage < lastPage - 1} index={5} link={currentPage + 1} />
        <Item check={currentPage < lastPage - 2} index={6} ellipsis />
        <Item check={currentPage !== lastPage} index={7} link={lastPage} />
      </ul>
    </nav>
  );
};
