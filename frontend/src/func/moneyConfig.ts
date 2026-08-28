export interface MoneyConfig {
    symbol?: string;
    decimals?: number;
    moneda?: {
        plural?: string;
        singular?: string;
        centPlural?: string;
        centSingular?: string;
    };
}

export const DEFAULT_DECIMALS = 2;

const defaultConfig: Required<Omit<MoneyConfig, 'moneda'>> & { moneda: Required<NonNullable<MoneyConfig['moneda']>> } = {
    symbol: '',
    decimals: DEFAULT_DECIMALS,
    moneda: {
        plural: 'Bolívares',
        singular: 'Bolívar',
        centPlural: 'céntimos',
        centSingular: 'céntimo',
    },
};

let globalConfig = { ...defaultConfig };

export const setMoneyConfig = (config: MoneyConfig): void => {
    globalConfig = {
        symbol:   config.symbol   ?? globalConfig.symbol,
        decimals: config.decimals ?? globalConfig.decimals,
        moneda: {
            plural:       config.moneda?.plural       ?? globalConfig.moneda.plural,
            singular:     config.moneda?.singular     ?? globalConfig.moneda.singular,
            centPlural:   config.moneda?.centPlural   ?? globalConfig.moneda.centPlural,
            centSingular: config.moneda?.centSingular ?? globalConfig.moneda.centSingular,
        },
    };
};

export const getMoneyConfig = () => globalConfig;

/**
 * Valida que `decimals` sea un entero >= 0 utilizable como exponente de base 10
 * (`factor = 10 ** decimals`). Punto único de validación: lo usan `centsToDisplay`,
 * `activateMoneyInput`, `showMoney` y `moneyToString`, sin importar si el valor
 * inválido vino de un atributo HTML (`decimals="-1"`, `decimals="abc"`) o de
 * `setMoneyConfig({ decimals: ... })`.
 *
 * Un `decimals` no entero o negativo hace que `factor` sea fraccionario o que
 * `Math.pow` devuelva algo inesperado, lo que arrastra error de punto flotante en
 * `% factor` (o directamente `NaN`) y termina mostrándose tal cual en el input o
 * filtrándose en silencio del texto en palabras. Ante cualquier valor inválido,
 * se avisa por consola y se hace fallback a `DEFAULT_DECIMALS`, en vez de dejar
 * que ese resto fraccionario/NaN se propague.
 */
export const resolveDecimals = (decimals: number | undefined, fallback: number, context: string): number => {
    const value = decimals ?? fallback;
    if (Number.isInteger(value) && value >= 0) {
        return value;
    }
    console.warn(
        `${context}: "decimals" debe ser un entero >= 0 (recibido: ${value}). Usando ${DEFAULT_DECIMALS} en su lugar.`
    );
    return DEFAULT_DECIMALS;
};