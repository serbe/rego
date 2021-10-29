import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { SirenType, SirenTypeNameInput, SirenTypeRadiusInput } from '../../models/sirentype';
import { useAuthState } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const SirenTypeItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [radius, setRadius] = useState<number>();
  const [note, setNote] = useState<string>();
  const item = GetItem('SirenType', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const sirenType: SirenType = {
      id: NumberID,
      name,
      radius,
      note,
    };

    SetItem(NumberID, 'SirenType', sirenType, setStatus, auth.user.token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'SirenType', setStatus, auth.user.token);
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
