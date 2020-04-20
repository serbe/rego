import React, { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  callback: Function;
  rounded?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large';
}

interface PreviousProps {
  currentPage: number;
  callback: Function;
}

interface NextProps {
  currentPage: number;
  lastPage: number;
  callback: Function;
}

interface ItemProps {
  currentPage: number;
  callback: Function;
  check: boolean;
  index: number;
  link?: number;
  ellipsis?: boolean;
}

const Previous = (properties: PreviousProps): JSX.Element | null => {
  const { currentPage, callback } = properties;
  return currentPage > 1 ? (
    <a
      className="pagination-previous"
      onClick={(): void => callback(currentPage - 1)}
      key="PaginationPrev"
      href="#prev"
    >
      Назад
    </a>
  ) : null;
};

const Next = (properties: NextProps): JSX.Element | null => {
  const { currentPage, lastPage, callback } = properties;
  return currentPage < lastPage ? (
    <a
      className="pagination-next"
      onClick={(): void => callback(currentPage + 1)}
      key="PaginationNext"
      href="#next"
    >
      Далее
    </a>
  ) : null;
};

const Item = (properties: ItemProps): JSX.Element | null => {
  const { currentPage, callback, check, index, link, ellipsis } = properties;
  const Tag = (): JSX.Element => {
    return ellipsis ? (
      <span className="pagination-ellipsis">&hellip;</span>
    ) : (
      <a
        className={link === currentPage ? 'pagination-link is-current' : 'pagination-link'}
        onClick={link === currentPage ? undefined : (): void => callback(link)}
        href="#item"
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

export const Pagination: FC<PaginationProps> = (properties: PaginationProps) => {
  const { currentPage, lastPage, callback, rounded, size } = properties;

  const sizeClass = size ? `is-${size}` : '';
  const navClasses = `pagination is-centered ${sizeClass} ${rounded ? 'is-rounded' : ''}`;

  return (
    <nav className={navClasses} key="nav">
      <Previous currentPage={currentPage} callback={callback} />
      <Next currentPage={currentPage} lastPage={lastPage} callback={callback} />
      <ul className="pagination-list" key="ul">
        <Item
          currentPage={currentPage}
          callback={callback}
          check={currentPage !== 1}
          index={1}
          link={1}
          ellipsis={false}
        />
        <Item
          currentPage={currentPage}
          callback={callback}
          check={currentPage > 3}
          index={2}
          ellipsis
        />
        <Item
          currentPage={currentPage}
          callback={callback}
          check={currentPage > 2}
          index={3}
          link={currentPage - 1}
        />
        <Item currentPage={currentPage} callback={callback} check index={4} link={currentPage} />
        <Item
          currentPage={currentPage}
          callback={callback}
          check={currentPage < currentPage - 1}
          index={5}
          link={currentPage + 1}
        />
        <Item
          currentPage={currentPage}
          callback={callback}
          check={currentPage < lastPage - 2}
          index={6}
          ellipsis
        />
        <Item
          currentPage={currentPage}
          callback={callback}
          check={currentPage !== lastPage}
          index={7}
          link={lastPage}
        />
      </ul>
    </nav>
  );
};
