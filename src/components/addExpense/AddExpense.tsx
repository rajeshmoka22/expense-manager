import * as React from 'react';
import { useState } from 'react';
import moment from 'moment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ExpenseItem } from '../../model/Interfaces';
import { categories, categoryArray, ModeOfPayment, PaymentModes } from '../../utils/constants';
import labels from '../../utils/labels.json';
import Input from '../reusables/Input';
import SelectComponent from '../reusables/Select';
import { useEffect } from 'react';

interface IExpenseProps {
  isEditing?: boolean,
  index?: number,
  expenseStore: {
    addExpenseItem: (expense: ExpenseItem) => void;
  }
}

export default function AddExpense(props: IExpenseProps) {
  const {
    expenseStore:{
      addExpenseItem
  }} = props;

  const paymentOptions = PaymentModes.map(mode => ({option: mode, value: mode}));
  const categoryOptions = categoryArray.map(category => ({option: category, value: category}));
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mode: ModeOfPayment.CARD,
    amount: 0,
    category: categories.FOOD
  });
  const [error, setError] = useState('');

  const setFormDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuccess(false);
    const {name, value} = event.target;
    if(name==='name') {
      if (value.length>50) setError('Name should be less than 50 characters');
      else {
        setFormData({...formData, [name]: value});
        setError('');
      }
    } else if(name === 'amount') {
      if(Number(value) > 90071992548) {
        setError('Please enter a smaller amount');
      } else {
        setFormData({...formData, [name]: Number(value.toString())});
        setError('');
      }
    } else {
      setFormData({...formData, [name]: value});
    }
  }

  const addExpense = () => {
    const expense = {...formData, date: ''};
    expense.date = moment().format('YYYY-MM-DDTHH:MM');
    addExpenseItem(expense);
    setShowSuccess(true);
    setFormData({
      name: '',
      mode: ModeOfPayment.CARD,
      amount: 0,
      category: categories.FOOD
    })
    // navigate('/');
  }

  useEffect(() => {
    if(showSuccess) window.scrollTo({top:10, behavior: 'smooth'});
  }, [showSuccess])

  const isSubmitEnabled = () => {
    return formData.name && formData.mode && formData.amount && formData.category;
  }

  const SuccessMessage = () => {
    return (
      <div className="text-success my-2 p-2 text-center">
        <div className="m-2 p-1">
          <CheckCircleOutlineIcon fontSize="large"/>
        </div>
        <strong>{labels.AddSuccess}</strong>
      </div>
    )
  }

  return (
    <div className="p-3 container mb-5">
        <div className="page-heading">{labels.AddExpense}</div>
        {showSuccess ? <SuccessMessage />: ''}
        <form>
          {error ? <div className="text-danger">{error}</div> : ''}
          <div className="shadow-lg p-3 my-4 bg-white">
            <Input
              type="text"
              value={formData.name}
              name='name'
              onChange={setFormDetails}
              placeholder={labels.EnterExpenseName}
              autocomplete='off'
              label={labels.Name.toLocaleUpperCase()}
            />
            <Input
              type="number"
              value={Number(formData.amount.toString())}
              name='amount'
              onChange={setFormDetails}
              placeholder={labels.EnterAmount}
              autocomplete='off'
              label={labels.Amount.toLocaleUpperCase()}
            />
            <SelectComponent
              options={categoryOptions}
              label={labels.Category.toLocaleUpperCase()}
              onChange={setFormDetails}
              name={labels.Category.toLowerCase()}
              value={formData.category}
              classes={"p-3 my-3"}
            />
            <SelectComponent
              options={paymentOptions}
              label={labels.ModeOfPayment.toLocaleUpperCase()}
              onChange={setFormDetails}
              name={labels.ModeLabel.toLocaleLowerCase()}
              value={formData.mode}
              classes={"p-3 my-3"}
            />
          </div>
          <button
            type="button"
            onClick={addExpense}
            disabled={!isSubmitEnabled()}
            className="btn btn-success w-100 py-3 rounded-0"
          >
            {labels.AddExpense}
          </button>
        </form>
    </div>
  )
}