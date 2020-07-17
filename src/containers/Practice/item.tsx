import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
import { CompanyIDSelect } from '../../models/company';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { KindIDSelect } from '../../models/kind';
import {
  Practice,
  PracticeDateInput,
  PracticeGetItem,
  PracticeTopicInput,
} from '../../models/practice';

export const PracticeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [companyID, setCompanyID] = useState<number>();
  const [kindID, setKindID] = useState<number>();
  const [topic, setTopic] = useState<string>();
  const [date, setDate] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Practice>();
  const [status, setStatus] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Practice = {
      id: number_id,
      company_id: companyID,
      kind_id: kindID,
      topic: topic,
      date_of_practice: date,
      note: note,
    };

    SetItem(ws, number_id, 'Practice', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Practice', id);
    AddEventMessageGet(ws, PracticeGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);
  useEffect(() => {
    if (data?.id) {
      const c = data;
      setCompanyID(c.company_id);
      setKindID(c.kind_id);
      setTopic(c.topic);
      setDate(c.date_of_practice);
      setNote(c.note);
    }
    if (status) {
      history.go(-1);
    }
  }, [data, history, status]);

  return (
    <div>
      <CompanyIDSelect id={companyID} setter={setCompanyID} />
      <KindIDSelect id={kindID} setter={setKindID} />
      <PracticeTopicInput value={topic} setter={setTopic} />
      <PracticeDateInput value={date} setter={setDate} />
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
