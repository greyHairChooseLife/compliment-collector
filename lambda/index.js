import { JWT } from 'google-auth-library';

export const handler = async () => {
  try {
    // Lambda 환경변수에서 서비스 계정 정보 로드
    const serviceAccountEmail = process.env.client_email;
    const privateKey = process.env.private_key.replace(/\\n/g, '\n'); // 줄바꿈 문제 해결

    // JWT 인증 생성
    const auth = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 액세스 토큰 요청
    const tokens = await auth.authorize();

    // 클라이언트에 토큰 전달
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'https://greyhairchooselife.github.io',
        'Access-Control-Allow-Methods': 'GET, OPTIONS', // OPTIONS을 추가하지 않으면 CORS 오류 발생
      },
      body: JSON.stringify({
        access_token: tokens.access_token, // 액세스 토큰 전달
        expires_in: tokens.expiry_date - Date.now() / 1000, // 토큰 만료 시간
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
