import React, { Component } from "react";
import { Table } from "../../components/table";

export class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      compaines: []
    };
  }

  componentDidMount() {
    fetch("/api/go/company/list")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            compaines: result.data.CompanyList
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
    const { isLoaded, compaines } = this.state;

    const columns = [
      {
        field: "name",
        label: "Наименование",
        link_base: "/compaines/",
        link_field: "id"
      },
      {
        field: "address",
        label: "Адрес",
        c_name: "is-hidden-touch"
      },
      {
        field: "scope_name",
        label: "Сфера деятельности",
        c_name: "is-hidden-mobile"
      },
      { field: "phones", label: "Телефоны", array: true },
      {
        field: "faxes",
        label: "Факсы",
        array: true,
        c_name: "is-hidden-touch"
      },
      {
        field: "practices",
        label: "Тренировки",
        array: true,
        c_name: "is-hidden-touch"
      }
    ];

    return (
      <div className="">
        <Table
          data={compaines}
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
