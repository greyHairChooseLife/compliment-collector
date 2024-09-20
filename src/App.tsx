import { useEffect } from 'react';
import './App.css';
import { getRows, addRows } from './api/google-sheet';

function App() {
  useEffect(() => {
    const loadRows = async () => {
      const rows = await getRows('YtoS');
      console.log(rows);
    };

    const addRow = async () => {
      await addRows('YtoS', 'Hello');
    };

    loadRows();
    addRow();
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
