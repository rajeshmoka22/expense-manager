import { categories, ModeOfPayment } from "../utils/constants";

export interface IRoutes {
  [key:string] : {
    component: (props?:any) => JSX.Element,
    route: string
  }
}

export interface IPaths {
  [key:string]: string
}

export interface ICategoryIcons {
  [key:string]: string
}

export interface IExpenseProps {
  category: string,
  amount: number,
  currency: string,
  percentage: number
}

export interface ExpenseItem {
  id: string;
  name: string;
  date: string;
  category: categories;
  amount: number,
  mode: ModeOfPayment
}

export interface IHomeProps {
  expenseStore: {
    expenseList: Array<ExpenseItem>
    getMontlyPriceByCategory: (category: categories|string) => number,
    getMonthlyTotalPrice: () => number,
    currency: string,
    username: string,
    budget: number
  }
}