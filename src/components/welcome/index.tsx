import * as React from 'react';
import expenseStore from '../../store/expenseStore';
import Welcome from './Welcome';

export default function WelcomeRoot() {
  return (
    <Welcome
      updateUserName={expenseStore.updateUserName}
      updateCurrency={expenseStore.updateCurrency}
    />
  );
}