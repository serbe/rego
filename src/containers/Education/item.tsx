import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  Education,
  EducationEndDateInput,
  EducationNameSelect,
  EducationStartDateInput,
} from '../../models/education';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { PostGoIDSelect } from '../../models/post';
import { useAuthState } from '../../services/auth';
import { DelItem, GetItem, SetItem } from '../../services/fetcher';

export const EducationItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [contactID, setContactID] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [postID, setPostID] = useState<number>();
  const [note, setNote] = useState<string>();
  const item = GetItem('Education', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
    const NumberID = Number(id);
    const education: Education = {
      id: NumberID,
      contact_id: contactID,
      start_date: startDate,
      end_date: endDate,
      post_id: postID,
      note,
    };

    SetItem(NumberID, 'Education', education, setStatus, auth.user.token);
  };

  const del = (): void => {
    const NumberID = Number(id);
    DelItem(NumberID, 'Education', setStatus, auth.user.token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Education;
      setContactID(data.contact_id);
      setStartDate(data.start_date);
      setEndDate(data.end_date);
      setPostID(data.post_id);
      setNote(data.note);
    }
  }, [item]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  return (
    <div>
      {item && (
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

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
