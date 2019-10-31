import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../../models/contact";

export const ContactItem: React.FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [contact, setContacts] = useState<Contact>();

  async function fetchData() {
    let { id } = useParams();
    const res = await fetch(`/api/go/contact/item/${id}`);
    res
      .json()
      .then(res => setContacts(res.data["Contact"]))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData(0);
  }, []);


  handleSignIn = values => {
    console.log(values);
  };

  handleName = event => {
    // console.log(event.target.value);
    this.setState({ contact: { name: event.target.value } });
  };


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
