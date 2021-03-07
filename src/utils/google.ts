// @ts-ignore
const CLIENT_ID = import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID;
// @ts-ignore
const API_KEY = import.meta.env.SNOWPACK_PUBLIC_API_KEY;
const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive';

export const googleAPILoad = (): Promise<void> =>
  new Promise((resolve, reject) => gapi.load('client:auth2', () => googleAPIClientInit().then(resolve).catch(reject)));

const googleAPIClientInit = () =>
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });
