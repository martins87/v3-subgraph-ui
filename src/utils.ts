export const reduceAddress = (address: string): string => {
  return address.slice(0, 6) + "..." + address.slice(-3);
};

export const truncate = (str: string, n: number): string => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};

export const timeDiff = (curr: any, prev: any): string => {
  var ms_Min = 60 * 1000; // milliseconds in Minute
  var ms_Hour = ms_Min * 60; // milliseconds in Hour
  var ms_Day = ms_Hour * 24; // milliseconds in day
  var ms_Mon = ms_Day * 30; // milliseconds in Month
  var ms_Yr = ms_Day * 365; // milliseconds in Year
  var diff = curr - prev*1000; //difference between dates

  // If the diff is less then milliseconds in a minute
  if (diff < ms_Min) {
    return Math.round(diff / 1000) + ' seconds ago';

  // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
    return Math.round(diff / ms_Min) + ' minutes ago';

  // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
    return Math.round(diff / ms_Hour) + ' hours ago';

  // If the diff is less then milliseconds in a Month
  } else if (diff < ms_Mon) {
    return Math.round(diff / ms_Day) + ' days ago';

  // If the diff is less then milliseconds in a year
  } else if (diff < ms_Yr) {
    return Math.round(diff / ms_Mon) + ' months ago';
  } else {
    return Math.round(diff / ms_Yr) + ' years ago';
  }
};

export const formatUSD = (p: number): string => {
  let price = p;
  if (price < 1000) return "$" + price.toFixed(2);

  price = Math.round(p);
  let trillions: number = Math.round(price/1000000000000);
  let billions: number = Math.round(price/1000000000);
  let millions: number = Math.round(price/1000000);
  let thousands: number = Math.round(price/1000);
  let hundreds: number = Math.round(price%1000);

  return trillions > 0 ?
    "$" + trillions + "." + billions.toString().slice(-2) + "t" :
    billions > 0 ?
    "$" + billions + "." + millions.toString().slice(-2) + "b" :
    millions > 0 ?
    "$" + millions + "." + thousands.toString().slice(-2) + "m" :
    "$" + thousands + "." + hundreds.toString().slice(-2) + "k";
};

export const priceChange = (newPrice: number, oldPrice: number): string => {
  return ((newPrice - oldPrice) / oldPrice * 100).toFixed(2) + "%";
};
