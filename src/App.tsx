import { useEffect } from 'react';
import './App.css';
import { getSheet } from './api/google-sheet';

function App() {
  useEffect(() => {
    const loadDoc = async () => {
      console.log('로딩...');
      const doc = await getSheet();
      await doc.loadInfo();
      console.log('상연:', doc.title);
    };

    loadDoc();
  }, []);

  return (
    <>
      <h1>칭찬 수집기</h1>
      <h2>오늘의 칭찬</h2>
      <h2>그간의 기록</h2>
    </>
  );
}

export default App;
