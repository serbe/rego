import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { URL } from '../../helpers/utils';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { RankJsonScheme, RankNameInput } from '../../models/rank';

export const RankItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      const ws = new WebSocket(URL);

      ws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as RankJsonScheme;
        if (data?.name === 'Rank' && data.object.Rank) {
          const c = data.object.Rank;
          setName(c.name || '');
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });

      ws.addEventListener('open', () => {
        ws.send(`{"Get":{"Item":{"id": ${id}, "name": "Rank"}}}`);
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
          <RankNameInput value={name} setter={setName} />
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
