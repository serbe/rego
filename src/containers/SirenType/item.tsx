import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { URL } from '../../helpers/utils';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import {
  SirenTypeJsonScheme,
  SirenTypeNameInput,
  SirenTypeRadiusInput,
} from '../../models/sirentype';

export const SirenTypeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [radius, setRadius] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      const ws = new WebSocket(URL);

      ws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as SirenTypeJsonScheme;
        if (data?.name === 'SirenType' && data.object.SirenType) {
          const c = data.object.SirenType;
          setName(c.name || '');
          setRadius(c.radius || 0);
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });

      ws.addEventListener('open', () => {
        ws.send(`{"Get":{"Item":{"id": ${id}, "name": "Siren"}}}`);
      });

      return (): void => {
        ws.close();
      };
    }
  }, [id]);

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
