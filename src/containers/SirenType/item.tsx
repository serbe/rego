import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GetItem } from '../../helpers/fetcher';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { SirenType, SirenTypeNameInput, SirenTypeRadiusInput } from '../../models/sirentype';

export const SirenTypeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('SirenType', id);
  const [name, setName] = useState('');
  const [radius, setRadius] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (data?.id) {
      const c = data as SirenType;
      setName(c.name || '');
      setRadius(c.radius || 0);
      setNote(c.note || '');
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
              <button className="button">Сохранить</button>
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
