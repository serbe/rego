import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
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
} from '../../models/impersonal';
import { PracticeList, PracticeListForm } from '../../models/practice';
import { ScopeIDSelect } from '../../models/scope';

export const CompanyItem = (): JSX.Element => {
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

  const ws = useRef<WebSocket>();

  const submit = (): void => {
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

    SetItem(ws, number_id, 'Company', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Company', id);
    AddEventMessageGet(ws, CompanyGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    if (data?.id) {
      const c = data;
      setName(c.name);
      setAddress(c.address);
      setScopeID(c.scope_id);
      setNote(c.note);
      setEmails(addEmptyString(c.emails));
      setPhones(addEmptyString(numberToString(c.phones)));
      setFaxes(addEmptyString(numberToString(c.faxes)));
      setPractices(c.practices || []);
      setContacts(c.contacts || []);
    }
    if (status) {
      history.go(-1);
    }
  }, [data, history, status]);

  return (
    <div>
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
    </div>
  );
};
