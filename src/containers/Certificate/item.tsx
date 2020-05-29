import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInput } from '../../helpers/utils';
import {
  CertificateDateInput,
  CertificateJsonScheme,
  CertificateNumberInput,
} from '../../models/certificate';
import { CompanyIdSelect } from '../../models/company';
import { ContactIdSelect } from '../../models/contact';
import { NoteInput, ParameterTypes } from '../../models/impersonal';
import { rws } from '../../netapi';

export const CertificateItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>(() => '');
  const [sNumber, changeSNumber, setSNumber] = useInput('');
  const [contactID, setContactID] = useState<number>(() => 0);
  const [companyID, setCompanyID] = useState<number>(() => 0);
  const [certDate, setCertDate] = useState<string>(() => '');
  const [note, changeNote, setNote] = useInput('');

  useEffect(() => {
    if (id !== '0') {
      rws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as CertificateJsonScheme;
        if (data?.name === 'Certificate' && data.object.Certificate) {
          const c = data.object.Certificate;
          setSNumber(c.num || '');
          setContactID(c.contact_id || 0);
          setCompanyID(c.company_id || 0);
          setCertDate(c.cert_date || '');
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Certificate"}}}`);

      return function cleanup(): void {
        rws.removeEventListener('message', (message: unknown) => {
          console.log('removeEventListener', message);
        });
      };
    }
  }, [id, setCertDate, setNote, setSNumber]);

  return (
    <div>
      {loaded && !error && (
        <>
          <CertificateNumberInput value={sNumber} onChange={changeSNumber} />
          <ContactIdSelect id={contactID} callback={setContactID} />
          <CompanyIdSelect id={companyID} callback={setCompanyID} />
          <CertificateDateInput value={certDate} onChange={setCertDate} />
          <NoteInput value={note} onChange={changeNote} />

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              {/* <Button
                color="primary"
                // @click="submit"
              >
                Сохранить
              </Button> */}
            </div>
            <div className="control">{/* <Button>Закрыть</Button> */}</div>
            <div className="control">
              {/* <Button
                color="danger"
                // onClick={() => {return confirm('Вы действительно хотите удалить эту запись?')}}
              >
                Удалить
              </Button> */}
            </div>
          </div>

          {/* <button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </button>
          <Button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </Button> */}
        </>
      )}
    </div>
  );
};
