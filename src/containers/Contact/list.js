import React, {Component} from "react";
import { Link } from "react-router-dom";

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
    fetch("/edds/api/contacts")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            contacts: result.contacts
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

    const formatPhones = items => {
      if (items) {
        return items.map((item, index) => <div key={index}>{item}</div>);
      } else {
        return null;
      }
    };

    const Rows = () => {
      if (contacts) {
        let list = [];
        for (let i = 0; i < 50; i++) {
          list.push(contacts[i]);
        }
        return list.map(item => (
          <tr key={item.id}>
            <td><Link to={"/contacts/" + item.id} className="has-text-dark">{item.name}</Link></td>
            <td className="is-hidden-mobile"><Link to={"/companies/" + item.company_id} className="has-text-dark">{item.company_name}</Link></td>
            <td className="is-hidden-touch">{item.post_name}</td>
            <td className="phone">{formatPhones(item.phones)}</td>
            <td className="phone is-hidden-touch">
              {formatPhones(item.faxes)}
            </td>
          </tr>
        ));
      } else {
        return null;
      }
    };

    const Content = () => {
      if (error) {
        return (
          <tr>
            <td>Error: {error.message}</td>
          </tr>
        );
      } else if (!isLoaded) {
        return (
          <tr>
            <td>Loading...</td>
          </tr>
        );
      } else {
        return <Rows />;
      }
    };

    return (
      <div className="">
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>Фамилия Имя Отчество</th>
              <th className="is-hidden-mobile">Организация</th>
              <th className="is-hidden-touch">Должность</th>
              <th className="phone">Телефон</th>
              <th className="phone is-hidden-touch">Факс</th>
            </tr>
          </thead>
          <tbody>
            <Content />
          </tbody>
        </table>
      </div>
    );
  }
}
