import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
// import Field from "../../components/field";

// import { Link } from "react-router-dom";

let ContactForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label className="label">Полное имя</label>
        <Field
          className="input"
          name="contactName"
          component="input"
          type="text"
          placeholder="Полное имя"
        />
      </div>
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

ContactForm = reduxForm({
  form: "signIn"
  // validate,
})(ContactForm);

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
      ranks: []
    };
  }

  // componentDidMount() {
  //   fetch(`http://localhost:9090/edds/api/contacts/${this.state.id}`)
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           contact: result.contact,
  //           contacts: result.contacts,
  //           departments: result.departments,
  //           posts: result.posts,
  //           posts_go: result.posts_go,
  //           ranks: result.ranks
  //         });
  //       },
  //       error => {
  //         console.log(error);
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // }

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

    return (
      <div className="container">
        <ContactForm onSubmit={this.handleSignIn} />
      </div>
    );
  }
}
