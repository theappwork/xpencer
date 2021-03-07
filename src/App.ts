import { auth } from './stores/auth';
import { account, currency, category, kind } from './stores/data';
import { googleAPILoad } from './utils/google';
import { listenAuthChanges } from './utils/auth';
import { listSpreadsheets } from './utils/drive';
import { createSpreadsheetSheet, createSpreadsheet, getSpreadsheetSheet, append } from './utils/sheets';
import { fromSheetsToTransaction, list1DArray } from './utils/utilities';
import { Input } from './model/spreadsheet';

// @ts-ignore
export const SPREADSHEET_NAME: string = import.meta.env.SNOWPACK_PUBLIC_SPREADSHEET_NAME;
// @ts-ignore
export const BASE_SHEET_NAME: string = import.meta.env.SNOWPACK_PUBLIC_BASE_SHEET_NAME;
// @ts-ignore
export const DEFAULT_ACCOUNT: string = import.meta.env.SNOWPACK_PUBLIC_DEFAULT_ACCOUNT;
// @ts-ignore
const SHEET_HEADER: string = import.meta.env.SNOWPACK_PUBLIC_COMMA_SEPARATED_SHEET_HEADER;

export const getOrCreateSpreadsheet = async (): Promise<string> => {
  try {
    let spreadsheetId = await listSpreadsheets(SPREADSHEET_NAME);

    if (!spreadsheetId) {
      spreadsheetId = await createSpreadsheet(SPREADSHEET_NAME);
      // TODO create base sheet (BASE_SHEET_NAME)
    }

    return spreadsheetId;
  } catch (e) {
    alert(`${getOrCreateSpreadsheet.name}: ${e.message}`);
    throw e;
  }
};

export const fetchBaseLists = async (spreadsheetId: string) => {
  const [ accounts, currencies, categories, kinds ] = await Promise.all([
    list1DArray(spreadsheetId, BASE_SHEET_NAME, 'A2:A'),
    list1DArray(spreadsheetId, BASE_SHEET_NAME, 'C2:C'),
    list1DArray(spreadsheetId, BASE_SHEET_NAME, 'E2:E'),
    list1DArray(spreadsheetId, BASE_SHEET_NAME, 'G2:G'),
  ]);

  account.set(accounts!);
  currency.set(currencies!);
  category.set(categories!);
  kind.set(kinds!);

  return [ accounts, currencies, categories, kinds ];
};

export const getSheet = async (spreadsheetId: string, sheetName: string): Promise<Input[]> => {
  let sheet = await getSpreadsheetSheet(spreadsheetId, sheetName, 'A2:F');

  if (sheet === null) {
    sheet = await createSpreadsheetSheet(spreadsheetId, sheetName);
    const sheetHeader = SHEET_HEADER.split(',').map((header) => header.trim());
    await append(spreadsheetId, sheetName, [ sheetHeader ]);
  }

  return fromSheetsToTransaction(sheet!);
};

export const initClient = async () => {
  try {
    await googleAPILoad();

    const currentUser = gapi.auth2.getAuthInstance().currentUser;
    auth.setCurrentUser(currentUser ? currentUser.get().getBasicProfile() : null);

    listenAuthChanges((_) => {
      auth.setCurrentUser(currentUser ? currentUser.get().getBasicProfile() : null);
    });
  } catch (e) {
    alert(`${initClient.name}: ${e.message}`);
  }
};
