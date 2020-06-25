import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { GetList } from '../../helpers/fetcher';
import { PostList } from '../../models/post';

export const Posts = (): JSX.Element => {
  const history = useHistory();
  const [data, error] = GetList('PostList');
  const [search, setSearch] = useState('');

  const [paginationData, Paginate] = Data({
    data: data,
    search: search,
  });

  const tableData = (): PostList[] => {
    return paginationData();
  };

  const Body = (): JSX.Element => (
    <>
      {tableData().map((post, index) => (
        <tr
          key={`tr${post.id}${index}`}
          onClick={(): void => history.push(`/posts/${post.id}`)}
          role="gridcell"
          className="link"
        >
          <td>{post.name}</td>
          <td className="w9">
            <input type="checkbox" checked={post.go} />
          </td>
          <td className="is-hidden-mobile">{post.note}</td>
        </tr>
      ))}
    </>
  );

  return error ? (
    <></>
  ) : (
    <>
      <Bar value={search} setter={setSearch} name="posts" />
      <table className="table is-narrow">
        <tbody>
          <tr>
            <th>Наименование должности</th>
            <th className="w9">ГО</th>
            <th className="is-hidden-mobile">Заметка</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
