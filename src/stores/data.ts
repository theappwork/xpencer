import { writable, derived } from 'svelte/store';
import { Input, Sheet, Spreadsheet } from '../model/spreadsheet';

export const account = writable([] as string[]);
export const currency = writable([] as string[]);
export const category = writable([] as string[]);
export const kind = writable([] as string[]);

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

export const spreadsheet = buildSpreadsheetStore();
export const sheet = buildSheetStore();
