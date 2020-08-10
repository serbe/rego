import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { Post, PostGOSwitch, PostNameInput } from '../../models/post';

export const PostItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [go, setGo] = useState(false);
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Post>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const send = (): void => {
    const number_id = Number(id);
    const item: Post = {
      id: number_id,
      name: name,
      go: go,
      note: note,
    };

    SetItem(number_id, 'Post', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'Post', setStatus, state.token);
  };

  useEffect(() => {
    GetItem('Post', id, setData, setLoaded, state.token);
  }, [id, state.token]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setGo(data.go || false);
      setNote(data.note);
      setLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  return (
    <div>
      {loaded && (
        <>
          <PostNameInput value={name} setter={setName} />
          <PostGOSwitch value={go} setter={setGo} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
