import Decimal from 'decimal.js';

export const toInteger = (value: number, decimals: number = 2): number => {
    return new Decimal(value)
        .mul(Math.pow(10, decimals))
        .round()
        .toNumber();
};

