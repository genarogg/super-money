import Decimal from 'decimal.js';

export const toDecimal = (cents: number, decimals: number = 2): number => {
  return new Decimal(cents)
    .div(Math.pow(10, decimals))
    .toDecimalPlaces(decimals)
    .toNumber();
};