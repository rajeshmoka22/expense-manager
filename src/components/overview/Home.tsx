import * as React from 'react';
import './home.css';
import moment from 'moment';
import ExpenseItem from './ExpenseItem';
import { IHomeProps } from '../../model/Interfaces';
import { observer } from 'mobx-react-lite';
import { categoryArray, categoryIcons } from '../../utils/constants';
import labels from '../../utils/labels';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ProgressBar } from '../common/ProgressBar';

function Home(props: IHomeProps):JSX.Element {
  const {
    expenseStore: {
      getMontlyPriceByCategory,
      currency,
      username,
      budget,
      expenseList
    }
  } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if(!username) navigate('/welcome')
  });

  const monthlySpent = getMontlyPriceByCategory('all');

  const spendingPercentage = useMemo(() => {
    const a = budget, b = monthlySpent;
    const percentage = Number((b*100/a).toFixed(2));
    return percentage > 100 ? 100 : percentage;
  }, [budget, monthlySpent])

  const moneyRemaining = useMemo(() => {
    return budget - monthlySpent;
  }, [budget, monthlySpent])

  const getSpendingPercentage = (a: number, b: number) => {
    const percentage = Number((b * 100 / a).toFixed(2));
    return percentage > 100 ? 100 : percentage;
  }

  return (
    <div className='p-4 container'>
      <h1 className="page-heading">{labels.Summary}</h1>
      {/* balance section starts here */}
      <section className="align-center spend-container-home font-bold">
        <div className="color-gray mb-2">{labels.Balance}</div>
        <div className="bg-white px-4 py-5 shadow-lg rounded-lg">
          <div className="text-break mb-2">
            <span className="text-slate-700 text-sm">{labels.ThisMonthSpend}:</span> {getMontlyPriceByCategory('all')}
            <span className="px-1 text-xs">{currency}</span>
          </div>
          <div className="text-break mb-2">
            <span className="text-slate-700 text-sm">{labels.Budget}:</span> {budget}
            <span className="px-1 text-xs">{currency}</span>
          </div>
          <div className="flex items-baseline">
            <div className="py-2 text-3xl">{Math.abs(moneyRemaining)} <span className="text-xs">{currency}</span></div>
            <div className={`px-1 text-slate-600 text-xs ${moneyRemaining < 0 ? '!text-red-600': ''}`}>{ moneyRemaining < 0 ? labels.OverSpent : labels.Left}</div>
          </div>
          <ProgressBar progress={spendingPercentage} progressColor={moneyRemaining < 0 ? 'bg-red-600' : ''} />
        </div>
      </section>
      {/* expense chart starts here */}
      <section>
        <div className="color-gray font-bold mt-3 mb-3">{labels.Expenses}</div>
        <div className="mb-5 flex items-center overflow-scroll pb-3">
          
          {categoryArray.map(category => (
              <ExpenseItem
                category={category}
                amount={getMontlyPriceByCategory(category)}
                key={category}
                currency={currency}
                percentage={getSpendingPercentage(budget, getMontlyPriceByCategory(category))}
              />
          ))}
        </div>
      </section>
      {/* last 10 transactions appear here */}
      <section>
        <div className="color-gray font-bold mt-3 mb-3">{labels.Last10}</div>
        <div>
          {
            (expenseList.slice(0, 10)).map(({date, name, category, amount, mode}) => (
              <div className="my-2 flex items-center pb-1" key={amount+date+name}>
                <div className="mr-2 text-xl w-8 h-10 border rounded bg-black justify-center flex items-center">
                  <span>{categoryIcons[category.toLowerCase()]}</span>
                </div>
                <div className="flex-grow">
                  <div className='flex justify-between font-bold text-sm pb-1'>
                    <span className="capitalize">{name}</span>
                    <span>{amount} <span className="text-xs">{currency}</span></span>
                  </div>
                  <div className='flex justify-between text-xs'>
                    <span>{category} <span className="text-xs">({mode})</span></span>
                    <span>{moment(date).format('DD MMM yy')}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
      
    </div>
  )
}

export default (observer(Home));
