import React, { Component } from "react";

// import Input from "../../components/input";
// import { withFormik } from "formik";
// import { FormField } from "../../components/formfield";
// import { ContactScheme } from "../../models/contact";
// import { Link } from "react-router-dom";

const fetchContact = id =>
  fetch(`/api/go/contact/item/${id}`)
    .then(res => res.json())
    .then(response => {
      return {
        data: response.data
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
      contact: {
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
        note: ""
      },
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
        console.log(result.data);
        this.setState({
          isLoaded: true,
          contact: result.data.Contact
          // contacts: result.data.contacts,
          // departments: result.data.departments,
          // posts: result.data.posts,
          // posts_go: result.data.posts_go,
          // ranks: result.data.ranks
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

  handleName = event => {
    // console.log(event.target.value);
    this.setState({ contact: { name: event.target.value } });
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
          <div className="field">
            <label className="label">Полное имя</label>
            <div className="control">
              <input
                className="input"
                value={this.state.contact.name}
                placeholder="Полное имя"
                onChange={this.handleName}
                id="userid"
                key="user"
              />
            </div>
          </div>
        </form>
      );
    };

    return (
      <div className="container">
        <Form />
      </div>
    );
  }
}
