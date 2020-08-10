import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { Kind, KindNameInput, KindShortNameInput } from '../../models/kind';

export const KindItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [shortName, setShortName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Kind>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const send = (): void => {
    const number_id = Number(id);
    const item: Kind = {
      id: number_id,
      name: name,
      short_name: shortName,
      note: note,
    };

    SetItem(number_id, 'Kind', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'Kind', setStatus, state.token);
  };

  useEffect(() => {
    GetItem('Kind', id, setData, setLoaded, state.token);
  }, [id, state.token]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setShortName(data.short_name);
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
          <KindNameInput value={name} setter={setName} />
          <KindShortNameInput value={shortName} setter={setShortName} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
