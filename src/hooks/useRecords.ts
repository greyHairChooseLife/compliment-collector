import { useState, useEffect } from 'react';
import { getRows, addRows } from '../api/google-sheet';
import { isWritable } from '../features';
import { Record, IsWritable } from '../types';

const useRecords = () => {
  const [leftRecords, setLeftRecords] = useState<Record[]>([]);
  const [rightRecords, setRightRecords] = useState<Record[]>([]);
  const [reloadRecords, setReloadRecords] = useState(true);
  const [leftNewPraise, setLeftNewPraise] = useState('');
  const [rightNewPraise, setRightNewPraise] = useState('');
  const [areWritables, setAreWritables] = useState<IsWritable>({});

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
        praise: row.get('감사'),
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
        praise: row.get('감사'),
      }));

      setAreWritables({
        leftPraise: isWritable({ records: leftRecords }),
        rightPraise: isWritable({ records: rightRecords }),
      });

      setLeftRecords(leftRecords);
      setRightRecords(rightRecords);

      setReloadRecords(false);
    };

    if (reloadRecords) loadRows();
  }, [reloadRecords]);

  const addPraise = async (sheetName: string) => {
    if (sheetName === 'YtoS') {
      if (leftNewPraise === '') {
        window.alert('감사을 입력하세요');
        return;
      }
      await addRows(sheetName, leftNewPraise);
      setLeftNewPraise('');
    } else {
      if (rightNewPraise === '') {
        window.alert('감사을 입력하세요');
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

  return {
    leftRecords,
    rightRecords,
    leftNewPraise,
    rightNewPraise,
    reloadRecords,
    areWritables,
    addPraise,
    onChangePrase,
  };
};

export default useRecords;
