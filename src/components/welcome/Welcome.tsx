import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import labels from '../../utils/labels';
import Input from '../common/Input';
import SelectComponent from '../common/Select';
import './welcome.css';

interface IProps {
  updateUserName: (value: string) => void,
  updateCurrency: (value: string) => void,
  updateBudget: (value: number) =>  void
}

enum STEPS {
  NAME = 'name',
  CURRENCY = 'currency',
  BUDGET = 'budget'
}

function Welcome(props: IProps){
  const {updateCurrency, updateUserName, updateBudget} = props;
  const [name, setName] = useState('');
  const [currentStep, setStep] = useState(STEPS.NAME);
  const [currency, setCurrency] = useState('USD');
  const [budget, setBudget] = useState(0);
  const [currencyOptions, setCurrencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const {currencies} = require('currencies.json');
    const options = currencies.map((currency: {name: string, symbol: string}) => ({
      option: currency.name,
      value: currency.symbol
    }));
    setCurrencies(options);
  }, []);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setName(value);
  }

  const onCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setCurrency(value);
  }

  const onBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setBudget(value as unknown as number);
  }

  const handleNext = () => {
    if(currentStep === STEPS.NAME && name) {
      setStep(STEPS.CURRENCY);
      updateUserName(name);
    } else if(currentStep === STEPS.CURRENCY && currency) {
      updateCurrency(currency);
      setStep(STEPS.BUDGET)
    } else if( currentStep === STEPS.BUDGET && budget) {
      updateBudget(budget)
      navigate('../', {replace: true});
    }
  }

  const getContent = () => {
    switch(currentStep) {
      case STEPS.NAME:
        return (
          <Input
            name="name"
            onChange={onNameChange}
            type="text"
            autocomplete="off"
            value={name}
            placeholder={labels.EnterName}
            classNames="p-3 my-4 input outline-none"
          />
        )
      case STEPS.CURRENCY: 
        return (
          <SelectComponent
            onChange={onCurrencyChange}
            options={currencyOptions}
            value={currency}
            label=''
            name='currency dropdown'
            classes='p-3 my-4 welcome-select w-full'
          />
        )
      case STEPS.BUDGET:
        return (
          <Input
            name="budget"
            onChange={onBudgetChange}
            type="number"
            autocomplete="off"
            value={budget}
            placeholder={labels.EnterBudget}
            classNames="p-3 my-4 input outline-none"
          />
        )
    }
  }

  const STEP_LABELS: Record<any, any> = {
    'name': labels.BeforeStart,
    'currency': labels.ChooseCurrency,
    'budget': labels.BudgetMessage
  }

  return (
    <div className="my-5 px-2 flex flex-col align-items-center">
      <div className="welcome-heading mt-4">{STEP_LABELS[currentStep]}</div>
      {getContent()}
      <div className="flex w-100 justify-end p-3 color-green float-right">
        <span
          onClick={handleNext}
        >
          <i className="fa-solid fa-arrow-right fa-2x" />
        </span>
      </div>
    </div>
  )
}

export default Welcome;