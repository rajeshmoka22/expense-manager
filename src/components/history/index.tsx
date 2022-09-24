import * as React from 'react';
import expenseStore from '../../store/expenseStore';
import History from './History';

export default function HistoryComponentRoot() {
  return <History expenseStore={expenseStore}/>
}