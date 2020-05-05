import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Contact } from '../../models/contact';
import { SelectItem } from '../../models/selectitem';
import { rws } from '../../netapi';
import { FormField } from '../../components/formfield';
import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { DatePicker } from '../../components/datepicker';
import { addEmptyString, numberToString } from '../../helpers/utils';

type CLWS = {
  name: string;
  object: {
    Contact?: Contact;
    SelectItem?: SelectItem[];
  };
  error?: string;
};

export const ContactItem = (): JSX.Element => {
  const [error, setError] = useState<string>();
  const [name, setName] = useState<string>();
  const [companyID, setCompanyID] = useState<number>();
  const [postID, setPostID] = useState<number>();
  const [departmentID, setDepartmentID] = useState<number>();
  const [postGoID, setPostGoID] = useState<number>();
  const [rankID, setRankID] = useState<number>();
  const [birthday, setBirthday] = useState<string>();
  const [emails, setEmails] = useState<string[]>();
  const [phones, setPhones] = useState<string[]>();
  const [faxes, setFaxes] = useState<string[]>();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data?.name === 'Contact' && data.object.Contact) {
        setName(data.object.Contact.name);
        setCompanyID(data.object.Contact.company_id);
        setPostID(data.object.Contact.post_id);
        setDepartmentID(data.object.Contact.department_id);
        setPostGoID(data.object.Contact.post_go_id);
        setRankID(data.object.Contact.rank_id);
        setBirthday(data.object.Contact.birthday);
        setEmails(addEmptyString(data.object.Contact.emails));
        setPhones(addEmptyString(numberToString(data.object.Contact.phones)));
        setFaxes(addEmptyString(numberToString(data.object.Contact.faxes)));
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
  }, [id]);

  const Name = (): JSX.Element => (
    <FormField
      label="Фамилия Имя Отчество"
      icon="user"
      defaultValue={name}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
      }}
    />
  );

  const Company = (): JSX.Element => (
    <Select
      label="Организация"
      listName="CompanySelect"
      id={companyID}
      icon="building"
      callback={(value: number): void => {
        setCompanyID(value);
      }}
    />
  );

  const Post = (): JSX.Element => (
    <Select
      label="Должность"
      listName="PostSelect"
      id={postID}
      icon="tag"
      callback={(value: number): void => {
        setPostID(value);
      }}
    />
  );

  const Department = (): JSX.Element => (
    <Select
      label="Отдел"
      listName="DepartmentSelect"
      id={departmentID}
      icon="tag"
      callback={(value: number): void => {
        setDepartmentID(value);
      }}
    />
  );

  const PostGO = (): JSX.Element => (
    <Select
      label="Должность ГО"
      listName="PostGoSelect"
      id={postGoID}
      icon="tag"
      callback={(value: number): void => {
        setPostGoID(value);
      }}
    />
  );

  const Rank = (): JSX.Element => (
    <Select
      label="Звание"
      listName="RankSelect"
      id={rankID}
      icon="tag"
      callback={(value: number): void => {
        setRankID(value);
      }}
    />
  );

  const Birthday = (): JSX.Element => (
    <DatePicker
      label="Дата рождения"
      value={birthday}
      callback={(value: string): void => {
        setBirthday(value);
      }}
    />
  );

  const Emails = (): JSX.Element => (
    <div className="field">
      <label className="label">Электронный адрес</label>
      {emails
        ? emails.map((email, index) => (
            <Input
              icon="envelope"
              key={`email-${index}`}
              defaultValue={email}
              placeholder="Электронный адрес"
              onBlur={(event): void => {
                let values = emails;
                values[index] = event.target.value;
                values = addEmptyString(values);
                setEmails(values);
              }}
            />
          ))
        : null}
    </div>
  );

  const Phones = (): JSX.Element => (
    <div className="field">
      <label className="label">Телефон</label>
      {phones
        ? phones.map((phone, index) => (
            <Input
              type="tel"
              icon="phone"
              key={`phone-${index}`}
              defaultValue={phone.toString()}
              placeholder="Телефон"
              onBlur={(event): void => {
                let values = phones;
                values[index] = event.target.value;
                values = addEmptyString(values);
                setPhones(values);
              }}
              classNameDiv="pb5"
            />
          ))
        : null}
    </div>
  );

  const Faxes = (): JSX.Element => (
    <div className="field">
      <label className="label">Факс</label>
      {faxes
        ? faxes.map((fax, index) => (
            <Input
              type="tel"
              icon="fax"
              key={`fax-${index}`}
              defaultValue={fax.toString()}
              placeholder="Факс"
              onBlur={(event): void => {
                let values = faxes;
                values[index] = event.target.value;
                values = addEmptyString(values);
                setFaxes(values);
              }}
            />
          ))
        : null}
    </div>
  );

  return (
    <div>
      {loaded && !error ? (
        <>
          <Name />
          <Company />
          <div className="columns">
            <div className="column is-half">
              <Post key="post" />
            </div>
            <div className="column is-half">
              <Department />
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <PostGO />
            </div>
            <div className="column is-half">
              <Rank />
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-third">
              <Birthday />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <Emails />
            </div>
            <div className="column">
              <Phones />
            </div>
            <div className="column">
              <Faxes />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
