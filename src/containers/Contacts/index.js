import React from 'react';
// import 'home.css';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      contacts: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:9090/edds/api/contacts")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            contacts: result.contacts
          });
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { error, isLoaded, contacts } = this.state;

    const formatPhones = (items) => {
      if (items) {
        return items.map((item, index) => <div key={index}>{item}</div>);
      } else {
        return null;
      }
    }

    const Rows = () => {
      if (contacts) {
        let list = []
        for (let i=0; i<50; i++) {
          list.push(contacts[i]);
        }
        const short = list.map((item) => <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.company_name}</td>
          <td>{item.post_name}</td>
          <td>{formatPhones(item.phones)}</td>
          <td>{formatPhones(item.faxes)}</td>
        </tr>);
        return short;
      } else {
        return null;
      }
    }

    const Content = () => {
      if (error) {
        return <tr><td>Error: {error.message}</td></tr>;
      } else if (!isLoaded) {
        return <tr><td>Loading...</td></tr>;
      } else {
        return (
          <Rows />
        );
      }
    };

    return (
      <div className="container">
        <table className="table is-bordered">
          <tbody>
            <tr>
              <th>Фамилия Имя Отчество</th>
              <th className="is-hidden-mobile">Организация</th>
              <th className="is-hidden-touch">Должность</th>
              <th className="w12">Телефон</th>
              <th className="is-hidden-mobile w12">Факс</th>
            </tr>
            <Content />
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contacts;