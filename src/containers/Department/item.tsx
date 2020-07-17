import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
import { Department, DepartmentGetItem, DepartmentNameInput } from '../../models/department';
import { NoteInput, ParameterTypes } from '../../models/impersonal';

export const DepartmentItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Department>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Department = {
      id: number_id,
      name: name,
      note: note,
    };

    SetItem(ws, number_id, 'Department', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Department', id, setLoaded);
    AddEventMessageGet(ws, DepartmentGetItem, setData, setLoaded);

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
          <DepartmentNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <div className="field is-grouped">
            <button className="button" onClick={() => submit()}>
              Сохранить
            </button>
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
