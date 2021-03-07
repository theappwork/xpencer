import { writable, derived } from 'svelte/store';
import { Options } from '../model';
import { Input, Sheet, Spreadsheet } from '../model/spreadsheet';

const buildOptionsStore = () => {
  const { subscribe, set } = writable({} as Options);

  const methods = {
    clear: () => set({}),
  };

  return {
    subscribe,
    set,
    ...methods,
  };
};

const buildSpreadsheetStore = () => {
  const { subscribe, set, update } = writable({} as Spreadsheet);

  const methods = {
    clear: () => set({}),
    setId: (id: string) =>
      update((state) => {
        state.id = id;
        return state;
      }),
    setCurrentSheet: (sheet: string) =>
      update((state) => {
        state.sheet = sheet;
        return state;
      }),
  };

  const store = {
    subscribe,
  };

  const state = derived(store, ($state) => $state);

  return {
    subscribe: state.subscribe,
    set,
    ...methods,
  };
};

const buildSheetStore = () => {
  const { subscribe, set, update } = writable({} as Sheet);

  const methods = {
    clear: () => set({}),
    setData: (sheet: string, data: Input[]) =>
      update((state) => {
        state.sheet = sheet;
        state.data = data;
        return state;
      }),
  };

  return {
    subscribe,
    ...methods,
  };
};

export const options = buildOptionsStore();
export const spreadsheet = buildSpreadsheetStore();
export const sheet = buildSheetStore();
