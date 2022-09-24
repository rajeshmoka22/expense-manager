import { autorun, toJS } from "mobx";
import expenseStore from "../store/expenseStore";

export const capitalize = (str: string = ''): string => {
  return str.length ? `${str[0].toLocaleUpperCase()}${str.slice(1)}` : '';
}

export function autoSave(store: any, save: (props:string) => any) {
  let firstRun = true;
  autorun(() => {
    // This code will run every time any observable property
    // on the store is updated.
    const json = JSON.stringify(toJS(store));
    if (!firstRun) {
      save(json);
    }
    firstRun = false;
  });
}

export function calculatePercentage(value1: number, value2: number): number {
  return (value1/value2)*100;
}

export function hasUserName() {
  return !!expenseStore.username;
}