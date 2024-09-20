import { GoogleSpreadsheet } from 'google-spreadsheet';
import { getGoogleAuthToken } from './authFromLambda';

const SHEET_ID = '1QtknLF9IMTYVPD-mika5K6a9P4-shE7kwPyyWkbBcPY';

const getSheet = async () => {
  const accessToken = await getGoogleAuthToken();

  const doc = new GoogleSpreadsheet(SHEET_ID, { token: accessToken });

  return doc;
};

export { getSheet };
