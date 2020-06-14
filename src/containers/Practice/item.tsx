import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { URL } from '../../helpers/utils';
import { CompanyIDSelect } from '../../models/company';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { KindIDSelect } from '../../models/kind';
import { PracticeDateInput, PracticeJsonScheme, PracticeTopicInput } from '../../models/practice';

export const PracticeItem = (): JSX.Element => {
  const history = useHistory();
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
      const ws = new WebSocket(URL);

      ws.addEventListener('message', (message: MessageEvent) => {
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

      ws.addEventListener('open', () => {
        ws.send(`{"Get":{"Item":{"id": ${id}, "name": "Practice"}}}`);
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
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <KindIDSelect id={kindID} setter={setKindID} />
          <PracticeTopicInput value={topic} setter={setTopic} />
          <PracticeDateInput value={date} setter={setDate} />
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
