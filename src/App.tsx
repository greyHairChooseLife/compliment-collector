import { useState, useEffect } from 'react';
import './App.css';
import { getRows, addRows } from './api/google-sheet';

type Record = {
  origin_date: string;
  local_date: string;
  show_date: string;
  praise: string;
};

function App() {
  const [leftRecords, setLeftRecords] = useState<Record[]>([]);
  const [rightRecords, setRightRecords] = useState<Record[]>([]);
  const [reloadRecords, setReloadRecords] = useState(true);
  const [leftNewPraise, setLeftNewPraise] = useState('');
  const [rightNewPraise, setRightNewPraise] = useState('');

  useEffect(() => {
    const loadRows = async () => {
      const leftRows = await getRows('YtoS'); // 유진 -> 상연
      const rightRows = await getRows('StoY'); // 상연 -> 유진

      const leftRecords = leftRows.map((row) => ({
        origin_date: row.get('일자'),
        local_date: row.get('한국기준시'),
        show_date: row
          .get('한국기준시')
          .split(' ')
          .map((v: string, i: number) =>
            i === 0
              ? v.substring(2).replace(/-/g, '/')
              : v.slice(0, 2).concat('시'),
          )
          .join(' '),
        praise: row.get('칭찬'),
      }));

      const rightRecords = rightRows.map((row) => ({
        origin_date: row.get('일자'),
        local_date: row.get('한국기준시'),
        show_date: row
          .get('한국기준시')
          .split(' ')
          .map((v: string, i: number) =>
            i === 0
              ? v.substring(2).replace(/-/g, '/')
              : v.slice(0, 2).concat('시'),
          )
          .join(' '),
        praise: row.get('칭찬'),
      }));

      setLeftRecords(leftRecords);
      setRightRecords(rightRecords);

      setReloadRecords(false);
    };

    if (reloadRecords) loadRows();
  }, [reloadRecords]);

  const addPraise = async (sheetName: string) => {
    if (sheetName === 'YtoS') {
      await addRows(sheetName, leftNewPraise);
      setLeftNewPraise('');
    } else {
      await addRows(sheetName, rightNewPraise);
      setRightNewPraise('');
    }
    setReloadRecords(true);
  };

  const onChangePrase = (
    e: React.ChangeEvent<HTMLInputElement>,
    sheetName: string,
  ) => {
    if (sheetName === 'YtoS') setLeftNewPraise(e.target.value);
    else setRightNewPraise(e.target.value);
  };

  return (
    <>
      <h2>오늘의 칭찬</h2>
      <div>
        <div>
          <label>유진 작성: </label>
          <input
            type="text"
            placeholder="칭찬을 입력하세요"
            value={leftNewPraise}
            onChange={(e) => onChangePrase(e, 'YtoS')}
          />
          <button onClick={() => addPraise('YtoS')}>업로드</button>
        </div>
        <div>
          <label>상연 작성: </label>
          <input
            type="text"
            placeholder="칭찬을 입력하세요"
            value={rightNewPraise}
            onChange={(e) => onChangePrase(e, 'StoY')}
          />
          <button onClick={() => addPraise('StoY')}>업로드</button>
        </div>
      </div>
      <h2>그간의 기록</h2>
      <div>
        <div>
          <h3>to 상연</h3>
          {reloadRecords && <p>Loading...</p>}
          {leftRecords.map((record) => (
            <div key={record.origin_date + record.praise}>
              <p>
                {record.praise}
                <i> _ {record.show_date}</i>
              </p>
            </div>
          ))}
        </div>
        <div>
          <h3>to 유진</h3>
          {reloadRecords && <p>Loading...</p>}
          {rightRecords.map((record) => (
            <div key={record.origin_date + record.praise}>
              <p>
                {record.praise}
                <i> _ {record.show_date}</i>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
