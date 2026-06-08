
import centsToDisplay from './inputMoney/centsToDisplay';
import { getMoneyConfig } from './moneyConfig.ts';
 
/**
 * Muestra un valor decimal como cadena de dinero formateada.
 * Usa la configuración global establecida con `setMoneyConfig` si no se pasan parámetros.
 *
 * @param value    - El valor a mostrar (ej: 1234.56)
 * @param symbol   - Símbolo de moneda (override; usa el global si se omite)
 * @param decimals - Número de decimales (override; usa el global si se omite)
 * @returns        - Cadena formateada, ej: "1,234.56 Bs."
 */
export const showMoney = (value: number, decimals?: number, symbol?: string): string => {
    const cfg = getMoneyConfig();
    const resolvedDecimals = decimals ?? cfg.decimals;
    const resolvedSymbol   = symbol  ?? cfg.symbol;

    const formatted = centsToDisplay(value, resolvedDecimals);
    return resolvedSymbol ? `${formatted} ${resolvedSymbol}` : formatted;
};