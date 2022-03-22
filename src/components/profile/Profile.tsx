import * as React from 'react';
import labels from '../../utils/labels.json';
import './Profile.css';

interface IProps {
  expenseStore : {
    username: string,
    currency: string
  }
}

export default function Profile(props:IProps) {
  const {
    expenseStore : {
      username,
      currency
    }
  } = props;
  return (
    <div className="p-3">
      <div className="page-heading">{labels.Profile}</div>
      <div className="border shadow-lg py-4 px-2 my-4">
        <div className="d-flex justify-content-center">
          <i className="fa-solid fa-user-astronaut fa-3x" />
        </div>
        <div className="my-3 px-2 py-2">
          <div>
            <div>{labels.Name}</div>
            <div className="font-weight-bold username text-success">{username}</div>
          </div>
          <div className="mt-2">
            <div>{labels.Currency}</div>
            <div className="font-weight-bold currency text-success">{currency}</div>
          </div>
        </div>
      </div>
    </div>
  )
}