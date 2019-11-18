import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';

import { Contact } from '../../models/contact';
import { fetchData } from '../../helpers/utils';

// const get_id = () => {
//   let { id } = useParams();
// };

export const ContactItem: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [contact, setContacts] = useState<Contact>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchData(`/api/go/contact/item/${id}`)
        .then(response => (response.Contact ? setContacts(response.Contact) : setErrors(true)))
        .catch(error => setErrors(error));
    }
  }, []);

  // handleSignIn = values => {
  //   console.log(values);
  // };

  // handleName = event => {
  //   // console.log(event.target.value);
  //   this.setState({ contact: { name: event.target.value } });
  // };

  const Form = (): JSX.Element => (
    <form id="contact">
      <div className="field">
        <label className="label">Полное имя</label>
        <div className="control">
          <input className="input" placeholder="Полное имя" id="userid" key="user" />
        </div>
      </div>
    </form>
  );

  return (
    <div className="container">
      <Form />
    </div>
  );
};
