import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
import {
  Education,
  EducationEndDateInput,
  EducationGetItem,
  EducationNameSelect,
  EducationStartDateInput,
} from '../../models/education';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { PostGoIDSelect } from '../../models/post';

export const EducationItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [contactID, setContactID] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [postID, setPostID] = useState<number>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Education>();
  const [status, setStatus] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Education = {
      id: number_id,
      contact_id: contactID,
      start_date: startDate,
      end_date: endDate,
      post_id: postID,
      note: note,
    };

    SetItem(ws, number_id, 'Education', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Education', id);
    AddEventMessageGet(ws, EducationGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    if (data?.id) {
      const c = data;
      setContactID(c.contact_id);
      setStartDate(c.start_date);
      setEndDate(c.end_date);
      setPostID(c.post_id);
      setNote(c.note);
    }
    if (status) {
      history.go(-1);
    }
  }, [data, history, status]);

  return (
    <div>
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
    </div>
  );
};
