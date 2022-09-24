import * as React from 'react';
import expenseStore from '../../store/expenseStore';
import NavBar from './NavBar';

export default function NavRoot() {
  return <NavBar expenseStore={expenseStore}/>
}