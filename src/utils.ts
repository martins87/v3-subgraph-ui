export const reduceAddress = (address: string): string => {
  return address.slice(0, 5) + "..." + address.slice(-3);
};

export const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};