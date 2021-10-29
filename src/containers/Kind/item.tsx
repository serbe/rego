import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { Kind, KindNameInput, KindShortNameInput } from '../../models/kind';
import { useAuthState } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const KindItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [shortName, setShortName] = useState<string>();
  const [note, setNote] = useState<string>();
  const item = GetItem('Kind', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const kind: Kind = {
      id: NumberID,
      name,
      short_name: shortName,
      note,
    };

    SetItem(NumberID, 'Kind', kind, setStatus, auth.user.token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Kind', setStatus, auth.user.token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Kind;
      setName(data.name);
      setShortName(data.short_name);
      setNote(data.note);
    }
  }, [item]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  return (
    <div>
      {item && (
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
