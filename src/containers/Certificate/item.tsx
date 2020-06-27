import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem, SetItem } from '../../helpers/fetcher';
import { optionNumber, optionString } from '../../helpers/utils';
import {
  Certificate,
  CertificateDateInput,
  CertificateNumberInput,
} from '../../models/certificate';
import { CompanyIDSelect } from '../../models/company';
import { ContactIDSelect } from '../../models/contact';
import { NoteInput, ParameterTypes } from '../../models/impersonal';

export const CertificateItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Certificate', id);
  const [sNumber, setSNumber] = useState('');
  const [contactID, setContactID] = useState(0);
  const [companyID, setCompanyID] = useState(0);
  const [certDate, setCertDate] = useState('');
  const [note, setNote] = useState('');

  const submit = (): void => {
    const number_id = Number(id);
    const item: Certificate = {
      id: number_id,
      num: optionString(sNumber),
      contact_id: optionNumber(contactID),
      company_id: optionNumber(companyID),
      cert_date: optionString(certDate),
      note: optionString(note),
    };

    SetItem(number_id, 'Certificate', JSON.stringify(item));
    history.go(-1);
    return;
  };

  useEffect(() => {
    if (data?.id) {
      const c = data as Certificate;
      setSNumber(c.num || '');
      setContactID(c.contact_id || 0);
      setCompanyID(c.company_id || 0);
      setCertDate(c.cert_date || '');
      setNote(c.note || '');
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
          <CertificateNumberInput value={sNumber} setter={setSNumber} />
          <ContactIDSelect id={contactID} setter={setContactID} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <CertificateDateInput value={certDate} setter={setCertDate} />
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
