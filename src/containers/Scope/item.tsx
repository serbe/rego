import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { ScopeJsonScheme, ScopeNameInput } from '../../models/scope';

export const ScopeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      const rws = new ReconnectingWebSocket('ws://127.0.0.1:9090');

      rws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as ScopeJsonScheme;
        if (data?.name === 'Scope' && data.object.Scope) {
          const c = data.object.Scope;
          setName(c.name || '');
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });

      rws.addEventListener('open', () => {
        rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Scope"}}}`);
      });

      rws.onclose = () => {
        rws.close();
      };

      return (): void => {
        rws.close();
      };
    }
  }, [id]);

  return (
    <div>
      {loaded && !error && (
        <>
          <ScopeNameInput value={name} setter={setName} />
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
