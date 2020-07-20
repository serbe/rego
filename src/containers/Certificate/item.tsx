import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, SetItem, URL } from '../../helpers/fetcher';
import {
  Certificate,
  CertificateDateInput,
  CertificateGetItem,
  CertificateNumberInput,
} from '../../models/certificate';
import { CompanyIDSelect } from '../../models/company';
import { ContactIDSelect } from '../../models/contact';
import { NoteInput, ParameterTypes } from '../../models/impersonal';

export const CertificateItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [sNumber, setSNumber] = useState<string>();
  const [contactID, setContactID] = useState<number>();
  const [companyID, setCompanyID] = useState<number>();
  const [certDate, setCertDate] = useState<string>();
  const [note, setNote] = useState<string>();
  const [data, setData] = useState<Certificate>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

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

    SetItem(ws, number_id, 'Certificate', item, setStatus);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws, 'Certificate', id, setLoaded);
    AddEventMessageGet(ws, CertificateGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    if (data) {
      setSNumber(data.num);
      setContactID(data.contact_id);
      setCompanyID(data.company_id);
      setCertDate(data.cert_date);
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
