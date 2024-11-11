import { WritingPraiseProps } from '../types';

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
        placeholder="감사을 입력하세요"
        value={newPraise}
        onChange={(e) => onChangePrase(e, who)}
      />
      <button onClick={() => addPraise(who)}>업로드</button>
    </div>
  );
};

export default WritingPraise;
