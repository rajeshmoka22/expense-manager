import { autorun, toJS } from "mobx";

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