import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addEmptyString, numberToString } from '../../helpers/utils';
import { CompanyIDSelect } from '../../models/company';
import { ContactBirthdayInput, ContactJsonScheme, ContactNameInput } from '../../models/contact';
import { DepartmentIDSelect } from '../../models/department';
import {
  EmailInputs,
  FaxInputs,
  NoteInput,
  ParameterTypes,
  PhoneInputs,
} from '../../models/impersonal';
import { PostGoIDSelect, PostIDSelect } from '../../models/post';
import { RankIDSelect } from '../../models/rank';
import { rws } from '../../netapi';

export const ContactItem = (): JSX.Element => {
  const { id } = useParams<ParameterTypes>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [postID, setPostID] = useState(0);
  const [departmentID, setDepartmentID] = useState(0);
  const [postGoID, setPostGoID] = useState(0);
  const [rankID, setRankID] = useState(0);
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState(['']);
  const [faxes, setFaxes] = useState(['']);
  const [companyID, setCompanyID] = useState(0);
  const [birthday, setBirthday] = useState('');
  const [note, setNote] = useState('');

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
          setNote(c.note || '');
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
  }, [id]);

  return (
    <div>
      {loaded && !error && (
        <>
          <ContactNameInput value={name} setter={setName} />
          <CompanyIDSelect id={companyID} setter={setCompanyID} />

          <div className="columns">
            <div className="column is-half">
              <PostIDSelect id={postID} setter={setPostID} />
            </div>
            <div className="column is-half">
              <DepartmentIDSelect id={departmentID} setter={setDepartmentID} />
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <PostGoIDSelect id={postGoID} setter={setPostGoID} />
            </div>
            <div className="column is-half">
              <RankIDSelect id={rankID} setter={setRankID} />
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-third">
              <ContactBirthdayInput value={birthday} setter={setBirthday} />
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

          <NoteInput value={note} setter={setNote} />

          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
