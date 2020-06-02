import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import {
  EducationJsonScheme,
  EducationNameSelect,
  EducationStartDateInput,
  EducationEndDateInput,
} from '../../models/education';
import { PostGoIDSelect } from '../../models/post';
import { rws } from '../../netapi';

export const EducationItem = (): JSX.Element => {
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
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Education"}}}`);

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

          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
