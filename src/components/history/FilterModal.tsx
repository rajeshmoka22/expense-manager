import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import labels from '../../utils/labels';
import Input from '../common/Input';
import { categories, categoryArray, ModeOfPayment, PaymentModes } from '../../utils/constants';
import { useState } from 'react';
import SelectComponent from '../common/Select';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface IProps {
  show: boolean;
  close: () => void;
  save: (filters: Record<string, string>) => void;
  clear: () => void
}

const FilterModal = (props: IProps) => {
  const {show, close, save, clear} = props;

  const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    outline: 'none'
  }

  const paymentOptions = PaymentModes.map(mode => ({option: mode, value: mode}));
  const categoryOptions = categoryArray.map(category => ({option: category, value: category}));
  categoryOptions.push(({option: categories.ALL, value: categories.ALL}))
  paymentOptions.push(({option: ModeOfPayment.ALL, value: ModeOfPayment.ALL}))

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    searchString: '',
    category: categories.ALL,
    paymentMode: ModeOfPayment.ALL
  })

  const setFormDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e?.target;
    setFormData({...formData, [name]: value})
  }

  const saveDetails = () => {
    if(formData.endDate && formData.startDate && (formData.endDate < formData.startDate)) {
      toast.error(labels.DateError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    save({
      ...formData,
      endDate: formData.endDate ? `${formData.endDate}T23:59` : '',
      startDate: formData.startDate ? `${formData.startDate}T00:00` : ''
    });
    close();
  }

  const clearFilters = () => {
    clear();
    resetAllValues();
    close();
  }

  const closeModal = () => {
    close();
  }

  const resetAllValues = () => {
    setFormData({
      startDate: '',
      endDate: '',
      searchString: '',
      category: categories.ALL,
      paymentMode: ModeOfPayment.ALL
    });
  }

  useEffect(() => {
    return resetAllValues
  }, [])
  
  return (
    <>
    <ToastContainer />
    <Modal
      open={show}
      onClose={closeModal}
    >
      <Box sx={style}>
        <div>{labels.Filters}</div>
        <div>
        <Input
          type="text"
          value={formData.searchString}
          name='searchString'
          onChange={setFormDetails}
          placeholder={labels.SearchWithName}
          autocomplete='off'
          classNames="!p-2"
        />
        <SelectComponent
          options={categoryOptions}
          label={labels.Category.toLocaleUpperCase()}
          onChange={setFormDetails}
          name={'category'}
          value={formData.category}
          classes={"p-2 my-3 w-full block"}
        />
        <SelectComponent
          options={paymentOptions}
          label={labels.ModeOfPayment.toLocaleUpperCase()}
          onChange={setFormDetails}
          name={'paymentMode'}
          value={formData.paymentMode}
          classes={"p-2 my-3 w-full block"}
        />
        <Input
          type="date"
          value={formData.startDate}
          name='startDate'
          onChange={setFormDetails}
          placeholder={labels.StartDate}
          label={labels.StartDate}
          autocomplete='off'
          classNames="!p-2"
        />
        <Input
          type="date"
          value={formData.endDate}
          name='endDate'
          onChange={setFormDetails}
          placeholder={labels.EndDate}
          label={labels.EndDate}
          autocomplete='off'
          classNames="!p-2"
        />
        </div>
        <div className="mt-2 float-right">
          <button className="btn bg-gray-200 py-2 px-4 mr-2" onClick={clearFilters}>
            {labels.Clear}
          </button>
          <button className="py-2 px-4 btn bg-green-600 text-white" onClick={saveDetails}>
            {labels.Apply}
          </button>
        </div>
      </Box>
    </Modal>
    </>)
}

export default FilterModal