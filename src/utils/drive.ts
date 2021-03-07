export const listSpreadsheets = async (spreadsheetName: string): Promise<string | undefined> => {
  const response = await gapi.client.drive.files.list({
    q: `mimeType='application/vnd.google-apps.spreadsheet' and name contains '${spreadsheetName}'`,
    pageSize: 5,
    fields: 'files(id, name)',
  });

  const files = response.result.files;

  if (!files || !files.length) {
    console.warn(`File '${spreadsheetName}' not found`);
    return undefined;
  }

  if (files.length > 1) {
    console.warn(`Found ${files.length} spreadsheets with name containing '${spreadsheetName}'`);
    return undefined;
  }

  return files[0].id!!;
};
