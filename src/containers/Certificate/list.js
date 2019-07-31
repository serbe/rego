import React, { Component } from "react";
import { Table } from "../../components/table";

export class Certificates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      certificates: []
    };
  }

  componentDidMount() {
    fetch("/api/go/certificate/list")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            certificates: result.data.CertificateList
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
    const { isLoaded, certificates } = this.state;

    const columns = [
      {
        field: "num",
        label: "Номер",
        link_base: "/certificates/",
        link_field: "id"
      },
      {
        field: "contact_name",
        label: "Фамилия Имя Отчество"
      },
      {
        field: "company_name",
        label: "Учебно-методический центр",
        link_base: "/companies/",
        link_field: "company_id",
        c_name: "is-hidden-mobile"
      },
      { field: "cert_date", label: "Дата" },
      {
        field: "note",
        label: "Заметка",
        c_name: "is-hidden-mobile"
      }
    ];

    return (
      <div className="">
        <Table
          data={certificates}
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
