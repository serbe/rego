import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../helpers/auth';
import { AddEventMessageGet, AddEventOpenItem, SetItem, URL, DelItem } from '../../helpers/fetcher';
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
  NoteInput,
  ParameterTypes,
  PhoneInputs,
  ItemFormButtons,
} from '../../models/impersonal';
import { PracticeList, PracticeListForm } from '../../models/practice';
import { ScopeIDSelect } from '../../models/scope';

export const CompanyItem = (): JSX.Element => {
  const { state } = useContext(AuthContext);
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
    const number_id = Number(id);
    const item: Company = {
      id: number_id,
      name: name,
      address: address,
      scope_id: scopeID,
      note: note,
      emails: filterArrayString(emails),
      phones: filterArrayNumber(phones),
      faxes: filterArrayNumber(faxes),
    };

    SetItem(ws, number_id, 'Company', item, setStatus, state.token);
  };

  const del = (): void => {
    const number_id = Number(id);
    DelItem(ws, number_id, 'Company', setStatus, state.token);
  };

  useEffect(() => {
    ws.current = new WebSocket(URL);

    AddEventOpenItem(ws, 'Company', id, setLoaded, state.token);
    AddEventMessageGet(ws, CompanyGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id, state.token]);

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
