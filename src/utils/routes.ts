import AddExpense from "../components/addExpense/AddExpense";
import Home from "../components/overview/Home";
import Profile from "../components/profile/Profile";
import Stats from "../components/stats/Stats";
import History from "../components/history/History";
import { IRoutes } from "../model/Interfaces";
import { paths } from "./constants";

export const routes: IRoutes = {
  overview: {
    component: Home,
    route: paths.Home
  },
  history: {
    component: History,
    route: paths.History
  },
  profile: {
    component: Profile,
    route: paths.Profile
  },
  stats: {
    component: Stats,
    route: paths.Statistics
  },
  addExpense: {
    component: AddExpense,
    route: paths.Add
  }
}