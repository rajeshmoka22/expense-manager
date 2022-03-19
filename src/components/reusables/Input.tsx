import React from "react";

interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  type: string,
  placeholder: string
  value: string | number,
  autocomplete: string,
  name: string,
  label? : string,
  classNames?: string
}

export default function Input(props:IProps):JSX.Element{
  const {
    onChange,
    type,
    placeholder,
    value,
    autocomplete,
    name,
    label,
    classNames
  } = props;

  return (
    <>
      {label ? <label htmlFor={name}>{label}</label> : ''}
      <input
        className={classNames || "p-3 w-100 my-3 border-0 input outline-none bg-light"}
        type={type}
        value={value || ''}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    </>
  )
}