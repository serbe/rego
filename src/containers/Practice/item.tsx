import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { CompanyIDSelect } from '../../models/company';
import { KindIDSelect } from '../../models/kind';
import { PracticeJsonScheme, PracticeTopicInput, PracticeDateInput } from '../../models/practice';
import { rws } from '../../netapi';

export const PracticeItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [companyID, setCompanyID] = useState(0);
  const [kindID, setKindID] = useState(0);
  const [date, setDate] = useState('');
  const [topic, setTopic] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      rws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as PracticeJsonScheme;
        if (data?.name === 'Practice' && data.object.Practice) {
          const c = data.object.Practice;
          setCompanyID(c.company_id || 0);
          setKindID(c.kind_id || 0);
          setTopic(c.topic || '');
          setDate(c.date_of_practice || '');
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Practice"}}}`);

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
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <KindIDSelect id={kindID} setter={setKindID} />
          <PracticeTopicInput value={topic} setter={setTopic} />
          <PracticeDateInput value={date} setter={setDate} />
          <NoteInput value={note} setter={setNote} />

          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
