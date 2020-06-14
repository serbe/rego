import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { URL } from '../../helpers/utils';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { KindJsonScheme, KindNameInput, KindShortNameInput } from '../../models/kind';

export const KindItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      const ws = new WebSocket(URL);

      ws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as KindJsonScheme;
        if (data?.name === 'Kind' && data.object.Kind) {
          const c = data.object.Kind;
          setName(c.name || '');
          setShortName(c.short_name || '');
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });

      ws.addEventListener('open', () => {
        ws.send(`{"Get":{"Item":{"id": ${id}, "name": "Kind"}}}`);
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
          <KindNameInput value={name} setter={setName} />
          <KindShortNameInput value={shortName} setter={setShortName} />
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
