import * as React from 'react';
import expenseStore from '../../store/expenseStore';
import Profile from './Profile';

export default function ProfileComponentRoot() {
  return <Profile expenseStore={expenseStore}/>
}