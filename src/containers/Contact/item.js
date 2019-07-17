import React, { Component, useState } from "react";
// import Input from "../../components/input";
import { withFormik } from "formik";
import FormField from "../../components/formfield";
import { ContactScheme } from "../../models/contact";

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

const FormikForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label
        iconLeft="user"
        value={values.name}
        placeholder="Полное имя"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <FormField
        label
        iconLeft="address"
        value={values.address}
        placeholder="Адрес"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <div className="control">
//       <label className="field">{label}</label>
//       <input className="input" {...input} placeholder={label} type={type}/>
//       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )


const fetchContact = id =>
  fetch(`/edds/api/contacts/${id}`)
    .then(res => res.json())
    .then(response => {
      console.log("Success:", response.title);
      return {
        data: response
      };
    })
    .catch(({ response }) => {
      return {
        err: response.err
      };
    });

const AddUserForm = props => {
  const initialFormState = {
    id: 0,
    name: "",
    address: "",
    birthday: "",
    company: {},
    company_id: 0,
    post: {},
    post_id: 0,
    department: {},
    department_id: 0,
    post_go: {},
    post_go_id: 0,
    rank: {},
    rank_id: 0,
    emails: [],
    phones: [],
    faxes: [],
    note: "",
  };

  // используем useState и передаем в качестве начального значения объект - initialFormState
  const [contact, setContact] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    setContact({ ...contact, [name]: value })
  };

  return (
    <form>
      <label>Имя</label>
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleInputChange}
      />
      <label>Адрес</label>
      <input
        type="text"
        name="address"
        value={contact.address}
        onChange={handleInputChange}
      />
      <button>Add new user</button>
    </form>
  )
};


export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      contacts: [],
      departments: [],
      error: null,
      id: this.props.match.params.contact,
      isLoaded: false,
      posts: [],
      posts_go: [],
      ranks: [],
      requestTimeout: false
    };
  }

  componentDidMount() {
    fetchContact(this.state.id).then(result => {
      if (result.data) {
        this.setState({
          isLoaded: true,
          contact: result.data.contact,
          contacts: result.data.contacts,
          departments: result.data.departments,
          posts: result.data.posts,
          posts_go: result.data.posts_go,
          ranks: result.data.ranks
        });
      }
      this.setState({
        isLoaded: true,
        error: result.data.error
      });
    });
  }

  handleSignIn = values => {
    console.log(values);
  };

  render() {
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

    const Form = () => {
      return !this.state.isLoaded ? (
        <div />
      ) : (
        <form id="contact">
          <FormField
            label
            iconLeft="user"
            value={this.state.contact.name}
            placeholder="Полное имя"
            onChange={this.handleInputChange}
          />
        </form>
      );
    };

    const CF = withFormik({
      mapPropsToValues: () => (this.state.contact),
      validationSchema: ContactScheme,
      handleSubmit: (values) => {
        console.log(values);
      },
      displayName: 'BasicForm',
    })(FormikForm);

    const ContactForm = () => {
      return !this.state.isLoaded ? (
        <div>Loading...</div>
      ) : (
        <CF />
      )
    };

    return (
      <div className="container">
        <Form />
        <AddUserForm />
        <ContactForm />
      </div>
    );
  }
}
