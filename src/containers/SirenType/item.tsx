import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, SetItem, URL, DelItem } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes, ItemFormButtons } from '../../models/impersonal';
import {
  SirenType,
  SirenTypeGetItem,
  SirenTypeNameInput,
  SirenTypeRadiusInput,
} from '../../models/sirentype';

export const SirenTypeItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [radius, setRadius] = useState<number>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<SirenType>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const send = (): void => {
    const number_id = Number(id);
    const item: SirenType = {
      id: number_id,
      name: name,
      radius: radius,
      note: note,
    };

    SetItem(ws, number_id, 'SirenType', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(ws, number_id, 'SirenType', setStatus, state.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws, 'SirenType', id, setLoaded, state.token);
    AddEventMessageGet(ws, SirenTypeGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id, state.token]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setRadius(data.radius);
      setNote(data.note);
      setLoaded(true);
    }
  }, [data, history, status]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  return (
    <div>
      {loaded && (
        <>
          <SirenTypeNameInput value={name} setter={setName} />
          <SirenTypeRadiusInput value={radius} setter={setRadius} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
