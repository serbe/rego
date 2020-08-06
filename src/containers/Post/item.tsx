import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, SetItem, URL, DelItem } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes, ItemFormButtons } from '../../models/impersonal';
import { Post, PostGetItem, PostGOSwitch, PostNameInput } from '../../models/post';

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

  const ws = useRef<WebSocket>();

  const send = (): void => {
    const number_id = Number(id);
    const item: Post = {
      id: number_id,
      name: name,
      go: go,
      note: note,
    };

    SetItem(ws, number_id, 'Post', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(ws, number_id, 'Post', setStatus, state.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws, 'Post', id, setLoaded, state.token);
    AddEventMessageGet(ws, PostGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
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
