import React from "react";
import { RouteComponentProps } from "react-router";
// import Input from "../../components/input";
// import { withFormik } from "formik";
import { FormField } from "../../components/formfield";
import { Contact } from "../../models/contact";
import { SelectItem } from "../../models/selectitem";

// import { Link } from "react-router-dom";

interface IContactState {
  contact: Contact;
  contacts: Array<SelectItem>;
  departments: Array<SelectItem>;
  error: boolean;
  id: string;
  isLoaded: boolean;
  posts: Array<SelectItem>;
  posts_go: Array<SelectItem>;
  ranks: Array<SelectItem>;
  requestTimeout: false;
};

interface IRouteParams {contact: string};

const fetchContact = (id: string) =>
  {
    return fetch(`/api/go/contact/item/${id}`)
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
  };

export class ContactItem extends React.Component<RouteComponentProps<IRouteParams>, IContactState> {
  constructor(props: RouteComponentProps<IRouteParams>) {
    super(props);

    this.setState({id: this.props.match.params.contact});
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

  handleSignIn = (values: any) => {
    console.log(values);
  };

  handleName = (value: any) => {
    console.log(value);
    this.setState({ contact: { name: value } });
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
            onChange={this.handleName}
          />
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
