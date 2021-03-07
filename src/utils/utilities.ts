import { Input } from '../model/spreadsheet';
import { getSpreadsheetSheet } from './sheets';

export const fromSheetsToTransaction = (sheet: any[][]) => {
  const data: Input[] = [];

  for (let index = 0; index < sheet.length; index++) {
    const element: string[] = sheet[index];

    if (!element.length) {
      break;
    }

    const input = new Input(element[0], element[1], element[2], element[3], element[4], element[5]);
    data.push(input);
  }

  return data;
};

export const list1DArray = async (spreadsheetId: string, sheetName: string, range: string): Promise<string[] | undefined> => {
  try {
    const sheet = await getSpreadsheetSheet(spreadsheetId, sheetName, range);
    return fromSheetTo1DArray(sheet!);
  } catch (e) {
    showGoogleException(e);
    return undefined;
  }
};

export const showGoogleException = (e: { result: any; status: number }) => {
  const error = e.result.error;

  switch (e.status) {
    case 429:
      throw Error(error.status);
    default:
      alert(`${error.status} - ${error.message}`);
  }
};

const fromSheetTo1DArray = (sheet: any[][]) => {
  const data: string[] = [];

  for (let index = 0; index < sheet.length; index++) {
    const element: string[] = sheet[index];

    if (!element.length) {
      break;
    }

    data.push(element[0].toUpperCase());
  }

  return data;
};
