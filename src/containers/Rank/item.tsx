import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem, SetItem } from '../../helpers/fetcher';
import { optionString } from '../../helpers/utils';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { Rank, RankNameInput } from '../../models/rank';

export const RankItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Rank', id);
  const [name, setName] = useState<string | undefined>();
  const [note, setNote] = useState<string | undefined>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Rank = {
      id: number_id,
      name: optionString(name),
      note: optionString(note),
    };

    SetItem(number_id, 'Rank', JSON.stringify(item));
    history.go(-1);
    return;
  };

  useEffect(() => {
    if (data?.id) {
      const c = data as Rank;
      setName(c.name);
      setNote(c.note);
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
          <RankNameInput value={name} setter={setName} />
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
