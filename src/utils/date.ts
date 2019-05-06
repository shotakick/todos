import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = 'ja';

export const toFormatedDate = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat('yyyy/M/d(EEE) HH:mm');
};
