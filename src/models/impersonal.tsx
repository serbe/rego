import React, { ChangeEvent, SetStateAction } from 'react';

import { FormField } from '../components/formfield';
import { Input, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';
import { addEmptyString } from '../helpers/utils';
import { Certificate, CertificateList } from '../models/certificate';
import { Company, CompanyList } from '../models/company';
import { Contact, ContactList } from '../models/contact';
import { Department, DepartmentList } from '../models/department';
import { Education, EducationList, EducationShort } from '../models/education';
import { Kind, KindList } from '../models/kind';
import { Post, PostList } from '../models/post';
import { Practice, PracticeList, PracticeShort } from '../models/practice';
import { Rank, RankList } from '../models/rank';
import { Scope, ScopeList } from '../models/scope';
import { Siren, SirenList } from '../models/siren';
import { SirenType, SirenTypeList } from '../models/sirentype';

export type JsonScheme =
  | null
  | { name: 'Certificate'; object: { Certificate: Certificate }; error: string }
  | { name: 'CertificateList'; object: { CertificateList: CertificateList[] }; error: string }
  | { name: 'Company'; object: { Company: Company }; error: string }
  | { name: 'CompanyList'; object: { CompanyList: CompanyList[] }; error: string }
  | { name: 'CompanySelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'Contact'; object: { Contact: Contact }; error: string }
  | { name: 'ContactList'; object: { ContactList: ContactList[] }; error: string }
  | { name: 'ContactSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'Department'; object: { Department: Department }; error: string }
  | { name: 'DepartmentList'; object: { DepartmentList: DepartmentList[] }; error: string }
  | { name: 'DepartmentSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'Education'; object: { Education: Education }; error: string }
  | { name: 'EducationList'; object: { EducationList: EducationList[] }; error: string }
  | { name: 'EducationNear'; object: { EducationShort: EducationShort[] }; error: string }
  | { name: 'Kind'; object: { Kind: Kind }; error: string }
  | { name: 'KindList'; object: { KindList: KindList[] }; error: string }
  | { name: 'KindSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'Post'; object: { Post: Post }; error: string }
  | { name: 'PostGoSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'PostList'; object: { PostList: PostList[] }; error: string }
  | { name: 'PostSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'Practice'; object: { Practice: Practice }; error: string }
  | { name: 'PracticeList'; object: { PracticeList: PracticeList[] }; error: string }
  | { name: 'PracticeNear'; object: { PracticeShort: PracticeShort[] }; error: string }
  | { name: 'Rank'; object: { Rank: Rank }; error: string }
  | { name: 'RankList'; object: { RankList: RankList[] }; error: string }
  | { name: 'RankSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'Scope'; object: { Scope: Scope }; error: string }
  | { name: 'ScopeList'; object: { ScopeList: ScopeList[] }; error: string }
  | { name: 'ScopeSelect'; object: { SelectItem: SelectItem[] }; error: string }
  | { name: 'Siren'; object: { Siren: Siren }; error: string }
  | { name: 'SirenList'; object: { SirenList: SirenList[] }; error: string }
  | { name: 'SirenType'; object: { SirenType: SirenType }; error: string }
  | { name: 'SirenTypeList'; object: { SirenTypeList: SirenTypeList[] }; error: string }
  | { name: 'SirenTypeSelect'; object: { SelectItem: SelectItem[] }; error: string };

export type SelectItem = {
  id: number;
  name: string;
};

export type Item =
  | undefined
  | Certificate
  | Company
  | Contact
  | Department
  | Education
  | Kind
  | Post
  | Practice
  | Rank
  | Scope
  | Siren
  | SirenType;

export type List =
  | CertificateList
  | CompanyList
  | ContactList
  | DepartmentList
  | EducationList
  | EducationShort
  | KindList
  | PostList
  | PracticeList
  | PracticeShort
  | RankList
  | ScopeList
  | SirenList
  | SirenTypeList;

export interface ParameterTypes {
  id: string;
}

export type EmailValues = {
  emails: string[];
  setter: (value: SetStateAction<string[]>) => void;
};

export type PhoneValues = {
  phones: string[];
  setter: (value: SetStateAction<string[]>) => void;
};

export const EmailInputs = (properties: EmailValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="email-1-input">
      Электронный адрес
    </label>
    {properties.emails.map((email, index) => (
      <Input
        name={`email-${index}-input`}
        type="email"
        icon="envelope"
        key={`email-${index}`}
        value={email}
        placeholder="Электронный адрес"
        onBlur={(event): void => {
          let values = properties.emails;
          values[index] = event.target.value;
          values = addEmptyString(values);
          properties.setter(values);
        }}
        classNameDiv="pb-1"
      />
    ))}
  </div>
);

export const PhoneInputs = (properties: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="phone-1-input">
      Телефон
    </label>
    {properties.phones.map((phone, index) => (
      <Input
        name={`phone-${index}-input`}
        type="tel"
        icon="phone"
        key={`phone-${index}`}
        value={phone.toString()}
        placeholder="Телефон"
        onBlur={(event): void => {
          let values = properties.phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          properties.setter(values);
        }}
        classNameDiv="pb-1"
      />
    ))}
  </div>
);

export const FaxInputs = (properties: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor="fax-1-input">
      Факс
    </label>
    {properties.phones.map((fax, index) => (
      <Input
        name={`fax-${index}-input`}
        type="tel"
        icon="fax"
        key={`fax-${index}`}
        value={fax.toString()}
        placeholder="Факс"
        onBlur={(event): void => {
          let values = properties.phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          properties.setter(values);
        }}
        classNameDiv="pb-1"
      />
    ))}
  </div>
);

export const NoteInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="note"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Заметки"
    icon="comment"
  />
);

export const AddressInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="address"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Адрес"
    icon="address-card"
  />
);

export const ContactIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="contact"
    label="Контактное лицо"
    listName="ContactSelect"
    id={properties.id}
    icon="user"
    setter={properties.setter}
  />
);
