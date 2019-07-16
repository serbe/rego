import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

export class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
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
    const { error, isLoaded, contacts } = this.state;

    const columns = [
      {
        title: "Фамилия Имя Отчество",
        dataIndex: "name",
        key: "name",
        render: (text, row) => <Link to={{pathname: `/api/go/contact/item/${row.id}`}}>{text}</Link>
      },
      {
        title: "Организация",
        dataIndex: "company_name",
        key: "company_name"
      },
      {
        title: "Должность",
        dataIndex: "post_name",
        key: "post_name"
      },
      {
        title: "Телефон",
        dataIndex: "phones",
        key: "phones",
        render: text => formatPhones(text)
      },
      {
        title: "Факс",
        dataIndex: "faxes",
        key: "faxes",
        render: text => formatPhones(text)
      }
    ]

    const formatPhones = items => {
      if (items) {
        return items.map((item, index) => <div key={index}>{item}</div>);
      } else {
        return null;
      }
    };

    const Content = () => {
      if (error) {
        return (
          <div>Error: {error.message}</div>
        );
      } else if (!isLoaded) {
        return (
          <div>Loading...</div>
        );
      } else {
        return <Table columns={columns} dataSource={contacts} rowKey="id" size="small" bordered pagination={{pageSize:20, showSizeChanger: true, hideOnSinglePage: true}} />;
      }
    };

    return (
      <Content />
    );
  }
}
