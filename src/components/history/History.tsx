import * as React from 'react';
import { ExpenseItem } from '../../model/Interfaces';
import labels from '../../utils/labels.json';
import {months} from '../../utils/constants';
import './history.css';
import {capitalize} from '../../utils/reusables';

interface IProps {
  expenseStore: {
    expenseList: Array<ExpenseItem>;
    currency: string
  }
}

export default function History(props: IProps) {
  const {
    expenseStore: {
      expenseList,
      currency
    }
  } = props;

  const getExpenseCard = (expense:ExpenseItem) => {
    const {date, name, category, amount, mode} = expense;
    let convertedDate = new Date(expense.date);
    console.log(date);
    return (
      <div className="d-flex border-left-success px-1 py-3 m-2 bg-light shadow-sm border-top">
        <div className="w-25 pr-1 d-flex flex-column justify-content-center align-items-center">
          <div className="expense-date text-success">
            <strong>{convertedDate.getDate()}</strong>
          </div>
          <div className="text-secondary">
            <span className="px-1">{months[convertedDate.getMonth()]}</span>
            <span>{convertedDate.getFullYear()}</span>
          </div>
          <div className="text-secondary">{date.slice(11,16)}</div>
        </div>
        <div className="w-50 px-1">
          <div className="expense-name">{capitalize(name)}</div>
          <div className="text-secondary">{category}</div>
          <div className="text-secondary">{mode}</div>
        </div>
        <div className="w-25 px-1 text-danger"><strong className="expense-amount text-break">{amount}<span className="px-1 currency-item">{currency}</span></strong></div>
      </div>
    )
  }
  return (
    <div>
      <div className="page-heading mb-2">{labels.History}</div>
      {
        expenseList.length ? 
        expenseList.map(expense => getExpenseCard(expense))
        : (<strong className="py-3 text-secondary d-flex justify-content-center">{labels.NoItems}</strong>)
      }
    </div>
  )
}