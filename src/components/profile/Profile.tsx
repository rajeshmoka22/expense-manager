import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import labels from '../../utils/labels';
import Input from '../common/Input';
import SelectComponent from '../common/Select';
import './Profile.css';

interface IProps {
  expenseStore: {
    username: string,
    currency: string,
    budget: number,
    updateUserName: (val: string) => void,
    updateCurrency: (val: string) => void,
    updateBudget: (val: number) => void
  }
}

export default function Profile(props: IProps) {
  const {
    expenseStore: {
      username,
      currency,
      budget,
      updateUserName,
      updateCurrency,
      updateBudget
    }
  } = props;

  const [formData, setFormData] = useState({
    username,
    currency,
    budget
  });

  const [currencyOptions, setCurrencies] = useState([]);
  const [isEdit, setEditMode] = useState(false);

  useEffect(() => {
    const { currencies } = require('currencies.json');
    const options = currencies.map((currency: { name: string, symbol: string }) => ({
      option: currency.name,
      value: currency.symbol
    }));
    setCurrencies(options);
  }, []);

  const setFormDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log(name, value, {...formData})
    setFormData({ ...formData, [name]: value });
  }

  const saveDetails = () => {
    updateUserName(formData.username);
    updateCurrency(formData.currency);
    updateBudget(formData.budget);
    setEditMode(false);
    toast.success(labels.UpdatedDetails, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="p-3">
      <ToastContainer />
      <div className="page-heading">{labels.Profile}</div>
      <div className="py-4 px-2 my-4">
        <div className="flex justify-center">
          <i className="fa-solid fa-user-astronaut fa-3x" />
        </div>
        <div className="my-3 px-2 py-2">
          <div>
            <div className="capitalize">{labels.Name}</div>
            {
              isEdit ? <Input
                type="string"
                value={(formData.username)}
                name='username'
                onChange={setFormDetails}
                placeholder=''
                autocomplete='off'
                label={''}
                classNames=''
              /> : <div className="font-bold username text-green-600">{username}</div>

            }
          </div>
          <div className="mt-2">
            <div>{labels.Currency}</div>
            {
              isEdit ? <SelectComponent
                onChange={setFormDetails}
                options={currencyOptions}
                value={formData.currency}
                label=''
                name='currency'
                classes='p-3 my-4 w-full bg-gray-100'
              /> : <div className="font-bold currency text-green-600">{currency}</div>
            }
          </div>
          <div className="mt-2">
            <div>{labels.Budget}</div>
            {
              isEdit ? <Input
                type="number"
                value={Number(formData.budget)}
                name='budget'
                onChange={setFormDetails}
                placeholder=''
                autocomplete='off'
                label={''}
                classNames=''
              /> : <div className="font-bold currency text-green-600">{budget}</div>
            }
          </div>
          <button className="btn bg-green-600 w-20 p-3 mt-2 text-white float-right" onClick={isEdit ? saveDetails : () => setEditMode(true)}>
            {isEdit ? labels.Save : labels.Edit}
          </button>
        </div>
      </div>
    </div>
  )
}