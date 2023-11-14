import * as React from 'react';
import { useEffect, useCallback } from 'react';
// import { PieChart } from 'react-minimal-pie-chart';
import labels from '../../utils/labels';
import { categories, categoryArray, categoryColors } from '../../utils/constants';
import {calculatePercentage} from '../../utils/reusables';
import PercentageItem from './PercentageItem';
import { ExpenseItem } from '../../model/Interfaces';
// import { useState } from 'react';

interface IProps {
  expenseStore: {
    getMontlyPriceByCategory: (category: categories | string) => number,
    expenseList: Array<ExpenseItem>,
    currency: string
  }
}

export default function Stats(props: IProps) {
  const {
    expenseStore: {
      getMontlyPriceByCategory,
      expenseList,
      currency
    }
  } = props;
  // const [pieData, setPieData] = useState<Array<{title:string, color:string, value: number}>>([]);

  const totalPrice = getMontlyPriceByCategory('all');
  const getPercentage = useCallback((value: number) => {
    return calculatePercentage(value, totalPrice).toFixed(1);
  }, [totalPrice])
  useEffect(() => {
    const data: Array<{title:string, color:string, value: number}> = [];
    categoryArray.forEach(category => {
      const percentage = Number(getPercentage(getMontlyPriceByCategory(category)));
      if(percentage > 0) {
        data.push({ title: category,
          value: percentage,
          color: categoryColors[category.toLowerCase()]
        })
      }
    })

    // setPieData([...data]);
  },[getMontlyPriceByCategory, getPercentage]);

  return (
    <div className="p-3 container">
      <div className="page-heading">{labels.Statistics}</div>
      {
        expenseList?.length ?
        <>
          <div className="my-3 px-1">
            {/* <PieChart
              style={{ height: '150px', margin: '1rem' }}
              data={pieData}
              labelStyle={(index) => ({
                fill: '#000',
                fontSize: '.5rem',
                fontFamily: 'sans-serif',
              })}
              lengthAngle={-360}
              animate
            /> */}
          </div>
          <div className="">
              {categoryArray.map(category => (
                <PercentageItem
                  category={category}
                  amount={getMontlyPriceByCategory(category)}
                  key={category}
                  currency={currency}
                />
              ))}
            </div>
        </> : <div className="my-3 px-2 text-muted">{labels.AddItemsMessage}</div>
      }
      
    </div>
  )
}