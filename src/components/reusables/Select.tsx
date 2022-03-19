import * as React from 'react';

interface IProps {
  options: Array<{option: string, value: string}>;
  onChange: (event: any) => void;
  label: string;
  name: string;
  value: string;
  classes?: string
}

export default function SelectComponent(props:IProps) {
  const {
    onChange,
    value,
    name,
    label,
    options,
    classes
  } = props;

  const getOptions = () => {
    const optionsArray = [];
    for(let optionItem of options) {
      const option = (
      <option
        value={optionItem.value}
        key={optionItem.option}
      >
        {optionItem.option}
      </option>)
      optionsArray.push(option)
    }
    return optionsArray;
  }

  return (
    <div>
        {label ? <label htmlFor={name}>{label}</label> : ''}
        <select
          value={value}
          onChange={onChange}
          name={name}
          className={`form-select p-3 bg-light my-3 border-0 rounded-0 ${classes || ''}`}
        >
          {getOptions()}
        </select>
    </div>
  );
}
