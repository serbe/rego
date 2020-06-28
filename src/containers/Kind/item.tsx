import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem, SetItem } from '../../helpers/fetcher';
import { optionString } from '../../helpers/utils';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { Kind, KindNameInput, KindShortNameInput } from '../../models/kind';

export const KindItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Kind', id);
  const [name, setName] = useState<string | undefined>();
  const [shortName, setShortName] = useState<string | undefined>();
  const [note, setNote] = useState<string | undefined>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Kind = {
      id: number_id,
      name: optionString(name),
      short_name: optionString(shortName),
      note: optionString(note),
    };

    SetItem(number_id, 'Kind', JSON.stringify(item));
    history.go(-1);
    return;
  };

  useEffect(() => {
    if (data?.id) {
      const c = data as Kind;
      setName(c.name);
      setShortName(c.short_name);
      setNote(c.note);
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
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
        </>
      )}
    </div>
  );
};
