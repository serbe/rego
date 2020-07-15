import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { SetItem, URL } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { SirenType, SirenTypeNameInput, SirenTypeRadiusInput } from '../../models/sirentype';

export const SirenTypeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [name, setName] = useState<string>();
  const [radius, setRadius] = useState<number>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<SirenType>();
  const [error, setError] = useState<string>();

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: SirenType = {
      id: number_id,
      name: name,
      radius: radius,
      note: note,
    };

    SetItem(ws, number_id, 'SirenType', item);
    history.go(-1);
    return;
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);
  }, []);

  useEffect(() => {
    if (data?.id) {
      const c = data as SirenType;
      setName(c.name);
      setRadius(c.radius);
      setNote(c.note);
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
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
