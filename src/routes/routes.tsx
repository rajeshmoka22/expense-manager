import * as React from 'react'; 
import { Route, Routes } from 'react-router-dom';
import AddExpense from "../components/addExpense/AddExpense";
import Home from "../components/overview/Home";
import Profile from "../components/profile/Profile";
import Stats from "../components/stats/Stats";
import History from "../components/history/History";
import { paths } from "../utils/constants";
import expenseStore from '../store/expenseStore';
import Welcome from '../components/welcome/Welcome';
import Nav from '../components/nav/NavBar';

const HomeComponent = <Home expenseStore={expenseStore}/>;
const AddExpenseComponent = <AddExpense expenseStore={expenseStore} />
const HistoryComponent = <History expenseStore={expenseStore} />
const WelcomeComponent = (
  <Welcome
    updateUserName={expenseStore.updateUserName}
    updateCurrency={expenseStore.updateCurrency}
  />);
export default function Routing() {
  return (
    <>
      <Routes>
        <Route path={paths.Home} element={HomeComponent} />
        <Route path={paths.Add} element={AddExpenseComponent} />
        <Route path={paths.Profile} element={<Profile />} />
        <Route path={paths.Statistics} element={<Stats />} />
        <Route path={paths.History} element={HistoryComponent} />
        {!expenseStore.username ? <Route path={paths.Welcome} element={WelcomeComponent} /> : ''}
        <Route path='/' element={HomeComponent} />
      </Routes>
      <Nav expenseStore={expenseStore} />
    </>
  )
}