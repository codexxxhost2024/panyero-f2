export const isValidNumber = (num: string): boolean => {
  const number = parseInt(num, 10);
  return !isNaN(number) && number >= 1 && number <= 99;
};

export const formatNumber = (num: string): string => {
  const number = parseInt(num, 10);
  return number < 10 ? `0${number}` : `${number}`;
};

export const getCombinationKey = (first: string, second: string): string => {
  return `${formatNumber(first)}-${formatNumber(second)}`;
};