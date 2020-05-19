import React, { ChangeEvent, useEffect, useState } from 'react';
import { addEmptyString, numberToString, useInput } from '../../helpers/utils';
import { Contact } from '../../models/contact';
import { DatePicker } from '../../components/datepicker';
import { FormField } from '../../components/formfield';
import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { SelectItem } from '../../models/selectitem';
import { rws } from '../../netapi';
import { useParams } from 'react-router-dom';

type CLWS = {
  name: string;
  object: {
    Contact?: Contact;
    SelectItem?: SelectItem[];
  };
  error?: string;
};

type InputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ContactItem = (): JSX.Element => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>(() => '');
  // const { formField, changeHandler } = useFormFields({
  //   name: '',
  //   companyID: 0,
  //   departmentID: 0,
  //   postID: 0,
  //   postGoID: 0,
  //   rankID: 0,
  //   birthday: '',
  //   emails: [''],
  //   phones: [''],
  //   faxes: [''],
  //   educations: [''],
  // });
  const [name, changeName, setName] = useInput('');
  const [postID, setPostID] = useState<number>(() => 0);
  const [departmentID, setDepartmentID] = useState<number>(() => 0);
  const [postGoID, setPostGoID] = useState<number>(() => 0);
  const [rankID, setRankID] = useState<number>(() => 0);
  const [emails, setEmails] = useState<string[]>(() => ['']);
  const [phones, setPhones] = useState<string[]>(() => ['']);
  const [faxes, setFaxes] = useState<string[]>(() => ['']);
  const [companyID, setCompanyID] = useState<number>(0);
  const [birthday, , setBirthday] = useInput('');
  const [note, changeNote, setNote] = useInput('');

  useEffect(() => {
    if (id && id !== 0) {
      rws.addEventListener('message', (message: MessageEvent) => {
        const data: CLWS = JSON.parse(message.data);
        if (data?.name === 'Contact' && data.object.Contact) {
          const c = data.object.Contact;
          setName(c.name ? c.name : '');
          setCompanyID(c.company_id ? c.company_id : 0);
          setPostID(c.post_id ? c.post_id : 0);
          setDepartmentID(c.department_id ? c.department_id : 0);
          setPostGoID(c.post_go_id ? c.post_go_id : 0);
          setRankID(c.rank_id ? c.rank_id : 0);
          setBirthday(c.birthday ? c.birthday : '');
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
          <FormField
            name="name"
            value={name}
            onChange={changeName}
            label="Фамилия Имя Отчество"
            icon="user"
          />
          <Select
            name="company"
            label="Организация"
            listName="CompanySelect"
            id={companyID}
            icon="building"
            callback={setCompanyID}
          />
          <div className="columns">
            <div className="column is-half">
              <Select
                name="post"
                label="Должность"
                listName="PostSelect"
                id={postID}
                icon="tag"
                callback={setPostID}
              />
            </div>
            <div className="column is-half">
              <Select
                name="departmen"
                label="Отдел"
                listName="DepartmentSelect"
                id={departmentID}
                icon="tag"
                callback={setDepartmentID}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <Select
                name="postgo"
                label="Должность ГО"
                listName="PostGoSelect"
                id={postGoID}
                icon="tag"
                callback={setPostGoID}
              />
            </div>
            <div className="column is-half">
              <Select
                name="rank"
                label="Звание"
                listName="RankSelect"
                id={rankID}
                icon="tag"
                callback={setRankID}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-third">
              <DatePicker
                name="birthday"
                label="Дата рождения"
                value={birthday}
                callback={setBirthday}
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="email-1-input">
                  Электронный адрес
                </label>
                {emails &&
                  emails.map((email, index) => (
                    <Input
                      name={`email-${index}-input`}
                      icon="envelope"
                      key={`email-${index}`}
                      value={email}
                      placeholder="Электронный адрес"
                      onBlur={(event): void => {
                        let values = emails;
                        values[index] = event.target.value;
                        values = addEmptyString(values);
                        setEmails(values);
                      }}
                      classNameDiv="pb5"
                    />
                  ))}
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="phone-1-input">
                  Телефон
                </label>
                {phones &&
                  phones.map((phone, index) => (
                    <Input
                      name={`phone-${index}-input`}
                      type="tel"
                      icon="phone"
                      key={`phone-${index}`}
                      value={phone.toString()}
                      placeholder="Телефон"
                      onBlur={(event): void => {
                        let values = phones;
                        values[index] = event.target.value;
                        values = addEmptyString(values);
                        setPhones(values);
                      }}
                      classNameDiv="pb5"
                    />
                  ))}
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="fax-1-input">
                  Факс
                </label>
                {faxes &&
                  faxes.map((fax, index) => (
                    <Input
                      name={`fax-${index}-input`}
                      type="tel"
                      icon="fax"
                      key={`fax-${index}`}
                      value={fax.toString()}
                      placeholder="Факс"
                      onBlur={(event): void => {
                        let values = faxes;
                        values[index] = event.target.value;
                        values = addEmptyString(values);
                        setFaxes(values);
                      }}
                      classNameDiv="pb5"
                    />
                  ))}
              </div>
            </div>
          </div>
          <FormField
            name="note"
            value={note}
            onChange={changeNote}
            label="Заметки"
            icon="comment"
          />
          <button className="button">Сохранить</button>
        </>
      )}
    </div>
  );
};
