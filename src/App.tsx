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
      if (leftNewPraise === '') {
        window.alert('칭찬을 입력하세요');
        return;
      }
      await addRows(sheetName, leftNewPraise);
      setLeftNewPraise('');
    } else {
      if (rightNewPraise === '') {
        window.alert('칭찬을 입력하세요');
        return;
      }
      await addRows(sheetName, rightNewPraise);
      setRightNewPraise('');
    }
    setReloadRecords(true);
  };

  const onChangePrase = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    sheetName: string,
  ) => {
    if (sheetName === 'YtoS') setLeftNewPraise(e.target.value);
    else setRightNewPraise(e.target.value);
  };

  return (
    <>
      <h2>오늘의 칭찬</h2>
      <div>
        <WritingPraise
          newPraise={leftNewPraise}
          addPraise={addPraise}
          onChangePrase={onChangePrase}
          who="YtoS"
        />
        <WritingPraise
          newPraise={rightNewPraise}
          addPraise={addPraise}
          onChangePrase={onChangePrase}
          who="StoY"
        />
      </div>
      <h2 className="history-header">그간의 기록</h2>
      <div className="history">
        <ReadingPraise
          records={leftRecords}
          reloadRecords={reloadRecords}
          who="YtoS"
        />
        <ReadingPraise
          records={rightRecords}
          reloadRecords={reloadRecords}
          who="StoY"
        />
      </div>
    </>
  );
}

type WritingPraiseProps = {
  newPraise: string;
  addPraise: (sheetName: string) => void;
  onChangePrase: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    sheetName: string,
  ) => void;
  who: 'YtoS' | 'StoY';
};

const WritingPraise = ({
  newPraise,
  addPraise,
  onChangePrase,
  who,
}: WritingPraiseProps) => {
  return (
    <div className="writing-praise">
      <h3>{who === 'YtoS' ? '유진' : '상연'} 작성: </h3>
      <textarea
        placeholder="칭찬을 입력하세요"
        value={newPraise}
        onChange={(e) => onChangePrase(e, who)}
      />
      <button onClick={() => addPraise(who)}>업로드</button>
    </div>
  );
};

type ReadingPraiseProps = {
  records: Record[];
  reloadRecords: boolean;
  who: 'YtoS' | 'StoY';
};

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
const ReadingPraise = ({ records, reloadRecords, who }: ReadingPraiseProps) => {
  const [isFold, setIsFold] = useState(true);

  const getDayPassed = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    now.setHours(0, 0, 0, 0);
    past.setHours(0, 0, 0, 0);
    const diff = now.getTime() - past.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return day > 0 ? `${day}일 전` : '오늘';
  };

  const reversedRecords = [...records].reverse();
  const lastRecord: undefined | null | (Record & { dayPassed?: string }) =
    reversedRecords.length > 0 ? reversedRecords.shift() : null;
  if (lastRecord) lastRecord.dayPassed = getDayPassed(lastRecord.origin_date);

  const toggleFold = () => {
    setIsFold(!isFold);
  };

  return (
    <div className="reading-praise">
      <h3>to {who === 'YtoS' ? '상연' : '유진'}</h3>
      {reloadRecords && <p>Loading...</p>}
      {lastRecord && (
        <div className="reading-last-praise">
          <b>( {lastRecord.dayPassed} ) </b>
          <span>{lastRecord.praise}</span>
        </div>
      )}
      <button className="fold-btn" onClick={toggleFold}>
        {isFold ? (
          <>
            더 보기 <IoIosArrowDown />
          </>
        ) : (
          <>
            접기 <IoIosArrowUp />
          </>
        )}
      </button>
      {isFold || (
        <div className="old-history">
          {reversedRecords.map((record) => (
            <div key={record.origin_date + record.praise}>
              <p>
                {record.praise}
                <i> _ {record.show_date}</i>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
