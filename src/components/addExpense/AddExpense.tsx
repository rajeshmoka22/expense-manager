import * as React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { ExpenseItem } from '../../model/Interfaces';
import { categories, categoryArray, ModeOfPayment, paths, PaymentModes } from '../../utils/constants';
import labels from '../../utils/labels';
import Input from '../common/Input';
import SelectComponent from '../common/Select';
import { useNavigate } from 'react-router';

interface IExpenseProps {
  expenseStore: {
    addExpenseItem: (expense: ExpenseItem) => void;
    isExpenseEdit: boolean,
    editingExpenseItem: ExpenseItem,
    saveExpenseItemEdits: (val: ExpenseItem) => void,
    setEditExpense: (val: boolean) => void
  }
}

export default function AddExpense(props: IExpenseProps) {
  const {
    expenseStore: {
      addExpenseItem,
      isExpenseEdit,
      editingExpenseItem,
      saveExpenseItemEdits,
      setEditExpense
    }
  } = props;

  const paymentOptions = PaymentModes.map(mode => ({ option: mode, value: mode }));
  const categoryOptions = categoryArray.map(category => ({ option: category, value: category }));
  const [formData, setFormData] = useState(isExpenseEdit ? { ...editingExpenseItem, date: new Date(editingExpenseItem.date) } : {
    name: '',
    mode: ModeOfPayment.CARD,
    amount: 0,
    category: categories.FOOD,
    date: new Date(),
    id: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setFormDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'name') {
      if (value.length > 100) setError('Name should be less than 100 characters');
      else {
        setFormData({ ...formData, [name]: value });
        setError('');
      }
    } else if (name === 'amount') {
      if (Number(value) > 90071992548) {
        setError('Please enter a smaller amount');
      } else {
        setFormData({ ...formData, [name]: Number(value.toString()) });
        setError('');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const addExpense = () => {
    if(isExpenseEdit) {
      saveExpenseItemEdits({ ...formData, date: moment(formData.date).format('YYYY-MM-DDTHH:MM') });
      setEditExpense(false);
      setTimeout(() => navigate(paths.History), 1000);
    } else addExpenseItem({ ...formData, id: `${new Date().valueOf()}`, date: moment(formData.date).format('YYYY-MM-DDTHH:MM') });
    setFormData({
      name: '',
      mode: ModeOfPayment.CARD,
      amount: 0,
      category: categories.FOOD,
      date: new Date(),
      id: ''
    })
    showSuccessMessage();
    // navigate('/');
  }

  const isSubmitEnabled = () => {
    return formData.name && formData.mode && formData.amount && formData.category;
  }

  const showSuccessMessage = () => {
    toast.success(isExpenseEdit ? labels.UpdatedDetails : labels.AddSuccess, {
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
    <div className="p-3 container mb-5">
      <ToastContainer />
      <div className="page-heading">{isExpenseEdit ? labels.Edit : labels.AddExpense}</div>
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
            classes={"p-3 my-3 w-full block"}
          />
          <SelectComponent
            options={paymentOptions}
            label={labels.ModeOfPayment.toLocaleUpperCase()}
            onChange={setFormDetails}
            name={labels.ModeLabel.toLocaleLowerCase()}
            value={formData.mode}
            classes={"p-3 my-3 w-full block"}
          />
          <Input
            type="date"
            value={(formData.date.toString())}
            name='date'
            onChange={setFormDetails}
            placeholder={labels.Date}
            autocomplete='off'
            label={labels.Date.toLocaleUpperCase()}
          />
        </div>
        <button
          type="button"
          onClick={addExpense}
          disabled={!isSubmitEnabled()}
          className="btn btn-primary w-100 py-3 bg-green-700 text-white w-full cursor-pointer"
        >
          {isExpenseEdit ? labels.Save : labels.AddExpense}
        </button>
      </form>
    </div>
  )
}