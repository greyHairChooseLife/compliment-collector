import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { Record, ReadingPraiseProps } from '../types';

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
          <pre>{lastRecord.praise}</pre>
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

export default ReadingPraise;
