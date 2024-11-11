// NOTE:
// :감사는 하루에 1개 이하
import { Record } from './types';

type isWritableProps = {
  records: Record[];
};

export const isWritable = (props: isWritableProps) => {
  const { records } = props;
  //마지막 감사의 시간을 가져오기
  const lastPraisLocalDate = records[records.length - 1]?.local_date;

  //예외처리: 하나도 작성하지 않은 경우
  if (!lastPraisLocalDate) return true;

  const lastPraiseTime = new Date(lastPraisLocalDate);

  //이것이 현지 시간 기준 '금일' 작성되었는지 확인
  const todayInit = new Date();
  todayInit.setHours(0, 0, 0, 0);

  return lastPraiseTime < todayInit;
};
