import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
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
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Certificate', id);
    AddEventMessageGet(ws, CertificateGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    // if (status === Status.Complete) {
    //   history.go(-1);
    // }
  }, []);

  useEffect(() => {
    if (data?.id) {
      const c = data;
      setSNumber(c.num);
      setContactID(c.contact_id);
      setCompanyID(c.company_id);
      setCertDate(c.cert_date);
      setNote(c.note);
    }
    if (status) {
      history.go(-1);
    }
  }, [data, history, status]);

  return (
    <div>
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
    </div>
  );
};
