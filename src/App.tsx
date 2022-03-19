import { Provider } from 'mobx-react';
import React from 'react';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Routing from './routes/routes';
import expenseStore from './store/expenseStore';

function App() {
  const {username} = expenseStore;
  // const [showBottomNav, setShowBottomNav] = useState(false);
  // useEffect(() => {
  //   if(username) setShowBottomNav(true);
  // },[username])

  return (
    <Router>
      <Provider expenseStore={expenseStore}>
        <Routing />
      </Provider>
    </Router>
  );
}

export default App;
