import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { rws } from '../../netapi';

export const SirenItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const [numberID, setNumberID] = useState<number>(0);
  const [numberPassport, setNumberPassport] = useState('');
  const [sirenTypeID, setSirenTypeID] = useState<number>(0);
  const [address, setAddress] = useState('');
  const [radio, setRadio] = useState('');
  const [desk, setDesk] = useState('');
  const [contactID, setContactID] = useState<number>(0);
  const [companyID, setCompanyID] = useState<number>(0);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [stage, setStage] = useState<number>(0);
  const [own, setOwn] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      rws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as SirenJsonScheme;
        if (data?.name === 'Contact' && data.object.Siren) {
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
          setNote(c.note ? c.note : '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Siren"}}}`);

      return function cleanup(): void {
        rws.removeEventListener('message', (message: unknown) => {
          console.log('removeEventListener', message);
        });
      };
    }
  }, [
    id,
    setAddress,
    setDesk,
    setLatitude,
    setLongitude,
    setNote,
    setNumberPassport,
    setOwn,
    setRadio,
  ]);

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

          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
