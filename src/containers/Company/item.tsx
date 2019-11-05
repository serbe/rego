import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { useParams } from "react-router-dom";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Select } from "../../components/select";
import { Company } from "../../models/company";
import { SelectItem } from "../../models/selectitem";

// initialValues={{
//   id: 0,
//   name: "",
//   address: "",
//   birthday: "",
//   company: {},
//   company_id: 0,
//   post: {},
//   post_id: 0,
//   department: {},
//   department_id: 0,
//   post_go: {},
//   post_go_id: 0,
//   rank: {},
//   rank_id: 0,
//   emails: [],
//   phones: [],
//   faxes: [],
//   note: "",
// }}

export const CompanyItem: React.FC<{}> = () => {
  let { id } = useParams();
  const [hasError, setErrors] = useState(false);
  const [company, setCompany] = useState<Company>();
  const [scope, setScope] = useState<SelectItem>();
  const [scopes, setScopes] = useState<SelectItem[]>();

  async function fetchData() {
    const resCompany = await fetch(`/api/go/company/item/${id}`);
    resCompany
      .json()
      .then(res => setCompany(res.data["Company"]))
      .catch(err => setErrors(err));
  }

  async function fetchScopes() {
    const resScopes = await fetch(`/api/go/scope/select`);
    resScopes
        .json()
        .then(res => setScopes(res.data["SelectItem"]))
        .catch(err => setErrors(err));
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
    }
    console.log(company, scopes);
  }, [company, scopes]);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container mw768">
      {company ? (
        <div>
          <Input
            name="name"
            value={company.name}
            inputRef={register}
            label
            placeholder="Наименование организации"
            iconLeft="building"
          />

          {scope ? <Select list={scopes} selected={scope} itemName="scope"/> : null}

          {/* <bulma-select
      :list="scopes"
      :selected-item="company.scope"
      item-name="scope"
      label="Сфера деятельности"
      @select="onSelect"
      iconLeft="tag"
    ></bulma-select> */}

          {/* <Input
            name="address"
            value={company.address}
            inputRef={register}
            label
            placeholder="Адрес"
            iconLeft="address-card"
          /> */}

          {/* <div className="columns">
      <div className="column">
        <div className="field">
          <label className="label">Электронный адрес</label>
          <Input
            v-for="(email, index) in company.emails"
            :key="index"
            value={company.emails[index]}
            type="email"
            placeholder="Электронный адрес"
            iconLeft="envelope"
            autocomplete="email"
            @blur="onBlur('emails', 'email')"
            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            error="Неправильный email"
          ></Input>
        </div>
      </div>

      <div className="column">
        <div className="field">
          <label className="label">Телефон</label>
          <Input
            v-for="(phone, index) in company.phones"
            :key="index"
            value={company.phones[index]}
            type="tel"
            placeholder="Телефон"
            iconLeft="phone"
            autocomplete="tel"
            @blur="onBlur('phones', 'phone')"
          ></Input>
        </div>
      </div>

      <div className="column">
        <div className="field">
          <label className="label">Факс</label>
          <Input
            v-for="(fax, index) in company.faxes"
            :key="index"
            value={company.faxes[index]}
            type="tel"
            placeholder="Факс"
            iconLeft="phone"
            autocomplete="tel"
            @blur="onBlur('faxes', 'phone')"
          ></Input>
        </div>
      </div>
    </div>

    <div className="field" v-if="company.practices.length > 0" key="practices">
      <label className="label">Тренировки</label>
      <Input
        v-for="practice in company.practices"
        :key="practice.id"
        :value="
          practice.date_str +
            ' - ' +
            practice.kind_name +
            ' - ' +
            practice.topic
        "
        :hyper="'/practice/' + practice.id"
        iconLeft="history"
        readonly
      ></Input>
    </div>

    <div className="field" v-if="company.contacts.length > 0" key="contacts">
      <label className="label">Сотрудники</label>
      <Input
        v-for="contact in company.contacts"
        :key="contact.id"
        :value="contact.name + ' - ' + contact.post_name"
        :hyper="'/contact/' + contact.id"
        iconLeft="user"
        readonly
      ></Input>
    </div> */}

          {/* <Input
            name="note"
            value={company.note}
            inputRef={register}
            label
            placeholder="Заметка"
            iconLeft="sticky-note"
          /> */}

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <Button
                // text=""
                color="primary"
                // @click="submit"
              >
                Сохранить
              </Button>
            </div>
            <div className="control">
              {/* <Button text="Закрыть" v-on:click.once="close"></Button> */}
              {/* </div> */}
              <div className="control">
                <Button
                  // text="Удалить"
                  color="danger"
                  // onclick="return confirm('Вы действительно хотите удалить эту запись?');"
                >
                  Удалить
                </Button>
              </div>
            </div>
          </div>

          <button className="button" onClick={handleSubmit(onSubmit)}>
            on submit
          </button>
        </div>
      ) : null}
    </div>
  );
};
// }
