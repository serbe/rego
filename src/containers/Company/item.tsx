import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAuthState } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, DelItem, SetItem, URL } from '../../helpers/fetcher';
import {
  addEmptyString,
  filterArrayNumber,
  filterArrayString,
  numberToString,
} from '../../helpers/utils';
import { Company, CompanyGetItem, CompanyNameInput } from '../../models/company';
import { ContactShort, ContactShortForm } from '../../models/contact';
import {
  AddressInput,
  EmailInputs,
  FaxInputs,
  ItemFormButtons,
  NoteInput,
  ParameterTypes,
  PhoneInputs,
} from '../../models/impersonal';
import { PracticeList, PracticeListForm } from '../../models/practice';
import { ScopeIDSelect } from '../../models/scope';

export const CompanyItem = (): JSX.Element => {
  const { auth } = useAuthState();
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [scopeID, setScopeID] = useState<number>();
  const [note, setNote] = useState<string>();
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState(['']);
  const [faxes, setFaxes] = useState(['']);
  const [practices, setPractices] = useState<PracticeList[]>([]);
  const [contacts, setContacts] = useState<ContactShort[]>([]);
  const [data, setData] = useState<Company>();
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ws = useRef<WebSocket>();

  const send = (): void => {
    const numberID = Number(id);
    const item: Company = {
      id: numberID,
      name,
      address,
      scope_id: scopeID,
      note,
      emails: filterArrayString(emails),
      phones: filterArrayNumber(phones),
      faxes: filterArrayNumber(faxes),
    };

    SetItem(ws.current, numberID, 'Company', item, setStatus, auth.token);
  };

  const del = (): void => {
    const numberID = Number(id);
    DelItem(ws.current, numberID, 'Company', setStatus, auth.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws.current, 'Company', id, setLoaded, auth.token);
    AddEventMessageGet(ws.current, CompanyGetItem, setData);

    return (): void => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [id, auth.token]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setAddress(data.address);
      setScopeID(data.scope_id);
      setNote(data.note);
      setEmails(addEmptyString(data.emails));
      setPhones(addEmptyString(numberToString(data.phones)));
      setFaxes(addEmptyString(numberToString(data.faxes)));
      setPractices(data.practices || []);
      setContacts(data.contacts || []);
      setLoaded(true);
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

          <ItemFormButtons send={send} del={del} />
        </>
      )}
    </div>
  );
};
