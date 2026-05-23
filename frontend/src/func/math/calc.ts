// calc.ts
import Decimal from 'decimal.js';

export const calc = (expression: string, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);

  // Normalizar enteros (sin punto) → decimal
  const normalized = String(expression).replace(
    /(?<![.\d])(\d+)(?![.\d])/g,
    (_, n) => new Decimal(parseInt(n)).div(factor).toFixed(decimals)
  );

  // Sanitizar
  const clean = normalized.replace(/[^0-9+\-*\/.()\s]/g, '').trim();
  if (!clean) return 0;

  // Tokenizar
  const tokens = clean.match(/(\d+\.?\d*|[+\-*/()])/g);
  if (!tokens) return 0;

  let pos = 0;

  const parseExpr = (): Decimal => {
    let left = parseTerm();
    while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
      const op = tokens[pos++];
      const right = parseTerm();
      left = op === '+' ? left.plus(right) : left.minus(right);
    }
    return left;
  };

  const parseTerm = (): Decimal => {
    let left = parseFactor();
    while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
      const op = tokens[pos++];
      const right = parseFactor();
      left = op === '*' ? left.mul(right) : left.div(right);
    }
    return left;
  };

  const parseFactor = (): Decimal => {
    if (tokens[pos] === '(') {
      pos++;
      const val = parseExpr();
      pos++;
      return val;
    }
    return new Decimal(tokens[pos++]);
  };

  return parseExpr().toDecimalPlaces(decimals).toNumber();
};

export default calc;