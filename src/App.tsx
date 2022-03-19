import { Provider } from 'mobx-react';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Routing from './routes/routes';
import expenseStore from './store/expenseStore';

function App() {

  return (
    <Router>
      <Provider expenseStore={expenseStore}>
        <Routing />
      </Provider>
    </Router>
  );
}

export default App;
