import { useMemo, useState } from 'react';
import { toJS } from 'mobx';
import moment from 'moment';
import { observer } from 'mobx-react';
import { ExpenseItem } from '../../model/Interfaces';
import labels from '../../utils/labels';
import {categoryIcons, paths} from '../../utils/constants';
import './history.css';
import TuneIcon from '@mui/icons-material/Tune';
import FilterModal from './FilterModal';
import { useNavigate } from 'react-router';

interface IProps {
  expenseStore: {
    expenseList: Array<ExpenseItem>,
    currency: string,
    isFilterActive: boolean,
    filteredItems: Array<ExpenseItem>,
    filterItems: () => void,
    updateFilters: (filters: Record<string, string>) => void,
    clearFilters: () => void,
    setEditExpense: (val: boolean) => void,
    setExpenseItemToEdit: (val: ExpenseItem) =>  void,
    deleteExpense: (val: string) => void
  }
}

export default observer(function History(props: IProps) {
  const {
    expenseStore: {
      expenseList,
      currency,
      isFilterActive,
      filteredItems,
      updateFilters,
      clearFilters,
      setEditExpense,
      setExpenseItemToEdit,
      deleteExpense
    }
  } = props;

  const [showFilterModal, setFilterModal] = useState(false);
  const navigate = useNavigate();

  const memoizedArray = useMemo(() => {
    return toJS(isFilterActive ? filteredItems : expenseList).reverse()
  }, [expenseList, filteredItems, isFilterActive]);

  const handleEdit = (expense: ExpenseItem) => {
    setEditExpense(true);
    setExpenseItemToEdit(expense);
    navigate(paths.Add);
  }

  const getExpenseCard = (expense: ExpenseItem) => {
    const {date, name, category, amount, mode, id} = expense;
    return (
      <div className="my-2 flex items-center pb-2 border-b" key={id}>
        <div className="mr-2 text-md w-8 h-10 border rounded bg-black justify-center flex items-center">
          <span>{categoryIcons[category.toLowerCase()]}</span>
        </div>
        <div className="flex-grow">
          <div className='flex justify-between font-bold text-sm pb-1'>
            <span className="capitalize">{name}</span>
            <span>{amount} <span className="text-xs">{currency}</span></span>
          </div>
          <div className='flex justify-between text-xs'>
            <span>{category} <span className="text-xs">({mode})</span></span>
            <span>{moment(date).format('DD MMM yy')}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 ml-2">
          <button className="text-white bg-green-700 cursor-pointer px-2 py-1 text-xs rounded" onClick={() => handleEdit(expense)}>{labels.Edit}</button>
          <button className="text-white bg-red-700 cursor-pointer px-2 py-1 text-xs rounded" onClick={() => deleteExpense(id)}>{labels.Delete}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 mb-5">
      <FilterModal show={showFilterModal} close={() => setFilterModal(false)} save={updateFilters} clear={clearFilters} />
      <div className="flex items-center justify-between">
        <div className="page-heading mb-2">{labels.History}</div>
        <div className="filter-section flex align-items-center justify-content-end">
          <div className="flex items-center cursor-pointer bg-gray-200 hover:bg-gray-100 p-2" onClick={() => setFilterModal(true)}>
            <TuneIcon fontSize="medium"/>
            <span className="pl-2">{labels.Filters}</span>
          </div>
        </div>
      </div>
      {
        memoizedArray.length ? 
        memoizedArray.map(expense => getExpenseCard(expense))
        : (<strong className="py-3 text-secondary flex justify-center text-orange">{labels.NoItems}</strong>)
      }
    </div>
  )
})