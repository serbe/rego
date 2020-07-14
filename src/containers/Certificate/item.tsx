import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem, SetItem, Status } from '../../helpers/fetcher';
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
  const [sNumber, setSNumber] = useState<string>();
  const [contactID, setContactID] = useState<number>();
  const [companyID, setCompanyID] = useState<number>();
  const [certDate, setCertDate] = useState<string>();
  const [note, setNote] = useState<string>();

  let status = Status.Loading;

  const submit = (): void => {
    const number_id = Number(id);
    const item: Certificate = {
      id: number_id,
      num: sNumber,
      contact_id: contactID,
      company_id: companyID,
      cert_date: certDate,
      note: note,
    };

    [status] = SetItem(number_id, 'Certificate', JSON.stringify(item));
    return;
  };

  useEffect(() => {
    if (status === Status.Complete) {
      history.go(-1);
    }
  }, [history, status]);

  useEffect(() => {
    if (data?.id) {
      const c = data as Certificate;
      setSNumber(c.num);
      setContactID(c.contact_id);
      setCompanyID(c.company_id);
      setCertDate(c.cert_date);
      setNote(c.note);
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
