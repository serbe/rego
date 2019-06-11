import React, { Component } from "react";
// import Input from "../../components/input";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormField from "../../components/formfield";
import { ContactScheme } from "../../models/contact";

// import { Link } from "react-router-dom";

let ContactForm = () => (
  <Formik
    initialValues={{
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
    }}
    validationScheme={ContactScheme}
    onSubmit={values => {
      // same shape as initial values
      console.log(values);
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <Field name="name" />
        <ErrorMessage name="name" component="div" />
        {errors.name && touched.name ? (
          <div>{errors.name}</div>
        ) : null}
        <Field name="address" />
        {errors.address && touched.address ? (
          <div>{errors.address}</div>
        ) : null}
        <Field name="birthday" />
        {errors.birthday && touched.birthday ? <div>{errors.birthday}</div> : null}
        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <div className="control">
//       <label className="field">{label}</label>
//       <input className="input" {...input} placeholder={label} type={type}/>
//       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )

// ContactForm = reduxForm({
//   form: "contactForm"
//   // validate,
// })(ContactForm);

const fetchContact = id =>
  fetch(`http://localhost:9090/edds/api/contacts/${id}`)
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
          />
        </form>
      );
    };

    return (
      <div className="container">
        <Form />
        <ContactForm />
      </div>
    );
  }
}
