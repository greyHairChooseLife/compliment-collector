import { useState, useEffect } from 'react';
import './App.css';
import { getRows, addRows } from './api/google-sheet';

type Record = {
  date: string;
  praise: string;
};

function App() {
  const [leftRecords, setLeftRecords] = useState<Record[]>([]);
  const [rightRecords, setRightRecords] = useState<Record[]>([]);

  useEffect(() => {
    const loadRows = async () => {
      const leftRows = await getRows('YtoS');
      const rightRows = await getRows('StoY');

      const leftRecords = leftRows.map((row) => ({
        date: row.get('일자'),
        praise: row.get('칭찬'),
      }));

      const rightRecords = rightRows.map((row) => ({
        date: row.get('일자'),
        praise: row.get('칭찬'),
      }));

      setLeftRecords(leftRecords);
      setRightRecords(rightRecords);
    };

    // const addRow = async () => {
    //   await addRows('YtoS', 'Hello');
    // };

    loadRows();
    // addRow();
  }, []);

  return (
    <>
      <h2>오늘의 칭찬</h2>
      <h2>그간의 기록</h2>
      <div>
        {leftRecords.map((record) => (
          <div key={record.date + record.praise}>
            <p>
              {record.praise}
              <i> _ {record.date}</i>
            </p>
          </div>
        ))}
        {rightRecords.map((record) => (
          <div key={record.date + record.praise}>
            <p>
              {record.praise}
              <i> _ {record.date}</i>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
