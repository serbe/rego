import React from 'react';
import ReactDOM from 'react-dom';

import Rugo from './rugo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rugo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
