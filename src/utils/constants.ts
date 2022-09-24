import { ICategoryIcons, IPaths } from "../model/Interfaces"

export const LABELS = {
  overview: "Home",
  statistics: "Statistics",
  history: "History",
  addNew: "Add",
  profile: "Profile",
  category: "Category"
}

export enum categories {
  ALL = 'all',
  FOOD = 'Food',
  TRANSPORTATION = 'Transportation',
  SHOPPING = 'Shopping',
  VACATION = 'Vacation',
  EDUCATION = 'Education',
  ENTERTAINMENT = 'Entertainment',
  OTHERS = 'Others'
}

export const categoryArray = [
  categories.FOOD,
  categories.TRANSPORTATION,
  categories.SHOPPING,
  categories.EDUCATION,
  categories.VACATION,
  categories.ENTERTAINMENT,
  categories.OTHERS
]

export enum ModeOfPayment {
  CARD = 'Card',
  TRANSFER = 'Transfer',
  CASH = 'Cash',
  UPI = 'UPI'
}

export const PaymentModes = [
  ModeOfPayment.CARD,
  ModeOfPayment.CASH,
  ModeOfPayment.TRANSFER,
  ModeOfPayment.UPI
]

export const paths:IPaths = {
  'Home': "/",
  'Statistics': "/stats",
  'History': "/history",
  'Add': "/addExpense",
  'Profile': "/profile",
  'Welcome': "/welcome"
}

export const pathKeys:IPaths = {
  "/": 'Home',
  "/stats": 'Statistics',
  "/history": 'History',
  "/addExpense": 'Add',
  "/profile": 'Profile',
  "/welcome": 'Welcome'
}

export const categoryIcons: ICategoryIcons = {
  food: '🥗',
  transportation: '🚗',
  shopping: '👜',
  vacation: '🏖',
  education: '📚',
  others: '🧾',
  entertainment: '🎬'
}

export const categoryColors: Record<string, string> = {
  food: '#FFF1C9',
  transportation: '#F7B7A3',
  shopping: '#EA5F89',
  vacation: '#9B3192',
  education: '#57167E',
  others: '#7f7f7f',
  entertainment: '#2B0B3F'
}

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
