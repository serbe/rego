import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { SirenType, SirenTypeNameInput, SirenTypeRadiusInput } from '../../models/sirentype';

export const SirenTypeItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [radius, setRadius] = useState<number>();
  const [note, setNote] = useState<string>();
  const item = GetItem('SirenType', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const number_id = Number(id);
    const item: SirenType = {
      id: number_id,
      name: name,
      radius: radius,
      note: note,
    };

    SetItem(number_id, 'SirenType', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'SirenType', setStatus, state.token);
  };

  useEffect(() => {
    if (item) {
      const data = item as SirenType;
      setName(data.name);
      setRadius(data.radius);
      setNote(data.note);
    }
  }, [item, history, status]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  return (
    <div>
      {item && (
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
