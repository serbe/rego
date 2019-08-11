import React from "react";
import { Table } from "../../components/table";
import { ContactList } from "../../models/contact";

interface IContactsState {
  isLoaded: boolean;
  contacts: Array<ContactList>;
}

export class Contacts extends React.Component<{}, IContactsState> {
  componentDidMount() {
    fetch("/api/go/contact/list")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            contacts: result.data.ContactList
          });
        },
        error => {
          console.log(error);
          this.setState({
            isLoaded: true
          });
        }
      );
  }

  render() {
    const { isLoaded, contacts } = this.state;

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
        c_name: "is-hidden-mobile"
      },
      { field: "post_name", label: "Должность", c_name: "is-hidden-touch" },
      { field: "phones", label: "Телефоны", array: true },
      { field: "faxes", label: "Факсы", array: true, c_name: "is-hidden-touch" }
    ];

    return (
      <div className="">
        <Table
          data={contacts}
          columns={columns}
          loaded={isLoaded}
          hoverable
          narrow
          striped
          paginate={20}
        />
      </div>
    );
  }
}
