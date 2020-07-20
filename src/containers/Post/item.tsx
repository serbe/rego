import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, SetItem, URL } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { Post, PostGetItem, PostGOSwitch, PostNameInput } from '../../models/post';

export const PostItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [go, setGo] = useState(false);
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Post>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Post = {
      id: number_id,
      name: name,
      go: go,
      note: note,
    };

    SetItem(ws, number_id, 'Post', item, setStatus);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws, 'Post', id, setLoaded);
    AddEventMessageGet(ws, PostGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

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

          <div className="field is-grouped">
            <div className="control">
              <button className="button" onClick={() => submit()}>
                Сохранить
              </button>
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
