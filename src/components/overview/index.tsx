import * as React from 'react';
import expenseStore from '../../store/expenseStore';
import Home from './Home';

export default function HomeComponent() {
  return <Home expenseStore={expenseStore}/>
}