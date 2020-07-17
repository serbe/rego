import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { Kind, KindGetItem, KindNameInput, KindShortNameInput } from '../../models/kind';

export const KindItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [shortName, setShortName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Kind>();
  const [status, setStatus] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Kind = {
      id: number_id,
      name: name,
      short_name: shortName,
      note: note,
    };

    SetItem(ws, number_id, 'Kind', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Kind', id);
    AddEventMessageGet(ws, KindGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    if (data?.id) {
      const c = data;
      setName(c.name);
      setShortName(c.short_name);
      setNote(c.note);
    }
    if (status) {
      history.go(-1);
    }
  }, [data, history, status]);

  return (
    <div>
      <KindNameInput value={name} setter={setName} />
      <KindShortNameInput value={shortName} setter={setShortName} />
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
    </div>
  );
};
