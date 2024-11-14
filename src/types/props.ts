import { ChangeEvent } from 'react';
import { User, Record } from '.';

export type WritingPraiseProps = {
  newPraise: string;
  addPraise: (sheetName: string) => Promise<{ success: boolean } | undefined>;
  onChangePrase: (
    e: ChangeEvent<HTMLTextAreaElement>,
    sheetName: string,
  ) => void;
  who: User;
};

export type ReadingPraiseProps = {
  records: Record[];
  reloadRecords: boolean;
  who: User;
};
