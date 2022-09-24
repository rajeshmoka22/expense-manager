import * as React from 'react';
import { useEffect } from 'react';
import { ExpenseItem } from '../../model/Interfaces';
import labels from '../../utils/labels.json';
import {categories, LABELS, months} from '../../utils/constants';
import './history.css';
import {capitalize} from '../../utils/reusables';
import { useMemo } from 'react';
import { toJS } from 'mobx';
import SelectComponent from '../reusables/Select';
import { observer } from 'mobx-react';

interface IProps {
  expenseStore: {
    expenseList: Array<ExpenseItem>,
    currency: string,
    isFilterActive: boolean,
    filteredItems: Array<ExpenseItem>,
    updateCategory: (val: string) => void,
    selectedCategory: string,
    filterItems: () => void
  }
}

export default observer(function History(props: IProps) {
  const {
    expenseStore: {
      expenseList,
      currency,
      isFilterActive,
      filteredItems,
      updateCategory,
      selectedCategory
    }
  } = props;

  const memoizedArray = useMemo(() => {
    return toJS(isFilterActive ? filteredItems : expenseList).reverse()
  }, [expenseList, filteredItems, isFilterActive]);

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCategory(e.target.value);
  }

  const getExpenseCard = (expense:ExpenseItem) => {
    const {date, name, category, amount, mode} = expense;
    let convertedDate = new Date(expense.date);
    return (
      <div
        className="d-flex border-left-success py-3 m-2 bg-light shadow-sm border-top"
        key={`${convertedDate}-${name}`}
      >
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
        <div className="w-25 px-1 text-orange"><strong className="expense-amount text-break">{amount}<span className="px-1 currency-item">{currency}</span></strong></div>
      </div>
    )
  }
  return (
    <div className="p-3 mb-5">
      <div className="page-heading mb-2">{labels.History}</div>
      <div className="filter-section d-flex align-items-center justify-content-end">
        <SelectComponent
          label={''}
          options={Object.keys(categories).map(category => ({option: category, value: category}))}
          name="categorySelect"
          value={selectedCategory}
          onChange={onChangeCategory}
          classes={"p-2 my-1"}
        />
      </div>
      {
        memoizedArray.length ? 
        memoizedArray.map(expense => getExpenseCard(expense))
        : (<strong className="py-3 text-secondary d-flex justify-content-center text-orange">{labels.NoItems}</strong>)
      }
    </div>
  )
})