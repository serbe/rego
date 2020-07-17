import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { Scope, ScopeGetItem, ScopeNameInput } from '../../models/scope';

export const ScopeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Scope>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Scope = {
      id: number_id,
      name: name,
      note: note,
    };

    SetItem(ws, number_id, 'Scope', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Scope', id, setLoaded);
    AddEventMessageGet(ws, ScopeGetItem, setData, setLoaded);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    if (data?.id) {
      const c = data;
      setName(c.name);
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
          <ScopeNameInput value={name} setter={setName} />
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
