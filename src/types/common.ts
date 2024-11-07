export type User = 'YtoS' | 'StoY';

export interface Record {
  origin_date: string;
  local_date: string;
  show_date: string;
  praise: string;
}

export interface IsWritable {
  leftPraise?: boolean;
  rightPraise?: boolean;
}
