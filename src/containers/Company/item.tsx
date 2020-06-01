import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addEmptyString, numberToString } from '../../helpers/utils';
import { CompanyJsonScheme, CompanyNameInput } from '../../models/company';
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
import { rws } from '../../netapi';

export const CompanyItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState('');
  const [scopeID, setScopeID] = useState<number>(0);
  const [address, setAddress] = useState('');
  const [emails, setEmails] = useState<string[]>(() => ['']);
  const [phones, setPhones] = useState<string[]>(() => ['']);
  const [faxes, setFaxes] = useState<string[]>(() => ['']);
  const [practices, setPractices] = useState<PracticeList[]>(() => []);
  const [contacts, setContacts] = useState<ContactShort[]>(() => []);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id !== '0') {
      rws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as CompanyJsonScheme;
        if (data?.name === 'Company' && data.object.Company) {
          const c = data.object.Company;
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
        if (data.error) {
          setError(data.error);
        }
      });
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Company"}}}`);

      return function cleanup(): void {
        rws.removeEventListener('message', (message: unknown) => {
          console.log('removeEventListener', message);
        });
      };
    }
  }, [id, setAddress, setName, setNote]);

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

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button
                color="primary"
                // @click="submit"
              >
                Сохранить
              </button>
            </div>
            <div className="control">
              <button>Закрыть</button>
            </div>
            <div className="control">
              <button
                color="danger"
                // onClick={() => {return confirm('Вы действительно хотите удалить эту запись?')}}
              >
                Удалить
              </button>
            </div>
          </div>

          {/* <button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </button>
          <button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </button> */}
        </>
      )}
    </div>
  );
};
