import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import {
  SirenType,
  SirenTypeGetItem,
  SirenTypeNameInput,
  SirenTypeRadiusInput,
} from '../../models/sirentype';

export const SirenTypeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [radius, setRadius] = useState<number>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<SirenType>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: SirenType = {
      id: number_id,
      name: name,
      radius: radius,
      note: note,
    };

    SetItem(ws, number_id, 'SirenType', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'SirenType', id, setLoaded);
    AddEventMessageGet(ws, SirenTypeGetItem, setData, setLoaded);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    if (data?.id) {
      const c = data;
      setName(c.name);
      setRadius(c.radius);
      setNote(c.note);
    }
    if (status) {
      history.go(-1);
    }
  }, [data, history, status]);

  return (
    <div>
      {loaded && (
        <>
          <SirenTypeNameInput value={name} setter={setName} />
          <SirenTypeRadiusInput value={radius} setter={setRadius} />
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
