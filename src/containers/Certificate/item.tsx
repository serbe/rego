import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import {
  Certificate,
  CertificateDateInput,
  CertificateNumberInput,
} from '../../models/certificate';
import { CompanyIDSelect } from '../../models/company';
import { ContactIDSelect } from '../../models/contact';
import { ItemFormButtons, NoteInput, ParameterTypes } from '../../models/impersonal';

export const CertificateItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
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

  const send = (): void => {
    const number_id = Number(id);
    const item: Certificate = {
      id: number_id,
      num: sNumber,
      contact_id: contactID,
      company_id: companyID,
      cert_date: certDate,
      note: note,
    };

    SetItem(number_id, 'Certificate', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'Certificate', setStatus, state.token);
  };

  useEffect(() => {
    GetItem('Certificate', id, setData, setLoaded, state.token);
  }, [id, state.token]);

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

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
