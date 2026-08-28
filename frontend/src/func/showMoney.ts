import centsToDisplay from './inputMoney/centsToDisplay';
import { getMoneyConfig, resolveDecimals } from './moneyConfig';
 
/**
 * Muestra un valor en centavos como cadena de dinero formateada.
 * Usa la configuración global establecida con `setMoneyConfig` si no se pasan parámetros.
 *
 * @param value    - El valor a mostrar, siempre como entero en centavos (ej: 123456)
 * @param decimals - Número de decimales (override; usa el global si se omite)
 * @param symbol   - Símbolo de moneda (override; usa el global si se omite)
 * @returns        - Cadena formateada, ej: showMoney(123456) → "1,234.56 Bs."
 */
export const showMoney = (value: number, decimals?: number, symbol?: string): string => {
    const cfg = getMoneyConfig();
    const resolvedDecimals = resolveDecimals(decimals, cfg.decimals, 'showMoney');
    const resolvedSymbol   = symbol  ?? cfg.symbol;

    const formatted = centsToDisplay(value, resolvedDecimals);
    return resolvedSymbol ? `${formatted} ${resolvedSymbol}` : formatted;
};