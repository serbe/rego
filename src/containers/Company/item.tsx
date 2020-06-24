import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GetItem } from '../../helpers/fetcher';
import { addEmptyString, numberToString } from '../../helpers/utils';
import { Company, CompanyNameInput } from '../../models/company';
import { ContactShort, ContactShortForm } from '../../models/contact';
import {
  AddressInput,
  EmailInputs,
  FaxInputs,
  NoteInput,
  ParameterTypes,
  PhoneInputs,
} from '../../models/impersonal';
import { PracticeList, PracticeListForm } from '../../models/practice';
import { ScopeIDSelect } from '../../models/scope';

export const CompanyItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [data, error] = GetItem('Company', id);
  const [name, setName] = useState('');
  const [scopeID, setScopeID] = useState(0);
  const [address, setAddress] = useState('');
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState(['']);
  const [faxes, setFaxes] = useState(['']);
  const [practices, setPractices] = useState<PracticeList[]>([]);
  const [contacts, setContacts] = useState<ContactShort[]>([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (data?.id !== 0) {
      const c = data as Company;
      setName(c.name || '');
      setScopeID(c.scope_id || 0);
      setAddress(c.address || '');
      setEmails(addEmptyString(c.emails));
      setPhones(addEmptyString(numberToString(c.phones)));
      setFaxes(addEmptyString(numberToString(c.faxes)));
      setPractices(c.practices || []);
      setContacts(c.contacts || []);
      setNote(c.note || '');
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>
      {loaded && !error && (
        <>
          <CompanyNameInput value={name} setter={setName} />
          <ScopeIDSelect id={scopeID} setter={setScopeID} />
          <AddressInput value={address} setter={setAddress} />

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

          <PracticeListForm practices={practices} />

          <ContactShortForm contacts={contacts} />

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
