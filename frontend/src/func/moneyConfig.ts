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

const defaultConfig: Required<Omit<MoneyConfig, 'moneda'>> & { moneda: Required<NonNullable<MoneyConfig['moneda']>> } = {
    symbol: '',
    decimals: 2,
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
        symbol:   config.symbol   ?? defaultConfig.symbol,
        decimals: config.decimals ?? defaultConfig.decimals,
        moneda: {
            plural:       config.moneda?.plural       ?? defaultConfig.moneda.plural,
            singular:     config.moneda?.singular     ?? defaultConfig.moneda.singular,
            centPlural:   config.moneda?.centPlural   ?? defaultConfig.moneda.centPlural,
            centSingular: config.moneda?.centSingular ?? defaultConfig.moneda.centSingular,
        },
    };
};

export const getMoneyConfig = () => globalConfig;