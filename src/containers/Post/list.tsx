import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Search } from '../../components/table';
import { PostList, PostListJsonScheme } from '../../models/post';
import { rws } from '../../netapi';

export const Posts = (): JSX.Element => {
  const history = useHistory();
  const [data, setData] = useState<PostList[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>();

  const [paginationData, Paginate] = List({
    data: data,
    search: search,
  });

  const tableData = (): PostList[] => {
    return paginationData();
  };

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data = JSON.parse(message.data) as PostListJsonScheme;
      if (data.name && data.name === 'PostList' && data.object.PostList) {
        setData(data.object.PostList);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send('{"Get":{"List":"PostList"}}');

    return (): void => {
      rws.removeEventListener('message', (message: MessageEvent) => {
        console.log('removeEventListener', message);
      });
    };
  }, []);

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
      <Search value={search} setter={setSearch} />
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
