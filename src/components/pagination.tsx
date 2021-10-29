import React from 'react';

interface PaginationProperties {
  currentPage: number;
  lastPage: number;
  setter: (value: number) => void;
}

interface ItemProperties {
  check: boolean;
  ellipsis?: boolean;
  index: number;
  link?: number;
}

export const Pagination = ({
  currentPage,
  lastPage,
  setter,
}: PaginationProperties): JSX.Element => {
  const navClasses = `pagination is-rounded is-centered`;

  const Previous = (): JSX.Element =>
    currentPage > 1 ? (
      <a
        className="pagination-previous"
        href="#prev"
        key="PaginationPrev"
        onClick={(): void => setter(currentPage - 1)}
      >
        Назад
      </a>
    ) : (
      <button type="button" className="pagination-previous" disabled>
        Назад
      </button>
    );

  const Next = (): JSX.Element =>
    currentPage < lastPage ? (
      <a
        className="pagination-next"
        href="#next"
        key="PaginationNext"
        onClick={(): void => setter(currentPage + 1)}
      >
        Далее
      </a>
    ) : (
      <button type="button" className="pagination-next" disabled>
        Далее
      </button>
    );

  const Item = (itemProperties: ItemProperties): JSX.Element => {
    const { check, index, link, ellipsis } = itemProperties;

    return check ? (
      <li key={`li${index}`}>
        {ellipsis ? (
          <span className="pagination-ellipsis">&hellip;</span>
        ) : (
          <a
            className={link === currentPage ? 'pagination-link is-current' : 'pagination-link'}
            href="#item"
            onClick={link === currentPage || !link ? undefined : (): void => setter(link)}
          >
            {link}
          </a>
        )}
      </li>
    ) : (
      <></>
    );
  };

  return (
    <nav className={navClasses} key="pagination" role="navigation" aria-label="pagination">
      <Previous />
      <Next />
      <ul className="pagination-list" key="ul">
        <Item check={currentPage > 1} index={1} link={1} />
        <Item check={currentPage > 3} index={2} ellipsis />
        <Item check={currentPage > 2} index={3} link={currentPage - 1} />
        <Item check index={4} link={currentPage} />
        <Item check={currentPage < lastPage - 1} index={5} link={currentPage + 1} />
        <Item check={currentPage < lastPage - 2} index={6} ellipsis />
        <Item check={currentPage < lastPage} index={7} link={lastPage} />
      </ul>
    </nav>
  );
};
