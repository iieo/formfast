export function convertUnixTimestampToLocaleDate(unixTimestamp: number) {
  const timestampInMilliSeconds = unixTimestamp * 1000;
  const date = new Date(timestampInMilliSeconds);
  // NOTE: getMonth is zero-based
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
