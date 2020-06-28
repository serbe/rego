import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem, SetItem } from '../../helpers/fetcher';
import { optionDate, optionNumber, optionString } from '../../helpers/utils';
import {
  Education,
  EducationEndDateInput,
  EducationNameSelect,
  EducationStartDateInput,
} from '../../models/education';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { PostGoIDSelect } from '../../models/post';

export const EducationItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Education', id);
  const [contactID, setContactID] = useState<number | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [postID, setPostID] = useState<number | undefined>();
  const [note, setNote] = useState<string | undefined>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Education = {
      id: number_id,
      contact_id: optionNumber(contactID),
      start_date: optionDate(startDate),
      end_date: optionDate(endDate),
      post_id: optionNumber(postID),
      note: optionString(note),
    };

    SetItem(number_id, 'Education', JSON.stringify(item));
    history.go(-1);
    return;
  };

  useEffect(() => {
    if (data?.id) {
      const c = data as Education;
      setContactID(c.contact_id);
      setStartDate(c.start_date);
      setEndDate(c.end_date);
      setPostID(c.post_id);
      setNote(c.note);
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
          <EducationNameSelect id={contactID || 0} setter={setContactID} />
          <PostGoIDSelect id={postID || 0} setter={setPostID} />

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
              <button className="button" onClick={() => submit()}>
                Сохранить
              </button>
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
