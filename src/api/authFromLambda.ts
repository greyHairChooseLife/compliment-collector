export const getGoogleAuthData = async () => {
  const response = await fetch(
    'https://w0s4wu14e9.execute-api.us-east-1.amazonaws.com/default/compliment-collector',
    {
      method: 'GET',
    },
  );

  return await response.json();
};
