import * as React from "react";
// import 'home.css';

interface IContactsStates {
  error: boolean;
  isLoaded: boolean;
  items: any
}

class Contacts extends React.Component<any, IContactsStates> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    fetch("http://localhost:9090/edds/api/contacts")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.contacts
          });
        },
        error => {
          // console.log(error)
          this.setState({
            error,
            isLoaded: true
          });
        }
      );
  }

  public render() {
    // eslint-disable-next-line no-unused-vars
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div className="container" />;
    }
  }
}

export default Contacts;