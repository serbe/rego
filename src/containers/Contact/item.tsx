import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AddEventMessageGet, AddEventOpenItem, NewWS, SetItem } from '../../helpers/fetcher';
import {
  addEmptyString,
  filterArrayNumber,
  filterArrayString,
  numberToString,
} from '../../helpers/utils';
import { CompanyIDSelect } from '../../models/company';
import {
  Contact,
  ContactBirthdayInput,
  ContactEducations,
  ContactGetItem,
  ContactNameInput,
} from '../../models/contact';
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

export const ContactItem = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ParameterTypes>();
  const [name, setName] = useState<string>();
  const [companyID, setCompanyID] = useState<number>();
  const [departmentID, setDepartmentID] = useState<number>();
  const [postID, setPostID] = useState<number>();
  const [postGoID, setPostGoID] = useState<number>();
  const [rankID, setRankID] = useState<number>();
  const [birthday, setBirthday] = useState<string>();
  const [note, setNote] = useState<string>();
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState(['']);
  const [faxes, setFaxes] = useState(['']);
  const [educations, setEducations] = useState<string[]>([]);
  const [data, setData] = useState<Contact>();
  const [status, setStatus] = useState(false);

  const ws = useRef<WebSocket>();

  const submit = (): void => {
    const number_id = Number(id);
    const item: Contact = {
      id: number_id,
      name: name,
      company_id: companyID,
      department_id: departmentID,
      post_id: postID,
      post_go_id: postGoID,
      rank_id: rankID,
      birthday: birthday,
      note: note,
      emails: filterArrayString(emails),
      phones: filterArrayNumber(phones),
      faxes: filterArrayNumber(faxes),
    };

    SetItem(ws, number_id, 'Contact', item, setStatus);
  };

  useEffect(() => {
    ws.current = NewWS;

    AddEventOpenItem(ws, 'Contact', id);
    AddEventMessageGet(ws, ContactGetItem, setData);

    return (): void => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    if (data?.id) {
      const c = data;
      setName(c.name);
      setCompanyID(c.company_id);
      setDepartmentID(c.department_id);
      setPostID(c.post_id);
      setPostGoID(c.post_go_id);
      setRankID(c.rank_id);
      setBirthday(c.birthday);
      setNote(c.note);
      setEmails(addEmptyString(c.emails));
      setPhones(addEmptyString(numberToString(c.phones)));
      setFaxes(addEmptyString(numberToString(c.faxes)));
      setEducations(c.educations || []);
    }
    if (status) {
      history.go(-1);
    }
  }, [data, history, status]);

  return (
    <div>
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

      <ContactEducations educations={educations} />

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
