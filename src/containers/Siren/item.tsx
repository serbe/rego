import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { URL } from '../../helpers/utils';
import { CompanyIDSelect } from '../../models/company';
import { AddressInput, ContactIDSelect, NoteInput, ParameterTypes } from '../../models/impersonal';
import {
  SirenDeskInput,
  SirenJsonScheme,
  SirenLatitudeInput,
  SirenLongtitudeInput,
  SirenNumberIDInput,
  SirenNumberPassportInput,
  SirenOwnInput,
  SirenRadioInput,
  SirenStageInput,
} from '../../models/siren';
import { SirenTypeIDSelect } from '../../models/sirentype';

export const SirenItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [numberID, setNumberID] = useState(0);
  const [numberPassport, setNumberPassport] = useState('');
  const [sirenTypeID, setSirenTypeID] = useState(0);
  const [address, setAddress] = useState('');
  const [radio, setRadio] = useState('');
  const [desk, setDesk] = useState('');
  const [contactID, setContactID] = useState(0);
  const [companyID, setCompanyID] = useState(0);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [stage, setStage] = useState(0);
  const [own, setOwn] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      const ws = new WebSocket(URL);

      ws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as SirenJsonScheme;
        if (data?.name === 'Siren' && data.object.Siren) {
          const c = data.object.Siren;
          setNumberID(c.num_id || 0);
          setNumberPassport(c.num_pass || '');
          setSirenTypeID(c.siren_type_id || 0);
          setAddress(c.address || '');
          setRadio(c.radio || '');
          setDesk(c.desk || '');
          setContactID(c.contact_id || 0);
          setCompanyID(c.company_id || 0);
          setLatitude(c.latitude || '');
          setLongitude(c.longitude || '');
          setStage(c.stage || 0);
          setOwn(c.own || '');
          setNote(c.note || '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });

      ws.addEventListener('open', () => {
        ws.send(`{"Get":{"Item":{"id": ${id}, "name": "Siren"}}}`);
      });

      return (): void => {
        ws.close();
      };
    }
  }, [id]);

  return (
    <div>
      {loaded && !error && (
        <>
          <SirenNumberIDInput value={numberID} setter={setNumberID} />
          <SirenNumberPassportInput value={numberPassport} setter={setNumberPassport} />
          <SirenTypeIDSelect id={sirenTypeID} setter={setSirenTypeID} />
          <AddressInput value={address} setter={setAddress} />
          <SirenRadioInput value={radio} setter={setRadio} />
          <SirenDeskInput value={desk} setter={setDesk} />
          <ContactIDSelect id={contactID} setter={setContactID} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />
          <SirenLatitudeInput value={latitude} setter={setLatitude} />
          <SirenLongtitudeInput value={longitude} setter={setLongitude} />
          <SirenStageInput value={stage} setter={setStage} />
          <SirenOwnInput value={own} setter={setOwn} />
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
