import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAuthState } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, DelItem, SetItem, URL } from '../../helpers/fetcher';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { Post, PostGetItem, PostGOSwitch, PostNameInput } from '../../models/post';

export const PostItem = (): JSX.Element => {
  const { auth } = useAuthState();
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
    const numberID = Number(id);
    const item: Post = {
      id: numberID,
      name,
      go,
      note,
    };

    SetItem(ws.current, numberID, 'Post', item, setStatus, auth.token);
  };

  const del = (): void => {
    const numberID = Number(id);
    DelItem(ws.current, numberID, 'Post', setStatus, auth.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws.current, 'Post', id, setLoaded, auth.token);
    AddEventMessageGet(ws.current, PostGetItem, setData);

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [id, auth.token]);

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
