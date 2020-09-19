import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAuthState } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, DelItem, SetItem, URL } from '../../helpers/fetcher';
import { CompanyIDSelect } from '../../models/company';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { KindIDSelect } from '../../models/kind';
import {
  Practice,
  PracticeDateInput,
  PracticeGetItem,
  PracticeTopicInput,
} from '../../models/practice';

export const PracticeItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [companyID, setCompanyID] = useState<number>();
  const [kindID, setKindID] = useState<number>();
  const [topic, setTopic] = useState<string>();
  const [date, setDate] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Practice>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const send = (): void => {
    const numberID = Number(id);
    const item: Practice = {
      id: numberID,
      company_id: companyID,
      kind_id: kindID,
      topic,
      date_of_practice: date,
      note,
    };

    SetItem(ws.current, numberID, 'Practice', item, setStatus, auth.token);
  };

  const del = (): void => {
    const numberID = Number(id);
    DelItem(ws.current, numberID, 'Practice', setStatus, auth.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws.current, 'Practice', id, setLoaded, auth.token);
    AddEventMessageGet(ws.current, PracticeGetItem, setData);

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [id, auth.token]);

  useEffect(() => {
    if (data) {
      setCompanyID(data.company_id);
      setKindID(data.kind_id);
      setTopic(data.topic);
      setDate(data.date_of_practice);
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
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <KindIDSelect id={kindID} setter={setKindID} />
          <PracticeTopicInput value={topic} setter={setTopic} />
          <PracticeDateInput value={date} setter={setDate} />
          <NoteInput value={note} setter={setNote} />

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
