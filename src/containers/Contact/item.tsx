import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addEmptyString, numberToString, useInput } from '../../helpers/utils';
import { CompanyIdSelect } from '../../models/company';
import { ContactBirthdayInput, ContactJsonScheme, ContactNameInput } from '../../models/contact';
import { DepartmentIdSelect } from '../../models/department';
import {
  EmailInputs,
  FaxInputs,
  NoteInput,
  ParameterTypes,
  PhoneInputs,
} from '../../models/impersonal';
import { PostGoIdSelect, PostIdSelect } from '../../models/post';
import { RankIdSelect } from '../../models/rank';
import { rws } from '../../netapi';

export const ContactItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>(() => '');
  const [name, changeName, setName] = useInput('');
  const [postID, setPostID] = useState<number>(() => 0);
  const [departmentID, setDepartmentID] = useState<number>(() => 0);
  const [postGoID, setPostGoID] = useState<number>(() => 0);
  const [rankID, setRankID] = useState<number>(() => 0);
  const [emails, setEmails] = useState<string[]>(() => ['']);
  const [phones, setPhones] = useState<string[]>(() => ['']);
  const [faxes, setFaxes] = useState<string[]>(() => ['']);
  const [companyID, setCompanyID] = useState<number>(0);
  const [birthday, setBirthday] = useState(() => '');
  const [note, changeNote, setNote] = useInput('');

  useEffect(() => {
    if (id !== '0') {
      rws.addEventListener('message', (message: MessageEvent) => {
        const data = JSON.parse(message.data) as ContactJsonScheme;
        if (data?.name === 'Contact' && data.object.Contact) {
          const c = data.object.Contact;
          setName(c.name || '');
          setCompanyID(c.company_id || 0);
          setPostID(c.post_id || 0);
          setDepartmentID(c.department_id || 0);
          setPostGoID(c.post_go_id || 0);
          setRankID(c.rank_id || 0);
          setBirthday(c.birthday || '');
          setEmails(addEmptyString(c.emails));
          setPhones(addEmptyString(numberToString(c.phones)));
          setFaxes(addEmptyString(numberToString(c.faxes)));
          setNote(c.note ? c.note : '');
          setLoaded(true);
        }
        if (data.error) {
          setError(data.error);
        }
      });
      rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Contact"}}}`);

      return function cleanup(): void {
        rws.removeEventListener('message', (message: unknown) => {
          console.log('removeEventListener', message);
        });
      };
    }
  }, [id, setBirthday, setName, setNote]);

  return (
    <div>
      {loaded && !error && (
        <>
          <ContactNameInput value={name} onChange={changeName} />
          <CompanyIdSelect id={companyID} callback={setCompanyID} />

          <div className="columns">
            <div className="column is-half">
              <PostIdSelect id={postID} callback={setPostID} />
            </div>
            <div className="column is-half">
              <DepartmentIdSelect id={departmentID} callback={setDepartmentID} />
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <PostGoIdSelect id={postGoID} callback={setPostGoID} />
            </div>
            <div className="column is-half">
              <RankIdSelect id={rankID} callback={setRankID} />
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
