import { ReadingPraise, WritingPraise } from './components';
import useRecords from './hooks/useRecords';
import './App.css';
import { UserSelector } from './components/UserSelector';
import { useUser } from './contexts/UserContext';

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
  const { currentUser } = useUser();

  return (
    <>
      <UserSelector />
      {!currentUser ? (
        <p>사용자를 선택해주세요.</p>
      ) : (
        <>
          <h2>오늘의 감사</h2>
          <div>
            {currentUser === 'YtoS' && (
              <>
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
              </>
            )}
            {currentUser === 'StoY' && (
              <>
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
              </>
            )}
          </div>
        </>
      )}
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
