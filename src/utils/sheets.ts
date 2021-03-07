import { showGoogleException } from './utilities';

// TODO
export const createSpreadsheet = async (spreadsheetName: string): Promise<string> => {
  const response = await gapi.client.sheets.spreadsheets.create(
    {},
    {
      properties: {
        title: spreadsheetName,
      },
      sheets: [], //TODO
    },
  );

  const spreadsheetId = response.result.spreadsheetId;

  if (!spreadsheetId) {
    throw new Error('Is spreadsheet created? Could not get ID');
  }

  return spreadsheetId;
};

export const getSpreadsheetSheet = async (
  spreadsheetId: string,
  sheetName: string = 'Sheet1',
  sheetRange = 'A1:A',
): Promise<any[][] | null> => {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${sheetRange}`,
    });

    const range = response.result;

    if (!range || !range.values) {
      return [];
    }

    return range.values;
  } catch (e) {
    showGoogleException(e);
    return null;
  }
};

export const createSpreadsheetSheet = async (
  spreadsheetId: string,
  sheetName: string,
  rows: number = 5000,
  columns: number = 25,
): Promise<any[][] | null> => {
  try {
    await gapi.client.sheets.spreadsheets.batchUpdate(
      { spreadsheetId },
      {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
                sheetType: 'GRID',
                gridProperties: {
                  rowCount: rows,
                  columnCount: columns,
                },
              },
            },
          },
        ],
      },
    );

    return [ [] ];
  } catch (e) {
    showGoogleException(e);
    return null;
  }
};

export const append = async (spreadsheetId: string, sheetName = 'Sheet1', values: any[][], dimension: 'ROWS' | 'COLUMNS' = 'ROWS') => {
  const response = await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId,
    valueInputOption: 'USER_ENTERED',
    range: sheetName,
    resource: {
      majorDimension: dimension,
      values,
    },
  });

  if (!response.result.updates) {
    throw new Error('No updates');
  }

  console.log(`${response.result.updates.updatedCells} cells updated`);
};
