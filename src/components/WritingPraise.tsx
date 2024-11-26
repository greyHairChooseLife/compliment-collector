import { useState } from 'react';
import { WritingPraiseProps } from '../types';

const WritingPraise = ({
  newPraise,
  addPraise,
  onChangePrase,
  who,
}: WritingPraiseProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddButton = async () => {
    setIsAdding(true);
    const res = await addPraise(who);
    if (!res?.success) setIsAdding(false);
  };

  if (isAdding) return <div>업로드 중...</div>;

  return (
    <div className="writing-praise">
      <h3>{who === 'YtoS' ? '유진' : '상연'} 작성: </h3>
      <textarea
        placeholder="어제 고마웠던 일을 쓰세요."
        value={newPraise}
        onChange={(e) => onChangePrase(e, who)}
      />
      <button onClick={handleAddButton}>업로드</button>
    </div>
  );
};

export default WritingPraise;
