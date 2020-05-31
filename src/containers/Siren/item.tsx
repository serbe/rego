import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addEmptyString, numberToString } from '../../helpers/utils';
import { CompanyIDSelect } from '../../models/company';
import { ContactBirthdayInput } from '../../models/contact';
import { SirenJsonScheme, SirenNumberIDInput, SirenNumberPassportInput } from '../../models/siren';
import { SirenTypeIDSelect } from '../../models/sirentype';
import { DepartmentIDSelect } from '../../models/department';
import {
  AddressInput,
  EmailInputs,
  FaxInputs,
  NoteInput,
  ParameterTypes,
  PhoneInputs,
} from '../../models/impersonal';
import { PostGoIDSelect, PostIDSelect } from '../../models/post';
import { RankIDSelect } from '../../models/rank';
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
  const [desc, setDesc] = useState('');
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
          setDesc(c.desk || '');
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
    setDesc,
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
          <SirenTypeIDSelect id={sirenTypeID} callback={setSirenTypeID} />
          <AddressInput value={address} setter={setAddress} />

          <CompanyIDSelect id={companyID} callback={setCompanyID} />

          <div className="columns">
            <div className="column is-half">
              <PostIDSelect id={postID} callback={setPostID} />
            </div>
            <div className="column is-half">
              <DepartmentIDSelect id={departmentID} callback={setDepartmentID} />
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <PostGoIDSelect id={postGoID} callback={setPostGoID} />
            </div>
            <div className="column is-half">
              <RankIDSelect id={rankID} callback={setRankID} />
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-third">
              <ContactBirthdayInput value={birthday} onChange={setBirthday} />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <EmailInputs emails={emails} setter={setEmails} />
            </div>
            <div className="column">
              <PhoneInputs phones={phones} setter={setPhones} />
            </div>
            <div className="column">
              <FaxInputs phones={faxes} setter={setFaxes} />
            </div>
          </div>

          <NoteInput value={note} onChange={changeNote} />

          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
