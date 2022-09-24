import * as React from 'react';
import expenseStore from '../../store/expenseStore';
import AddExpense from '../addExpense/AddExpense';

export default function AddExpenseRoot() {
  return <AddExpense expenseStore={expenseStore}/>
}