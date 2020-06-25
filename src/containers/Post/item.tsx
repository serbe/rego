import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { Post, PostGOSwitch, PostNameInput } from '../../models/post';

export const PostItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Post', id);
  const [name, setName] = useState('');
  const [go, setGo] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (data?.id) {
      const c = data as Post;
      setName(c.name || '');
      setGo(c.go || false);
      setNote(c.note || '');
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
          <PostNameInput value={name} setter={setName} />
          <PostGOSwitch value={go} setter={setGo} />
          <NoteInput value={note} setter={setNote} />

          <div className="field is-grouped">
            <div className="control">
              <button className="button">Сохранить</button>
            </div>
            <div className="control">
              <button className="button" onClick={() => history.go(-1)}>
                Закрыть
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
