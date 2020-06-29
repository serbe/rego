import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GetItem, SetItem } from '../../helpers/fetcher';
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
  const [numberID, setNumberID] = useState<number>();
  const [numberPassport, setNumberPassport] = useState<string>();
  const [sirenTypeID, setSirenTypeID] = useState<number>();
  const [address, setAddress] = useState<string>();
  const [radio, setRadio] = useState<string>();
  const [desk, setDesk] = useState<string>();
  const [contactID, setContactID] = useState<number>();
  const [companyID, setCompanyID] = useState<number>();
  const [latitude, setLatitude] = useState<string>();
  const [longitude, setLongitude] = useState<string>();
  const [stage, setStage] = useState<number>();
  const [own, setOwn] = useState<string>();
  const [note, setNote] = useState<string>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Siren = {
      id: number_id,
      num_id: numberID,
      num_pass: numberPassport,
      siren_type_id: sirenTypeID,
      address: address,
      radio: radio,
      desk: desk,
      contact_id: contactID,
      company_id: companyID,
      latitude: latitude,
      longitude: longitude,
      stage: stage,
      own: own,
      note: note,
    };

    SetItem(number_id, 'Siren', JSON.stringify(item));
    history.go(-1);
    return;
  };

  useEffect(() => {
    if (data?.id) {
      const c = data as Siren;
      setNumberID(c.num_id);
      setNumberPassport(c.num_pass);
      setSirenTypeID(c.siren_type_id);
      setAddress(c.address);
      setRadio(c.radio);
      setDesk(c.desk);
      setContactID(c.contact_id);
      setCompanyID(c.company_id);
      setLatitude(c.latitude);
      setLongitude(c.longitude);
      setStage(c.stage);
      setOwn(c.own);
      setNote(c.note);
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
