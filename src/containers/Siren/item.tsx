import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAuthState } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, DelItem, SetItem, URL } from '../../helpers/fetcher';
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
  SirenGetItem,
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
  const { auth } = useAuthState();
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
  const [data, setData] = useState<Siren>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const send = (): void => {
    const sendNumberID = Number(id);
    const item: Siren = {
      id: sendNumberID,
      num_id: numberID,
      num_pass: numberPassport,
      siren_type_id: sirenTypeID,
      address,
      radio,
      desk,
      contact_id: contactID,
      company_id: companyID,
      latitude,
      longitude,
      stage,
      own,
      note,
    };

    SetItem(ws.current, sendNumberID, 'Siren', item, setStatus, auth.token);
  };

  const del = (): void => {
    const delNumberID = Number(id);
    DelItem(ws.current, delNumberID, 'Siren', setStatus, auth.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws.current, 'Siren', id, setLoaded, auth.token);
    AddEventMessageGet(ws.current, SirenGetItem, setData);

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [id, auth.token]);

  useEffect(() => {
    if (data) {
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
      setLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (status) {
      history.go(-1);
    }
  }, [history, status]);

  useEffect(() => {
    if (data) {
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
