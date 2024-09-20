export const getGoogleAuthToken = async () => {
  const response = await fetch(
    'https://w0s4wu14e9.execute-api.us-east-1.amazonaws.com/default/compliment-collector',
    {
      method: 'GET',
    },
  );

  const data = await response.json();
  return data.access_token; // 액세스 토큰을 반환
};
