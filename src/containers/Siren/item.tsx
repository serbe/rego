import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { DelItem, GetItem, SetItem } from '../../helpers/fetcher';
import { CompanyIDSelect } from '../../models/company';
import {
  AddressInput,
  ContactIDSelect,
  ItemFormButtons,
  NoteInput,
  ParameterTypes,
} from '../../models/impersonal';
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
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
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
  const [item] = GetItem('Siren', id);
  const [status, setStatus] = useState(false);

  const send = (): void => {
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

    SetItem(number_id, 'Siren', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(number_id, 'Siren', setStatus, state.token);
  };

  useEffect(() => {
    if (item) {
      const data = item as Siren;
      setNumberID(data.num_id);
      setNumberPassport(data.num_pass);
      setSirenTypeID(data.siren_type_id);
      setAddress(data.address);
      setRadio(data.radio);
      setDesk(data.desk);
      setContactID(data.contact_id);
      setCompanyID(data.company_id);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setStage(data.stage);
      setOwn(data.own);
      setNote(data.note);
    }
  }, [item]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  return (
    <div>
      {item && (
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

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
