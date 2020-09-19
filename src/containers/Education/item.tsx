import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAuthState } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, DelItem, SetItem, URL } from '../../helpers/fetcher';
import {
  Education,
  EducationEndDateInput,
  EducationGetItem,
  EducationNameSelect,
  EducationStartDateInput,
} from '../../models/education';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { PostGoIDSelect } from '../../models/post';

export const EducationItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [contactID, setContactID] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [postID, setPostID] = useState<number>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Education>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const send = (): void => {
    const numberID = Number(id);
    const item: Education = {
      id: numberID,
      contact_id: contactID,
      start_date: startDate,
      end_date: endDate,
      post_id: postID,
      note,
    };

    SetItem(ws.current, numberID, 'Education', item, setStatus, auth.token);
  };

  const del = (): void => {
    const numberID = Number(id);
    DelItem(ws.current, numberID, 'Education', setStatus, auth.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws.current, 'Education', id, setLoaded, auth.token);
    AddEventMessageGet(ws.current, EducationGetItem, setData);

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [id, auth.token]);

  useEffect(() => {
    if (data) {
      setContactID(data.contact_id);
      setStartDate(data.start_date);
      setEndDate(data.end_date);
      setPostID(data.post_id);
      setNote(data.note);
      setLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  return (
    <div>
      {loaded && (
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
