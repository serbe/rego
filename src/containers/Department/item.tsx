import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem } from '../../helpers/fetcher';
import { Department, DepartmentNameInput } from '../../models/department';
import { NoteInput, ParameterTypes } from '../../models/impersonal';

export const DepartmentItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Department', id);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (data?.id) {
      const c = data as Department;
      setName(c.name || '');
      setNote(c.note || '');
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
          <DepartmentNameInput value={name} setter={setName} />
          <NoteInput value={note} setter={setNote} />

          <div className="field is-grouped">
            <div className="control">
              <button className="button">Сохранить</button>
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
