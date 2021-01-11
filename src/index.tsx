import './index.scss';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import Rego from './rego';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, getStorage } from './services/auth';
import { ConnectWS } from './services/ws';

// import './index.css';

// const Body = (ws: WebSocket): JSX.Element => {
//   const { setAuth } = useAuthState();
//   // const [checker, setChecker] = useState(false);
//   // const [login, setLogin] = useState(false);

//   useEffect(() => {
//     const user = getStorage();
//     ws.send(JSON.stringify(`{ "t": "${user.token}", "r": ${user.role} }`));
//   }, []);

//   // useEffect(() => {
//   //   if (checker) {
//   //     setAuth({ type: 'Checked' });
//   //     if (login) {
//   //       setAuth({ type: 'SetLogin', data: login });
//   //     }
//   //   }
//   // }, [checker, login, setAuth]);

//   return <div>{/* {checker}
//       {login} */}</div>;
// };

const rootNode = document.getElementById('root');

const App = () => {
  const ws = ConnectWS();
  // const [open, setOpen] = useState(false);
  // const [checker, setChecker] = useState(false);
  // const [login, setLogin] = useState(false);

  useEffect(() => {
    if (ws.readyState === 0) {
      ws.addEventListener('open', () => {
        console.log('open');
        const user = getStorage();
        ws.send(JSON.parse(`{ "t": "${user.token}", "r": ${user.role} }`));
        // setOpen(true);
      });
      ws.addEventListener('close', () => {
        console.log('close');
        // setOpen(false);
      });
      ws.addEventListener('message', (event: Event) => {
        console.log('event', event);
      });
    }
    console.log('readyState', ws.readyState);
  }, [ws]);

  return (
    <React.StrictMode>
      <AuthProvider>
        <Rego />
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, rootNode);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
