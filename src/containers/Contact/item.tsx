import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Contact } from '../../models/contact';
import { SelectItem } from '../../models/selectitem';
import { rws } from '../../netapi';
import { FormField } from '../../components/formfield';
import { Select } from '../../components/select';

type CLWS = {
  name: string;
  object: {
    Contact?: Contact;
    SelectItem?: SelectItem[];
  };
  error?: string;
};

const ContactForm = (contact: Contact): JSX.Element => {
  const c = contact;

  return (
    <div>
      <FormField
        label="Фамилия Имя Отчество"
        icon="user"
        defaultValue={c.name}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          c.name = event.target.value;
        }}
      />
      <Select
        label="Организация"
        listName="CompanySelect"
        id={c.company_id}
        icon="building"
        callback={(value: number): void => {
          c.company_id = value;
        }}
      />

      <div className="columns">
        <div className="column is-half">
          <Select
            label="Должность"
            listName="PostSelect"
            id={c.post_id}
            icon="tag"
            callback={(value: number): void => {
              c.post_id = value;
            }}
          />
        </div>
        <div className="column is-half">
          <Select
            label="Отдел"
            listName="DepartmentSelect"
            id={c.department_id}
            icon="tag"
            callback={(value: number): void => {
              c.department_id = value;
            }}
          />
        </div>
      </div>

      <div className="columns">
        <div className="column is-half">
          <Select
            label="Должность ГО"
            listName="PostGoSelect"
            id={c.post_go_id}
            icon="tag"
            callback={(value: number): void => {
              c.post_go_id = value;
            }}
          />
        </div>
        <div className="column is-half">
          <Select
            label="Звание"
            listName="RankSelect"
            id={c.rank_id}
            icon="tag"
            callback={(value: number): void => {
              c.rank_id = value;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const ContactItem = (): JSX.Element => {
  const [contact, setContact] = useState<Contact>();
  const [error, setError] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    rws.addEventListener('message', (message: MessageEvent) => {
      const data: CLWS = JSON.parse(message.data);
      if (data?.name === 'Contact' && data.object.Contact) {
        setContact(data.object.Contact);
      }
      if (data.error) {
        setError(data.error);
      }
    });
    rws.send(`{"Get":{"Item":{"id": ${id}, "name": "Contact"}}}`);

    return function cleanup(): void {
      rws.removeEventListener('message', (message: unknown) => {
        console.log('removeEventListener', message);
      });
    };
  }, [id]);

  return <div>{contact && !error ? ContactForm(contact) : undefined}</div>;
};
