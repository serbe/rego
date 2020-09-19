import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAuthState } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, DelItem, SetItem, URL } from '../../helpers/fetcher';
import { Department, DepartmentGetItem, DepartmentNameInput } from '../../models/department';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';

const DepartmentItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Department>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const send = (): void => {
    const numberID = Number(id);
    const item: Department = {
      id: numberID,
      name,
      note,
    };

    SetItem(ws.current, numberID, 'Department', item, setStatus, auth.token);
  };

  const del = (): void => {
    const numberID = Number(id);
    DelItem(ws.current, numberID, 'Department', setStatus, auth.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws.current, 'Department', id, setLoaded, auth.token);
    AddEventMessageGet(ws.current, DepartmentGetItem, setData);

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [id, auth.token]);

  useEffect(() => {
    if (data) {
      setName(data.name);
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
          <DepartmentNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};

export { DepartmentItem };
