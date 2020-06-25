import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem } from '../../helpers/fetcher';
import { CompanyIDSelect } from '../../models/company';
import { AddressInput, ContactIDSelect, NoteInput, ParameterTypes } from '../../models/impersonal';
import {
  Siren,
  SirenDeskInput,
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
  const [loaded, setLoaded] = useState(id === '0' || false);
  const [data, error] = GetItem('Siren', id);
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
    if (data?.id) {
      const c = data as Siren;
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
  }, [data]);

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
