import * as React from 'react';
import { IExpenseProps } from '../../model/Interfaces';
import './home.css';
import { categoryIcons } from '../../utils/constants';

export default function ExpenseItem(props: IExpenseProps):JSX.Element {
  const {category, amount, currency} = props;
  return (
    <div className="expense-item padding-lr-1 font-bold border-bottom ">
      <div className="expense-icon-item px-1">
        <span className="expense-icon">{categoryIcons[category.toLowerCase()]}</span>
        <span>{category}</span>
      </div>
      <div className="text-break">{amount}<span className="px-1 currency-item">{currency}</span></div>
    </div>
  )
}