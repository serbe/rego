import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import {
  Education,
  EducationEndDateInput,
  EducationNameSelect,
  EducationStartDateInput,
} from '../../models/education';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { PostGoIDSelect } from '../../models/post';

export const EducationItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
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
    const number_id = Number(id);
    const item: Education = {
      id: number_id,
      contact_id: contactID,
      start_date: startDate,
      end_date: endDate,
      post_id: postID,
      note: note,
    };

    SetItem(number_id, 'Education', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'Education', setStatus, state.token);
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
