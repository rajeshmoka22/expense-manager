import * as React from 'react';
import expenseStore from '../../store/expenseStore';
import Stats from './Stats';

export default function StatsComponentRoot() {
  return <Stats expenseStore={expenseStore}/>
}