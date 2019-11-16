import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Contact } from '../../models/contact';

// const get_id = () => {
//   let { id } = useParams();
// };

export const ContactItem: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [contact, setContacts] = useState<Contact>();

  const { id } = useParams();

  async function fetchData(): Promise<void> {
    const res = await fetch(`/api/go/contact/item/${id}`);
    res
      .json()
      .then(res => setContacts(res.data['Contact']))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
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
