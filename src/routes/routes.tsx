import * as React from 'react'; 
import { Route, Routes } from 'react-router-dom';
import { hasUserName } from '../utils/reusables';
import { paths } from "../utils/constants";
import AddExpenseRoot from "../components/addExpense/index";
import HomeComponent from '../components/overview/index';
import ProfileComponentRoot from "../components/profile/index";
import StatsComponentRoot from "../components/stats/index";
import HistoryComponentRoot from "../components/history/index";
import WelcomeRoot from '../components/welcome/index';
import NavRoot from '../components/nav/index';

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path={paths.Home} element={<HomeComponent />} />
        <Route path={paths.Add} element={<AddExpenseRoot />} />
        <Route path={paths.Profile} element={<ProfileComponentRoot />} />
        <Route path={paths.Statistics} element={<StatsComponentRoot />} />
        <Route path={paths.History} element={<HistoryComponentRoot />} />
        <Route path='/' element={<HomeComponent />} />
        {!hasUserName() ? <Route path={paths.Welcome} element={<WelcomeRoot />} /> : null}
      </Routes>
      <NavRoot />
    </>
  )
}