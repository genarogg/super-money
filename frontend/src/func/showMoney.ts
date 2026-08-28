import centsToDisplay from './inputMoney/centsToDisplay';
import { getMoneyConfig, resolveDecimals } from './moneyConfig';

export interface ShowMoneyOptions {
    decimals?: number;
    symbol?: string;
}

/**
 * Muestra un valor en centavos como cadena de dinero formateada.
 * Usa la configuración global establecida con `setMoneyConfig` si no se pasan opciones.
 *
 * @param value   - El valor a mostrar, siempre como entero en centavos (ej: 123456)
 * @param options - Opciones de formato (override; usa el global si se omiten)
 * @returns       - Cadena formateada, ej: showMoney(123456) → "1,234.56 Bs."
 *                  o showMoney(123456, { decimals: 0, symbol: '$' }) → "1,235 $"
 */
export const showMoney = (value: number, options?: ShowMoneyOptions): string => {
    const cfg = getMoneyConfig();
    const resolvedDecimals = resolveDecimals(options?.decimals, cfg.decimals, 'showMoney');
    const resolvedSymbol = options?.symbol ?? cfg.symbol;

    const formatted = centsToDisplay(value, resolvedDecimals);
    return resolvedSymbol ? `${formatted} ${resolvedSymbol}` : formatted;
};