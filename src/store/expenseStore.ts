import { action, computed, observable, extendObservable, autorun, toJS, reaction, runInAction } from "mobx";
import { ExpenseItem } from "../model/Interfaces";
import { categories, ModeOfPayment } from "../utils/constants";
import moment from "moment";

class ExpenseStore {
  @observable expenses: Array<ExpenseItem> = [];
  @observable username: string = '';
  @observable currency: string = '';
  @observable budget: number = 0;
  @observable filteredItems: Array<ExpenseItem> = [];
  @observable filters: Record<string, string> = {
    category: categories.ALL,
    searchString: '',
    startDate: '',
    endDate: '',
    paymentMode: ''
  }
  @observable isFilterActive = false;
  @observable showFilters = false;
  @observable isExpenseEdit = false;
  @observable editingExpenseItem: ExpenseItem = {
    name: '',
    mode: ModeOfPayment.CARD,
    amount: 0,
    category: categories.FOOD,
    date: '',
    id: ''
  };

  constructor() {
    this.load();
    setTimeout(this.setupObservers.bind(this), 500);
  }

  setupObservers() {
    autorun(() => {
      const json = JSON.stringify(toJS(this));
      this.save(json);
    });
    reaction(
      () => this.filters,
      () => {
        runInAction(() => {
          const {category, paymentMode, startDate, endDate, searchString} = this.filters
          if(
            category.toLocaleUpperCase() !== categories.ALL.toLocaleUpperCase() ||
            !!paymentMode || !!startDate || !!endDate || searchString
          ){
            this.isFilterActive = true;
            this.filterItems();
          } else this.isFilterActive = false;
        })
      }
    )

    reaction(
      () => this.isExpenseEdit,
      (val) => {
        if(!val) this.editingExpenseItem = {
          name: '',
          mode: ModeOfPayment.CARD,
          amount: 0,
          category: categories.FOOD,
          date: '',
          id: ''
        };
      }
    )
  }

  @action
  addExpense(expense: ExpenseItem) {
    this.expenses.push(expense);
  }

  @computed
  get expenseList() {
    return this.expenses;
  }

  getMontlyPriceByCategory = (category: categories | string):number => {
    const expenses = [...this.expenseList];
    let index = expenses.length-1;
    const currentDateTime = moment().subtract(1, 'months').format('YYYY-MM-DDTHH:MM:SS');
    let totalPrice = 0;
    while(index >= 0) {
      if(expenses[index].date >= currentDateTime) {
        if(category === 'all') totalPrice+= expenses[index].amount; 
        else if(expenses[index].category === category) totalPrice+= expenses[index].amount; 
      } else break;
      index-=1;
    }
    return totalPrice;
  }

  getMonthlyTotalPrice = ():number => {
    const expenses = [...this.expenseList];
    let index = expenses.length-1;
    const currentDateTime = moment().subtract(1, 'months').format('YYYY-MM-DDTHH:MM:SS');
    let totalPrice = 0;
    while(index >= 0) {
      if(expenses[index].date >= currentDateTime) {
        totalPrice+= expenses[index].amount; 
      } else break;
      index-=1;
    }
    return totalPrice;
  }

  @action
  filterItems = () => {
    const expenses = [...this.expenseList];
    const {paymentMode, category, startDate, endDate, searchString} = this.filters;
    if(this.isFilterActive) {
      this.filteredItems = expenses.filter((expense) => {
        if(
          (category === categories.ALL ? true : expense.category.toLocaleLowerCase() === category.toLocaleLowerCase()) &&
          (paymentMode !== ModeOfPayment.ALL ? expense.mode.toLocaleLowerCase() === paymentMode.toLocaleLowerCase() : true) && 
          (!!searchString ? expense.name.toLowerCase().includes(searchString.toLowerCase()) : true) &&
          (!!startDate ? new Date(expense.date) >= new Date(startDate) : true) &&
          (!!endDate ? new Date(expense.date) <= new Date(endDate) : true)
        ) return true;
        return false;
      })
    }
  }

  updateFilters = action((filters: Record<string, string>) => {
    this.filters = {...this.filters, ...filters};
  })

  clearFilters = action(() => {
    this.filters = {
      category: categories.ALL,
      searchString: '',
      startDate: '',
      endDate: '',
      paymentMode: ''
    }
  })

  deleteExpense = action((id: string) => {
    this.expenses = [...this.expenses.filter((expense) => expense.id !== id)]
    this.filterItems()
  })

  @action
  addExpenseItem = (expense: ExpenseItem) => {
    this.expenses.push(expense);
  }

  @action
  updateUserName = (value: string) => {
    this.username = value;
  }

  @action
  updateCurrency = (value: string) => {
    this.currency = value;
  }

  @action
  updateBudget = (value: number) => {
    this.budget = value;
  }

  @action
  setShowFilter = (value: boolean) => {
    this.showFilters = value;
  }

  @action
  setEditExpense = (value: boolean) => {
    this.isExpenseEdit = value;
  }

  @action
  setExpenseItemToEdit = (val: ExpenseItem) => {
    this.editingExpenseItem = val;
  }

  @action
  saveExpenseItemEdits = (val: ExpenseItem) => {
    const item = this.expenseList.find(expense => expense.id === val.id);
    if(item) {
      item.name = val.name;
      item.amount = val.amount;
      item.category = val.category;
      item.date = val.date;
      item.mode = val.mode;
    }
  }

  load() {
    const store = localStorage.getItem('expenseStore');
    if (store) {
      const data = JSON.parse(store);
      extendObservable(this, data);
    }
  }

  save(json: string) {
    localStorage.setItem('expenseStore', json);
  }

}

export default new ExpenseStore();