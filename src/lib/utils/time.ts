// Convert timestamp to date

import { fromUnixTime, intlFormatDistance } from "date-fns";

export const getRelativeTime = (unixTime: number) => {
  return intlFormatDistance(new Date(fromUnixTime(unixTime)), new Date());
};
