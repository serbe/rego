import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { ScopeJsonScheme, ScopeNameInput } from '../../models/scope';
import { rws } from '../../netapi';

export const ScopeItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
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
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Scope"}}}`);

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
          <ScopeNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
