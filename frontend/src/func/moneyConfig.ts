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