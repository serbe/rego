import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Select } from '../../components/select';
import { Company } from '../../models/company';
import { SelectItem } from '../../models/selectitem';
import { addEmptyString, numberToString, fetchData } from '../../helpers/utils';

export const CompanyItem: FC<{}> = () => {
  const { id } = useParams();
  const [hasError, setErrors] = useState(false);
  const [company, setCompany] = useState<Company>();
  const [scope, setScope] = useState<SelectItem>();
  const [scopes, setScopes] = useState<SelectItem[]>();
  const [emails, setEmails] = useState(['']);
  const [phones, setPhones] = useState(['']);
  const [faxes, setFaxes] = useState(['']);

  const handleEmails = (key: number, value: string): void => {
    const newEmails = emails;
    newEmails[key] = value;
    setEmails(newEmails);
  };

  const blurEmails = (): void => {
    const newEmails = addEmptyString(emails);
    setEmails(newEmails);
  };

  const handlePhones = (key: number, value: string): void => {
    const newPhones = phones;
    newPhones[key] = value;
    setPhones(newPhones);
  };

  const blurPhones = (): void => {
    const newPhones = addEmptyString(phones);
    setPhones(newPhones);
  };

  const handleFaxes = (key: number, value: string): void => {
    const newFaxes = phones;
    newFaxes[key] = value;
    setFaxes(newFaxes);
  };

  const blurFaxes = (): void => {
    const newFaxes = addEmptyString(faxes);
    setFaxes(newFaxes);
  };

  useEffect(() => {
    if (id) {
      fetchData(`/api/go/company/item/${id}`)
        .then((responseJson) =>
          responseJson.Company ? setCompany(responseJson.Company) : setErrors(true),
        )
        .catch((error) => setErrors(error));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData(`/api/go/scope/select`)
        .then((responseJson) =>
          responseJson.SelectItem ? setScopes(responseJson.SelectItem) : setErrors(true),
        )
        .catch((error) => setErrors(error));
    }
  }, [id]);

  useEffect(() => {
    if (company && scopes) {
      setScope(scopes.find((v) => v.id === company.scope_id));
      setEmails(addEmptyString(company.emails));
      setPhones(addEmptyString(numberToString(company.phones)));
      setFaxes(addEmptyString(numberToString(company.faxes)));
    }
  }, [company, scopes]);

  // const Submit = () => {
  //   if (company && scopes && scope) {
  //     let values = {
  //       id: company.id,
  //       name: company.name,
  //       address: company.address,
  //       scope_id: scopes.filter((item) => item.name === scope.name).map((item) => item.id)[0],
  //       note: company.note,
  //       emails: emails.filter((value) => value !== ""),
  //       phones: phones.filter((value) => value !== "").map((value) => parseInt(value, 10)),
  //       faxes: faxes.filter((value) => value !== "").map((value) => parseInt(value, 10)),
  //     };

  //     // Object.keys(values).forEach((key) => {
  //     //   if (
  //     //     !Array.isArray(values[key]) &&
  //     //     (values[key] === undefined || values[key] === "")
  //     //   ) {
  //     //     delete values[key];
  //     //   }
  //     // });

  //     // this.close();
  //   }
  // }

  const Scopes = (): JSX.Element | null =>
    scopes && scope ? (
      <Select list={scopes} selected={scope} itemName="scope" label="Сфера деятельности" />
    ) : null;

  const Emails = (): JSX.Element | null =>
    emails ? (
      <>
        {emails.map((email, index) => (
          <Input
            key={email.toString()}
            name={`email[${index}]`}
            value={email}
            type="email"
            placeholder="Электронный адрес"
            iconLeft="envelope"
            onBlur={blurEmails}
            // pattern='/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
            // error="Неправильный email"
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              handleEmails(index, event.currentTarget.value)
            }
          />
        ))}
      </>
    ) : null;

  const Phones = (): JSX.Element | null =>
    phones ? (
      <>
        {phones.map((phone, index) => (
          <Input
            key={phone.toString()}
            name={`phone[${index}]`}
            value={phone}
            type="tel"
            placeholder="Телефон"
            iconLeft="phone"
            onBlur={blurPhones}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              handlePhones(index, event.currentTarget.value)
            }
          />
        ))}
      </>
    ) : null;

  const Faxes = (): JSX.Element | null =>
    faxes ? (
      <>
        {faxes.map((fax, index) => (
          <Input
            key={fax.toString()}
            name={`fax[${index}]`}
            value={fax}
            type="tel"
            placeholder="Факс"
            iconLeft="phone"
            onBlur={blurFaxes}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              handleFaxes(index, event.currentTarget.value)
            }
          />
        ))}
      </>
    ) : null;

  const Practices = (): JSX.Element | null =>
    company && company.practices ? (
      <div className="field" key="practices">
        <label className="label">Тренировки</label>
        {company.practices.map((practice) => (
          <NavLink to={`/practice/${practice.id}`} key={practice.id}>
            <Input
              value={`${practice.date_str} - ${practice.kind_name} - ${practice.topic}`}
              iconLeft="history"
              readonly
            />
          </NavLink>
        ))}
      </div>
    ) : null;

  const Contacts = (): JSX.Element | null =>
    company && company.contacts ? (
      <div className="field" key="contacts">
        <label className="label">Сотрудники</label>
        {company.contacts.map((contact) => (
          <NavLink to={`/contact/${contact.id}`} key={contact.id}>
            <Input value={`${contact.name} - ${contact.post_name}`} iconLeft="user" readonly />
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
            label
            placeholder="Наименование организации"
            iconLeft="building"
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setCompany({ ...company, name: event.currentTarget.value })
            }
          />

          <Scopes />

          <Input
            name="address"
            value={company.address}
            label
            placeholder="Адрес"
            iconLeft="address-card"
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setCompany({ ...company, address: event.currentTarget.value })
            }
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
            label
            placeholder="Заметка"
            iconLeft="sticky-note"
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setCompany({ ...company, note: event.currentTarget.value })
            }
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
