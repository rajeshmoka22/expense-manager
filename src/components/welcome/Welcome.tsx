import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import labels from '../../utils/labels.json';
import Input from '../reusables/Input';
import SelectComponent from '../reusables/Select';
import './welcome.css';

interface IProps {
  updateUserName: (value: string) => void,
  updateCurrency: (value: string) => void 
}

function Welcome(props: IProps){
  const {updateCurrency, updateUserName} = props;
  const [name, setName] = useState('');
  const [currentStep, setStep] = useState('name');
  const [currency, setCurrency] = useState('USD');
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

  const handleNext = () => {
    if(currentStep === 'name' && name) {
      setStep('currency');
      updateUserName(name);
    } else if(currentStep === 'currency' && currency) {
      updateCurrency(currency);
      navigate('../', {replace: true});
    }
  }

  const getContent = () => {
    if(currentStep === 'name') {
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
    } else {
      return (
        <SelectComponent
          onChange={onCurrencyChange}
          options={currencyOptions}
          value={currency}
          label=''
          name='currency dropdown'
          classes='p-3 my-4 welcome-select'
        />
      )
    }
  }

  return (
    <div className="my-5 px-2 d-flex flex-column align-items-center">
      <div className="welcome-heading mt-4 pl-2">{currentStep === 'name' ? labels.BeforeStart : labels.ChooseCurrency}.</div>
      {getContent()}
      <div className="d-flex w-100 justify-content-end p-3 color-green">
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