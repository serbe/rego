import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Select } from "../../components/select";
import { Company } from "../../models/company";
import { SelectItem, addEmptyStr, numToStr } from "../../models/selectitem";

export const CompanyItem: FC<{}> = () => {
  let { id } = useParams();
  const [hasError, setErrors] = useState();
  const [company, setCompany] = useState<Company>();
  const [scope, setScope] = useState<SelectItem>();
  const [scopes, setScopes] = useState<SelectItem[]>();
  const [emails, setEmails] = useState([""]);
  const [phones, setPhones] = useState([""]);
  const [faxes, setFaxes] = useState([""]);

  const handleEmails = (key: number, value: string) => {
    let newEmails = emails;
    newEmails[key] = value;
    setEmails(newEmails);
  }

  const blurEmails = () => {
    let newEmails = addEmptyStr(emails);
    setEmails(newEmails);
  }

  const handlePhones = (key: number, value: string) => {
    let newPhones = phones;
    newPhones[key] = value;
    setPhones(newPhones);
  }

  const blurPhones = () => {
    let newPhones = addEmptyStr(phones);
    setPhones(newPhones);
  }

  const handleFaxes = (key: number, value: string) => {
    let newFaxes = phones;
    newFaxes[key] = value;
    setFaxes(newFaxes);
  }

  const blurFaxes = () => {
    let newFaxes = addEmptyStr(faxes);
    setFaxes(newFaxes);
  }

  async function fetchData() {
    try {
      const resCompany = await fetch(`/api/go/company/item/${id}`);
      const companyJson = await resCompany.json();
      setCompany(companyJson.data["Company"]);
    } catch (err) {
      setErrors(err);
    }
  }

  async function fetchScopes() {
    try {
      const resScopes = await fetch(`/api/go/scope/select`);
      const scopesJson = await resScopes.json();
      setScopes(scopesJson.data["SelectItem"]);
    } catch (err) {
      setErrors(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchScopes();
  }, []);

  useEffect(() => {
    if (company && scopes) {
      setScope(scopes.find(v => v.id === company.scope_id));
      setEmails(addEmptyStr(company.emails));
      setPhones(addEmptyStr(numToStr(company.phones)));
      setFaxes(addEmptyStr(numToStr(company.faxes)));
    }
  }, [company, scopes]);

  const Scopes = () =>
    scopes && scope ? (
      <Select
        list={scopes}
        selected={scope}
        itemName="scope"
        label="Сфера деятельности"
        // inputRef={register}
      />
    ) : null;

  const Emails = () =>
    emails ? (
      <>
        {emails.map((email, index) => (
          <Input
            key={`email[${index}]`}
            name={`email[${index}]`}
            value={email}
            type="email"
            placeholder="Электронный адрес"
            iconLeft="envelope"
            // inputRef={register}
            onBlur={blurEmails}
            // pattern='/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
            // error="Неправильный email"
            onChange={(e: any) => handleEmails(index, e.currentTarget.value)}
          ></Input>
        ))}
      </>
    ) : null;

  const Phones = () =>
    phones ? (
      <>
        {phones.map((phone, index) => (
          <Input
            key={`phone${index}`}
            name={`phone[${index}]`}
            value={phone}
            type="tel"
            placeholder="Телефон"
            iconLeft="phone"
            // inputRef={register}
            onBlur={blurPhones}
            onChange={(e: any) => handlePhones(index, e.currentTarget.value)}
          ></Input>
        ))}
      </>
    ) : null;

  const Faxes = () =>
    faxes ? (
      <>
        {faxes.map((fax, index) => (
          <Input
            key={`fax${index}`}
            name={`fax[${index}]`}
            value={fax}
            type="tel"
            placeholder="Факс"
            iconLeft="phone"
            // inputRef={register}
            onBlur={blurFaxes}
            onChange={(e: any) => handleFaxes(index, e.currentTarget.value)}
          ></Input>
        ))}
      </>
    ) : null;

  const Practices = () =>
    company && company.practices ? (
      <div className="field" key="practices">
        <label className="label">Тренировки</label>
        {company.practices.map((practice, index) => (
          <NavLink key={`practice${index}`} to={`/practice/${practice.id}`}>
            <Input
              value={`${practice.date_str} - ${practice.kind_name} - ${practice.topic}`}
              iconLeft="history"
              readonly
            ></Input>
          </NavLink>
        ))}
      </div>
    ) : null;

  const Contacts = () =>
    company && company.contacts ? (
      <div className="field" key="contacts">
        <label className="label">Сотрудники</label>
        {company.contacts.map((contact, index) => (
          <NavLink key={`contact${index}`} to={`/contact/${contact.id}`}>
            <Input
              value={`${contact.name} - ${contact.post_name}`}
              iconLeft="user"
              readonly
            ></Input>
          </NavLink>
        ))}
      </div>
    ) : null;

  return (
    <div className="container mw768">
      {!hasError && company ? (
        <div>
          <Input
            name="name"
            value={company.name}
            // inputRef={register}
            label
            placeholder="Наименование организации"
            iconLeft="building"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany({...company, name: e.currentTarget.value})}
          />

          <Scopes />

          <Input
            name="address"
            value={company.address}
            // inputRef={register}
            label
            placeholder="Адрес"
            iconLeft="address-card"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany({...company, address: e.currentTarget.value})}
          />

          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Электронный адрес</label>
                <Emails />
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label className="label">Телефон</label>
                <Phones />
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label className="label">Факс</label>
                <Faxes />
              </div>
            </div>
          </div>

          <Practices />

          <Contacts />

          <Input
            name="note"
            value={company.note}
            // inputRef={register}
            label
            placeholder="Заметка"
            iconLeft="sticky-note"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany({...company, note: e.currentTarget.value})}
          />

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <Button
                color="primary"
                // @click="submit"
              >
                Сохранить
              </Button>
            </div>
            <div className="control">
              <Button>Закрыть</Button>
            </div>
            <div className="control">
              <Button
                color="danger"
                // onClick={() => {return confirm('Вы действительно хотите удалить эту запись?')}}
              >
                Удалить
              </Button>
            </div>
          </div>

          {/* <button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </button>
          <Button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </Button> */}
        </div>
      ) : null}
    </div>
  );
};
