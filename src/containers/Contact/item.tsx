import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Contact } from '../../models/contact';
import { rws } from '../../netapi';
import { Input } from '../../components/input';

type CLWS = {
  name: string;
  object: {
    Contact?: Contact;
  };
  error?: string;
};

const ContactForm = (contact: Contact): JSX.Element => {
  const c = contact;

  return (
    <div>
      <Input
        name="name"
        label="Фамилия Имя Отчество"
        value={c.name}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          c.name = event.target.value;
        }}
      />
    </div>
  );
};

export const ContactItem = (): JSX.Element => {
  const [contact, setContact] = useState<Contact>();
  const [hasError, setErrors] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data.name && data.name === 'Contact' && data.object.Contact) {
        setContact(data.object.Contact);
      }
      if (data.error) {
        setErrors(data.error);
      }
    });
    rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Contact"}}}`);

    return function cleanup(): void {
      rws.removeEventListener('message', (message: unknown) => {
        console.log('removeEventListener', message);
      });
    };
  }, [id]);

  return <div>{contact && !hasError ? ContactForm(contact) : null}</div>;
};
