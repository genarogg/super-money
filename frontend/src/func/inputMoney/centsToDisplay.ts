import { DEFAULT_DECIMALS, resolveDecimals } from '../moneyConfig';

const centsToDisplay = (cents: number, decimals: number): string => {
  const resolvedDecimals = resolveDecimals(decimals, DEFAULT_DECIMALS, 'centsToDisplay');

  if (resolvedDecimals === 0) {
    const str = String(cents);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const factor = Math.pow(10, resolvedDecimals);
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const intPart = Math.floor(abs / factor);
  const decPart = abs % factor;

  const intStr = String(intPart).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decStr = String(decPart).padStart(resolvedDecimals, '0');
  return `${sign}${intStr}.${decStr}`;
};

export default centsToDisplay;