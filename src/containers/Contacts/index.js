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
          <td className="">{item.name}</td>
          <td className="">{item.company_name}</td>
          <td className="">{item.post_name}</td>
          <td className="">{formatPhones(item.phones)}</td>
          <td className="">{formatPhones(item.faxes)}</td>
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
      <div className="uk-container">
        <table className="uk-table uk-table-divider uk-table-small uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-1-4">Фамилия Имя Отчество</th>
              <th className="uk-width-1-4 is-hidden-mobile">Организация</th>
              <th className="uk-width-1-4 is-hidden-touch">Должность</th>
              <th className="uk-table-shrink">Телефон</th>
              <th className="is-hidden-mobile uk-table-shrink">Факс</th>
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

export default Contacts;