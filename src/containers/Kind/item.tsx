import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { KindJsonScheme, KindNameInput, KindShortNameInput } from '../../models/kind';
import { rws } from '../../netapi';

export const KindItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      rws.addEventListener('message', (message: MessageEvent) => {
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
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Kind"}}}`);

      return function cleanup(): void {
        rws.removeEventListener('message', (message: unknown) => {
          console.log('removeEventListener', message);
        });
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

          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
