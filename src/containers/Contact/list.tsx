import React, { useState, useEffect, FC } from "react";
import { Table } from "../../components/table";
import { ContactList } from "../../models/contact";

export const Contacts: FC<{}> = () => {
  const [hasError, setErrors] = useState(false);
  const [contacts, setContacts] = useState<ContactList[]>([]);

  async function fetchData() {
    const res = await fetch("/api/go/contact/list");
    res
      .json()
      .then(res => setContacts(res.data["ContactList"]))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      label: "Фамилия Имя Отчество",
      link_base: "/contacts/",
      link_field: "id"
    },
    {
      field: "company_name",
      label: "Организация",
      link_base: "/compaines/",
      link_field: "company_id",
      class_name: "is-hidden-mobile"
    },
    { field: "post_name", label: "Должность", class_name: "is-hidden-touch" },
    { field: "phones", label: "Телефоны", array: true },
    {
      field: "faxes",
      label: "Факсы",
      array: true,
      class_name: "is-hidden-touch"
    }
  ];

  return hasError ? (
    <div>No data</div>
  ) : (
    <Table
      data={contacts}
      columns={columns}
      hoverable
      narrow
      striped
      paginate={20}
    />
  );
};
