import { ChangeEvent } from 'react';
import { Record } from '.';

export type WritingPraiseProps = {
  newPraise: string;
  addPraise: (sheetName: string) => void;
  onChangePrase: (
    e: ChangeEvent<HTMLTextAreaElement>,
    sheetName: string,
  ) => void;
  who: 'YtoS' | 'StoY';
};

export type ReadingPraiseProps = {
  records: Record[];
  reloadRecords: boolean;
  who: 'YtoS' | 'StoY';
};
