import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import useForm from "react-hook-form";
import { Company } from "../../models/company";

// import { Link } from "react-router-dom";

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

// const FormikForm = props => {
//   const {
//     values,
//     touched,
//     errors,
//     handleChange,
//     handleBlur,
//     handleSubmit
//   } = props;
//   return (
//     <form onSubmit={handleSubmit}>
//       <FormField
//         label
//         iconLeft="user"
//         value={values.name}
//         placeholder="Полное имя"
//         onBlur={handleBlur}
//         onChange={handleChange}
//       />
//       <FormField
//         label
//         iconLeft="address"
//         value={values.address}
//         placeholder="Адрес"
//         onBlur={handleBlur}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         onChange={handleChange}
//         onBlur={handleBlur}
//         value={values.name}
//         name="name"
//       />
//       {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <div className="control">
//       <label className="field">{label}</label>
//       <input className="input" {...input} placeholder={label} type={type}/>
//       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )

// const fetchContact = id =>
//   fetch(`/api/go/contact/${id}`)
//     .then(res => res.json())
//     .then(response => {
//       console.log("Success:", response.title);
//       return {
//         data: response
//       };
//     })
//     .catch(({ response }) => {
//       return {
//         err: response.err
//       };
//     });

// const AddUserForm = props => {
//   const initialFormState = {
//     id: 0,
//     name: "",
//     address: "",
//     birthday: "",
//     company: {},
//     company_id: 0,
//     post: {},
//     post_id: 0,
//     department: {},
//     department_id: 0,
//     post_go: {},
//     post_go_id: 0,
//     rank: {},
//     rank_id: 0,
//     emails: [],
//     phones: [],
//     faxes: [],
//     note: ""
//   };

//   // используем useState и передаем в качестве начального значения объект - initialFormState
//   const [contact, setContact] = useState(initialFormState);

//   const handleInputChange = event => {
//     const { name, value } = event.currentTarget;
//     setContact({ ...contact, [name]: value });
//   };

//   return (
//     <form>
//       <label>Имя</label>
//       <input
//         type="text"
//         name="name"
//         value={contact.name}
//         onChange={handleInputChange}
//       />
//       <label>Адрес</label>
//       <input
//         type="text"
//         name="address"
//         value={contact.address}
//         onChange={handleInputChange}
//       />
//       <button>Add new user</button>
//     </form>
//   );
// };

// interface CompanyRouterProps {
//   company: string;
// }

// interface CompanyProps extends RouteComponentProps<CompanyRouterProps> {}

export const CompanyItem: React.FC<{}> = () => {
  let { id } = useParams();
  const [hasError, setErrors] = useState(false);
  const [company, setCompany] = useState<Company>();

  async function fetchData() {
    const res = await fetch(`/api/go/company/item/${id}`);
    res
      .json()
      .then(res => setCompany(res.data["Company"]))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  const { register, handleSubmit, watch, errors } = useForm();
  // const onSubmit = data => { console.log(data) };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     contact: null,
  //     contacts: [],
  //     departments: [],
  //     error: null,
  //     id: this.props.match.params.contact,
  //     isLoaded: false,
  //     posts: [],
  //     posts_go: [],
  //     ranks: [],
  //     requestTimeout: false
  //   };
  // }

  // componentDidMount() {
  //   fetchContact(this.state.id).then(result => {
  //     if (result.data) {
  //       this.setState({
  //         isLoaded: true,
  //         contact: result.data.contact,
  //         contacts: result.data.contacts,
  //         departments: result.data.departments,
  //         posts: result.data.posts,
  //         posts_go: result.data.posts_go,
  //         ranks: result.data.ranks
  //       });
  //     }
  //     this.setState({
  //       isLoaded: true,
  //       error: result.data.error
  //     });
  //   });
  // }

  // handleSignIn = values => {
  //   console.log(values);
  // };

  // const [
  //   contact
  //   // contacts,
  //   // departments,
  //   // error,
  //   // id,
  //   // isLoaded,
  //   // posts,
  //   // posts_go,
  //   // ranks
  // ] = this.state;

  // const Form = () => {
  //   return !this.state.isLoaded ? (
  //     <div />
  //   ) : (
  //     <form id="contact">
  //       <FormField
  //         label
  //         iconLeft="user"
  //         value={this.state.contact.name}
  //         placeholder="Полное имя"
  //         onChange={this.handleInputChange}
  //       />
  //     </form>
  //   );
  // };

  // const CF = withFormik({
  //   mapPropsToValues: () => this.state.contact,
  //   validationSchema: ContactScheme,
  //   handleSubmit: values => {
  //     console.log(values);
  //   },
  //   displayName: "BasicForm"
  // })(FormikForm);

  // const ContactForm = () => {
  //   return !this.state.isLoaded ? <div>Loading...</div> : <CF />;
  // };

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

          {/* <bulma-select
      :list="scopes"
      :selected-item="company.scope"
      item-name="scope"
      label="Сфера деятельности"
      @select="onSelect"
      iconLeft="tag"
    ></bulma-select> */}

          <Input
            name="address"
            value={company.address}
            inputRef={register}
            label
            placeholder="Адрес"
            iconLeft="address-card"
          />

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

          <Input
            name="note"
            value={company.note}
            inputRef={register}
            label
            placeholder="Заметка"
            iconLeft="sticky-note"
          />

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
