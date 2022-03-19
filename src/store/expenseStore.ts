import { action, computed, observable, extendObservable, autorun, toJS } from "mobx";
import { ExpenseItem } from "../model/Interfaces";
import { categories } from "../utils/constants";
import moment from "moment";
// import {autoSave} from "../utils/reusables";

class ExpenseStore {
  @observable expenses: Array<ExpenseItem> = [];
  @observable username: string = '';
  @observable currency: string = '';

  constructor() {
    this.load();
    setTimeout(this.setupObservers.bind(this), 500);
  }

  setupObservers() {
    autorun(() => {
      const json = JSON.stringify(toJS(this));
      this.save(json);
    });
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