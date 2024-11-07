import { ReadingPraise, WritingPraise } from './components';
import useRecords from './hooks/useRecords';
import './App.css';

function App() {
  const {
    leftRecords,
    rightRecords,
    leftNewPraise,
    rightNewPraise,
    reloadRecords,
    areWritables,
    addPraise,
    onChangePrase,
  } = useRecords();

  return (
    <>
      <h2>오늘의 칭찬</h2>
      <div>
        {areWritables.leftPraise ? (
          <WritingPraise
            newPraise={leftNewPraise}
            addPraise={addPraise}
            onChangePrase={onChangePrase}
            who="YtoS"
          />
        ) : areWritables.leftPraise === undefined ? (
          <p>로딩중...</p>
        ) : (
          <p>유진: 오늘은 이미 작성하였습니다.</p>
        )}
        {areWritables.rightPraise ? (
          <WritingPraise
            newPraise={rightNewPraise}
            addPraise={addPraise}
            onChangePrase={onChangePrase}
            who="StoY"
          />
        ) : areWritables.rightPraise === undefined ? (
          <p>로딩중...</p>
        ) : (
          <p>상연: 오늘은 이미 작성하였습니다.</p>
        )}
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

export default App;
