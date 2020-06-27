import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem, SetItem } from '../../helpers/fetcher';
import { optionNumber, optionString } from '../../helpers/utils';
import { CompanyIDSelect } from '../../models/company';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { KindIDSelect } from '../../models/kind';
import { Practice, PracticeDateInput, PracticeTopicInput } from '../../models/practice';

export const PracticeItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Practice', id);
  const [companyID, setCompanyID] = useState(0);
  const [kindID, setKindID] = useState(0);
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const submit = (): void => {
    const number_id = Number(id);
    const item: Practice = {
      id: number_id,
      company_id: optionNumber(companyID),
      kind_id: optionNumber(kindID),
      topic: optionString(topic),
      date_of_practice: optionString(date),
      note: optionString(note),
    };

    SetItem(number_id, 'Practice', JSON.stringify(item));
    history.go(-1);
    return;
  };

  useEffect(() => {
    if (data?.id) {
      const c = data as Practice;
      setCompanyID(c.company_id || 0);
      setKindID(c.kind_id || 0);
      setTopic(c.topic || '');
      setDate(c.date_of_practice || '');
      setNote(c.note || '');
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
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
        </>
      )}
    </div>
  );
};
