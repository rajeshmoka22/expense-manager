import * as React from 'react';
import './home.css';
import ExpenseItem from './ExpenseItem';
import { IHomeProps } from '../../model/Interfaces';
import { observer } from 'mobx-react-lite';
import { categoryArray, paths } from '../../utils/constants';
import labels from '../../utils/labels.json';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Home(props: IHomeProps):JSX.Element {
  const {
    expenseStore: {
      getMontlyPriceByCategory,
      currency,
      username
    }
  } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if(!username) navigate('/welcome')
  });
  return (
    <div className='padding-tb-1 padding-lr-1 container'>
      <h1 className="page-heading">{labels.Home}</h1>
      <section className="align-center spend-container-home font-bold">
        <div className="color-gray">{labels.ThisMonthSpend}</div>
        <div className="currency-home margin-tb-1 text-break">
          {getMontlyPriceByCategory('all')}
          <span className="px-1 currency-item">{currency}</span>
        </div>
      </section>
      <section>
        <div className="color-gray font-bold expense-heading">{labels.Expenses}</div>
        <div className="expense-items mb-5 d-flex align-items-center flex-column">
          {categoryArray.map(category => (
            <ExpenseItem
              category={category}
              amount={getMontlyPriceByCategory(category)}
              key={category}
              currency={currency}
            />
          ))}
        </div>
      </section>
      
    </div>
  )
}

export default (observer(Home));
