import { GoogleSpreadsheet } from 'google-spreadsheet';
import { getGoogleAuthData } from './authFromLambda';

const SHEET_ID = '1QtknLF9IMTYVPD-mika5K6a9P4-shE7kwPyyWkbBcPY';

let cachedToken: string | null = null;
let tokenExpirationTime: number | null = null;

const getGoogleAuthTokenCached = async () => {
  const now = Date.now(); // 이것은 미리초 단위

  if (!cachedToken || !tokenExpirationTime || tokenExpirationTime < now) {
    const authData = await getGoogleAuthData();
    cachedToken = authData.access_token;
    tokenExpirationTime = now + authData.expires_in * 1000; // 람다에서 전달받은 만료시간은 초 단위이다.
  }

  return cachedToken;
};

const getSheet = async () => {
  const accessToken = await getGoogleAuthTokenCached();

  if (!accessToken) throw new Error('No access token');
  const doc = new GoogleSpreadsheet(SHEET_ID, { token: accessToken });

  return doc;
};

export { getSheet };
