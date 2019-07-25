import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Table from "../../components/table";

export class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // error: null,
      isLoaded: false,
      contacts: []
    };
  }

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
            isLoaded: true,
            error
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
      { field: "phones", label: "Телефон", array: true },
      { field: "faxes", label: "Факс", array: true, c_name: "is-hidden-touch" }
    ];

    return (
      <div className="">
        <Table
          data={contacts}
          columns={columns}
          loaded={isLoaded}
          hoverable
          narrow
        />
      </div>
    );
  }
}
