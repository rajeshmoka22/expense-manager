import React from 'react';
import { categories, categoryColors } from '../../utils/constants';
import './Stats.css'

interface IProps {
  category: categories,
  percentage: string
}
export default function PercentageItem(props: IProps) {
  const {category, percentage} = props;

  return (
    <div className="px-1 py-2 m-1 percentage-item">
      <div className="d-flex justify-content-between">
        <div className="px-1 d-flex align-items-center">
          <div className="category-color mx-2" style={{backgroundColor: categoryColors[category.toLowerCase()]}}></div>
          <div>{category}</div>
        </div>
        <div>{percentage}%</div>
      </div>
    </div>
  )
}