import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { Rank, RankNameInput } from '../../models/rank';

export const RankItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Rank>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const send = (): void => {
    const number_id = Number(id);
    const item: Rank = {
      id: number_id,
      name: name,
      note: note,
    };

    SetItem(number_id, 'Rank', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'Rank', setStatus, state.token);
  };

  useEffect(() => {
    GetItem('Rank', id, setData, setLoaded, state.token);
  }, [id, state.token]);

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
          <RankNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
