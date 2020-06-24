import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GetItem } from '../../helpers/fetcher';
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
