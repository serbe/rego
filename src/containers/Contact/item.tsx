import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';

import { Contact } from '../../models/contact';
import { fetchData } from '../../helpers/utils';

export const ContactItem: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [contact, setContacts] = useState<Contact>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchData(`/api/go/contact/item/${id}`)
        .then((response) => (response.Contact ? setContacts(response.Contact) : setErrors(true)))
        .catch((error) => setErrors(error));
    }
  }, [id]);

  const Form = (): JSX.Element => (
    <form id="contact">
      <div className="field">
        <label className="label" htmlFor="userid">
          Полное имя
        </label>
        <div className="control">
          <input className="input" placeholder="Полное имя" id="userid" key="user" />
        </div>
      </div>
    </form>
  );

  return <div className="container">{hasError ? null : <Form />}</div>;
};
