import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import { CompanyIDSelect } from '../../models/company';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';
import { KindIDSelect } from '../../models/kind';
import { Practice, PracticeDateInput, PracticeTopicInput } from '../../models/practice';

export const PracticeItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
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

  const send = (): void => {
    const number_id = Number(id);
    const item: Practice = {
      id: number_id,
      company_id: companyID,
      kind_id: kindID,
      topic: topic,
      date_of_practice: date,
      note: note,
    };

    SetItem(number_id, 'Practice', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'Practice', setStatus, state.token);
  };

  useEffect(() => {
    GetItem('Practice', id, setData, setLoaded, state.token);
  }, [id, state.token]);

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
