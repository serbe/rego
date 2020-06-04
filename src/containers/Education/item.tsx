import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  EducationEndDateInput,
  EducationJsonScheme,
  EducationNameSelect,
  EducationStartDateInput,
} from '../../models/education';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { PostGoIDSelect } from '../../models/post';

export const EducationItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [contactID, setContactID] = useState(0);
  const [postID, setPostID] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      const rws = new ReconnectingWebSocket('ws://127.0.0.1:9090');

      rws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as EducationJsonScheme;
        if (data?.name === 'Education' && data.object.Education) {
          const c = data.object.Education;
          setContactID(c.contact_id || 0);
          setPostID(c.post_id || 0);
          setStartDate(c.start_date || '');
          setEndDate(c.end_date || '');
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });

      rws.addEventListener('open', () => {
        rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Education"}}}`);
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
          <EducationNameSelect id={contactID} setter={setContactID} />
          <PostGoIDSelect id={postID} setter={setPostID} />

          <div className="columns">
            <div className="column">
              <EducationStartDateInput value={startDate} setter={setStartDate} />
            </div>
            <div className="column">
              <EducationEndDateInput value={endDate} setter={setEndDate} />
            </div>
          </div>

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
