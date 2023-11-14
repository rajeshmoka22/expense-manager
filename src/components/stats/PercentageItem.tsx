import React from 'react';
import { categories, categoryColors } from '../../utils/constants';
import './Stats.css'

interface IProps {
  category: categories,
  amount: number,
  currency: string
}
export default function PercentageItem(props: IProps) {
  const {category, amount, currency} = props;

  return (
    <div className="px-1 py-2 m-1 percentage-item">
      <div className="flex justify-between">
        <div className="px-1 flex items-center">
          <div className="category-color mx-2" style={{backgroundColor: categoryColors[category.toLowerCase()]}}></div>
          <div>{category}</div>
        </div>
        <div>{amount} <span className="text-xs">{currency}</span></div>
      </div>
    </div>
  )
}