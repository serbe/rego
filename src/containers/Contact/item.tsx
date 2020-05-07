import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

import { Contact } from '../../models/contact';
import { SelectItem } from '../../models/selectitem';
import { rws } from '../../netapi';
import { FormField } from '../../components/formfield';
import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { DatePicker } from '../../components/datepicker';
import { addEmptyString, numberToString, useInput } from '../../helpers/utils';

type CLWS = {
  name: string;
  object: {
    Contact?: Contact;
    SelectItem?: SelectItem[];
  };
  error?: string;
};

// const onSubmit = (data: any) => console.log(data);

export const ContactItem = (): JSX.Element => {
  // const { register, handleSubmit, watch, errors } = useForm();

  const [error, setError] = useState<string>();
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

  const [name, changeName, setName] = useInput('');

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data?.name === 'Contact' && data.object.Contact) {
        const c = data.object.Contact;
        setName(c.name ? c.name : '');

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

  // const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setName(value);
  // }, []);

  const onChangeCompany = useCallback((value: number) => {
    setCompanyID(value);
  }, []);

  const onChangePost = useCallback((value: number) => {
    setPostID(value);
  }, []);

  const onChangeDepartment = useCallback((value: number) => {
    setDepartmentID(value);
  }, []);

  const onChangePostGO = useCallback((value: number) => {
    setPostGoID(value);
  }, []);

  const onChangeRank = useCallback((value: number) => {
    setRankID(value);
  }, []);

  const onChangeBirthday = useCallback((value: string) => {
    setBirthday(value);
  }, []);

  // const onChangeDepartment = useCallback((value: number) => {
  //   setDepartmentID(value);
  // }, []);

  // const onChangeDepartment = useCallback((value: number) => {
  //   setDepartmentID(value);
  // }, []);

  const Company = (): JSX.Element => (
    <Select
      name="company"
      label="Организация"
      listName="CompanySelect"
      id={companyID}
      icon="building"
      callback={onChangeCompany}
    />
  );

  const Post = (): JSX.Element => (
    <Select
      label="Должность"
      listName="PostSelect"
      id={postID}
      icon="tag"
      callback={onChangePost}
    />
  );

  const Department = (): JSX.Element => (
    <Select
      label="Отдел"
      listName="DepartmentSelect"
      id={departmentID}
      icon="tag"
      callback={onChangeDepartment}
    />
  );

  const PostGO = (): JSX.Element => (
    <Select
      label="Должность ГО"
      listName="PostGoSelect"
      id={postGoID}
      icon="tag"
      callback={onChangePostGO}
    />
  );

  const Rank = (): JSX.Element => (
    <Select label="Звание" listName="RankSelect" id={rankID} icon="tag" callback={onChangeRank} />
  );

  const Birthday = (): JSX.Element => (
    <DatePicker label="Дата рождения" value={birthday} callback={onChangeBirthday} />
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
          <FormField
            name="name"
            label="Фамилия Имя Отчество"
            icon="user"
            value={name}
            onChange={changeName}
          />
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
