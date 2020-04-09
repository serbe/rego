import React, { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  callback: (num: number) => void;
}

type PaginationLinkProps = {
  check: boolean;
  index: number;
  link?: number;
  ellipsis?: boolean;
};

export const Pagination: FC<PaginationProps> = (properties: PaginationProps) => {
  const { currentPage, lastPage, callback } = properties;

  const Previous = (): JSX.Element | null =>
    currentPage > 1 ? (
      <li className="mx-3 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold">
        <a
          className="p-3"
          onClick={(): void => callback(currentPage - 1)}
          key="PaginationPrev"
          href="#prev"
        >
          Назад
        </a>
      </li>
    ) : null;

  const Next = (): JSX.Element | null =>
    currentPage < lastPage ? (
      <li className="mx-3 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold">
        <a
          className="p-3"
          onClick={(): void => callback(currentPage + 1)}
          key="PaginationNext"
          href="#next"
        >
          Далее
        </a>
      </li>
    ) : null;

  const PaginationLink = ({
    check,
    index,
    link,
    ellipsis,
  }: PaginationLinkProps): JSX.Element | null => {
    const Tag = (): JSX.Element => {
      return ellipsis ? (
        <span className="p-3">&hellip;</span>
      ) : (
        <a
          className={link === currentPage ? 'p-3 text-blue-900' : 'p-3'}
          onClick={(): void | null => (link ? callback(link) : null)}
          href="#link"
        >
          {link}
        </a>
      );
    };
    return check ? (
      <li
        key={`li${index}`}
        className="mx-3 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold"
      >
        <Tag />
      </li>
    ) : null;
  };

  return (
    <ul className="flex justify-center" key="paginate">
      <Previous />
      <PaginationLink check={currentPage !== 1} index={1} link={1} />
      <PaginationLink check={currentPage > 3} index={2} ellipsis />
      <PaginationLink check={currentPage > 2} index={3} link={currentPage - 1} />
      <PaginationLink check index={4} link={currentPage} />
      <PaginationLink check={currentPage < lastPage - 1} index={5} link={currentPage + 1} />
      <PaginationLink check={currentPage < lastPage - 2} index={6} ellipsis />
      <PaginationLink check={currentPage !== lastPage} index={7} link={lastPage} />
      <Next />
    </ul>
  );
};
