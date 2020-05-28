import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addEmptyString, numberToString, useInput } from '../../helpers/utils';
import { CompanyNameInput, CompanyJsonScheme } from '../../models/company';
import { ScopeIdSelect } from '../../models/scope';
import { AddressInput } from '../../models/impersonal';
import { EmailInputs, NoteInput, PhoneInputs, FaxInputs } from '../../models/impersonal';
import { PracticeListForm, PracticeList } from '../../models/practice';
import { ContactShortForm, ContactShort } from '../../models/contact';
import { rws } from '../../netapi';

interface ParamTypes {
  id: string;
}

export const CompanyItem = (): JSX.Element => {
  const { id } = useParams<ParamTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>(() => '');
  const [name, changeName, setName] = useInput('');
  const [scopeID, setScopeID] = useState<number>(() => 0);
  const [address, changeAddress, setAddress] = useInput('');
  const [emails, setEmails] = useState<string[]>(() => ['']);
  const [phones, setPhones] = useState<string[]>(() => ['']);
  const [faxes, setFaxes] = useState<string[]>(() => ['']);
  const [practices, setPractices] = useState<PracticeList[]>(() => []);
  const [contacts, setContacts] = useState<ContactShort[]>(() => []);
  const [note, changeNote, setNote] = useInput('');

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
          <CompanyNameInput value={name} onChange={changeName} />
          <ScopeIdSelect id={scopeID} callback={setScopeID} />
          <AddressInput value={address} onChange={changeAddress} />

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

          <NoteInput value={note} onChange={changeNote} />

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
