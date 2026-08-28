import { getMoneyConfig } from './moneyConfig';

export type MoneyLang = 'es' | 'en';

// ─── Español ────────────────────────────────────────────────────────────────

const unidadesEs = [
    '', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete',
    'dieciocho', 'diecinueve', 'veinte', 'veintiún', 'veintidós', 'veintitrés',
    'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve',
];

const decenasEs = [
    '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa',
];

const centenasEs = [
    '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
    'seiscientos', 'setecientos', 'ochocientos', 'novecientos',
];

const convertirGrupoEs = (n: number): string => {
    if (n === 0) return '';
    if (n === 100) return 'cien';

    if (n < 30) {
        return unidadesEs[n];
    }

    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;

    const textoCentena = centenasEs[c];

    const textoDecena =
        d >= 3
            ? decenasEs[d] + (u > 0 ? ` y ${unidadesEs[u]}` : '')
            : '';

    const textoUnidad =
        d < 3 && n >= 30
            ? unidadesEs[n % 100]
            : '';

    return [textoCentena, textoDecena || textoUnidad]
        .filter(Boolean)
        .join(' ');
};

const numeroATextoEs = (n: number): string => {
    if (n === 0) return 'cero';
    if (n < 0) return `menos ${numeroATextoEs(-n)}`;

    const millones = Math.floor(n / 1_000_000);
    const miles = Math.floor((n % 1_000_000) / 1_000);
    const resto = n % 1_000;

    const partes: string[] = [];

    if (millones > 0) {
        partes.push(millones === 1 ? 'un millón' : `${convertirGrupoEs(millones)} millones`);
    }
    if (miles > 0) {
        partes.push(miles === 1 ? 'mil' : `${convertirGrupoEs(miles)} mil`);
    }
    if (resto > 0) {
        partes.push(convertirGrupoEs(resto));
    }

    return partes.join(' ');
};

// "de" solo va después de millón/millones cuando éste es el último grupo numérico
// antes del sustantivo: "un millón de Bolívares" pero "un millón doscientos mil Bolívares"
const requiereDeTrasMillonesEs = (n: number): boolean => {
    const abs = Math.abs(n);
    const millones = Math.floor(abs / 1_000_000);
    const miles = Math.floor((abs % 1_000_000) / 1_000);
    const resto = abs % 1_000;
    return millones > 0 && miles === 0 && resto === 0;
};

// ─── English ────────────────────────────────────────────────────────────────

const onesEn = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen',
];

const tensEn = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
];

const convertGroupEn = (n: number): string => {
    if (n === 0) return '';

    const h = Math.floor(n / 100);
    const rest = n % 100;

    const parts: string[] = [];

    if (h > 0) {
        parts.push(`${onesEn[h]} hundred`);
    }

    if (rest > 0) {
        if (rest < 20) {
            parts.push(onesEn[rest]);
        } else {
            const t = Math.floor(rest / 10);
            const u = rest % 10;
            parts.push(tensEn[t] + (u > 0 ? `-${onesEn[u]}` : ''));
        }
    }

    return parts.join(' ');
};

const numberToTextEn = (n: number): string => {
    if (n === 0) return 'zero';
    if (n < 0) return `minus ${numberToTextEn(-n)}`;

    const millions = Math.floor(n / 1_000_000);
    const thousands = Math.floor((n % 1_000_000) / 1_000);
    const rest = n % 1_000;

    const parts: string[] = [];

    if (millions > 0) {
        parts.push(`${convertGroupEn(millions)} million`);
    }
    if (thousands > 0) {
        parts.push(`${convertGroupEn(thousands)} thousand`);
    }
    if (rest > 0) {
        parts.push(convertGroupEn(rest));
    }

    return parts.join(' ');
};

// ─── Config por idioma ──────────────────────────────────────────────────────

interface MonedaNombres {
    plural?: string;
    singular?: string;
    centPlural?: string;
    centSingular?: string;
}

const defaultMonedaPorIdioma: Record<MoneyLang, Required<MonedaNombres>> = {
    es: {
        plural: 'Bolívares',
        singular: 'Bolívar',
        centPlural: 'céntimos',
        centSingular: 'céntimo',
    },
    en: {
        plural: 'Dollars',
        singular: 'Dollar',
        centPlural: 'cents',
        centSingular: 'cent',
    },
};

const DEFAULT_DECIMALS = 2;

// Valida que `decimals` sea un entero >= 0 utilizable como exponente de base 10.
// `decimals` no entero o negativo (ej. -1) hace que `factor = 10 ** decimals` sea
// fraccionario, lo que arrastra error de punto flotante en `% factor` y termina
// indexando arrays de palabras con un índice no entero (`undefined`, filtrado en
// silencio del resultado). Ante cualquier valor inválido, se hace fallback a 2
// junto con un aviso, en vez de dejar que ese resto fraccionario se propague.
const resolveDecimals = (decimals: number | undefined, fallback: number): number => {
    const value = decimals ?? fallback;
    if (Number.isInteger(value) && value >= 0) {
        return value;
    }
    console.warn(
        `moneyToString: "decimals" debe ser un entero >= 0 (recibido: ${value}). Usando ${DEFAULT_DECIMALS} en su lugar.`
    );
    return DEFAULT_DECIMALS;
};

/**
 * Parámetros de `moneyToString`.
 */
export interface MoneyToStringParams {
    /** El monto a convertir, siempre como entero en centavos (igual que
     *  `showMoney`/`centsToDisplay`), ej: 123456 → "mil doscientos treinta y
     *  cuatro Bolívares con cincuenta y seis céntimos". Acepta string parseable. */
    number: number | string;
    /** Idioma de salida: "es" (default) o "en". */
    lang?: MoneyLang;
    /** Nombres de la moneda/céntimos a usar (override; usa los defaults del
     *  idioma, o los globales de `setMoneyConfig` en español, si se omiten). */
    moneda?: MonedaNombres;
    /** Número de decimales del monto en centavos (override; usa el global de
     *  `setMoneyConfig` si se omite). Determina dónde se separan los
     *  "centavos" al dividir `number`. Debe ser un entero >= 0. */
    decimals?: number;
}

/**
 * Convierte un monto a su representación en texto (letras), en español o inglés.
 *
 * @example
 * moneyToString({ number: 123456 });
 * // → "Mil doscientos treinta y cuatro Bolívares con cincuenta y seis céntimos"
 *
 * moneyToString({ number: 123456, lang: 'en' });
 * // → "One thousand two hundred thirty-four Dollars with fifty-six cents"
 */
const moneyToString = ({ number, lang = 'es', moneda, decimals }: MoneyToStringParams): string => {
    const montoNumerico =
        typeof number === 'string'
            ? parseFloat(number)
            : number;

    const globalCfg = getMoneyConfig();
    const defaults = defaultMonedaPorIdioma[lang];

    const cfg = {
        plural: moneda?.plural ?? (lang === 'es' ? globalCfg.moneda.plural : defaults.plural),
        singular: moneda?.singular ?? (lang === 'es' ? globalCfg.moneda.singular : defaults.singular),
        centPlural: moneda?.centPlural ?? (lang === 'es' ? globalCfg.moneda.centPlural : defaults.centPlural),
        centSingular: moneda?.centSingular ?? (lang === 'es' ? globalCfg.moneda.centSingular : defaults.centSingular),
    };

    const resolvedDecimals = resolveDecimals(decimals, globalCfg.decimals);
    const factor = Math.pow(10, resolvedDecimals);

    try {
        if (!Number.isFinite(montoNumerico)) {
            throw new Error('El monto debe ser un número finito');
        }

        // `number` llega como entero en centavos (misma convención que
        // showMoney/centsToDisplay/activateMoneyInput), no como decimal.
        // Separamos el signo y luego obtenemos la parte entera y los
        // "céntimos" dividiendo por el factor de decimales, en vez de
        // usar el punto decimal del propio número.
        const esNegativo = montoNumerico < 0;
        const centavosAbsolutos = Math.round(Math.abs(montoNumerico));

        const entero = Math.floor(centavosAbsolutos / factor);
        const decimales = centavosAbsolutos % factor;

        if (lang === 'en') {
            const textoEntero = numberToTextEn(entero);
            const textoDecimales = numberToTextEn(decimales);

            const textoMoneda = entero === 1 ? cfg.singular : cfg.plural;
            const textoCentimos = decimales === 1 ? cfg.centSingular : cfg.centPlural;
            const signo = esNegativo ? 'Minus ' : '';

            const resultado = `${signo}${textoEntero} ${textoMoneda} with ${textoDecimales} ${textoCentimos}`;
            return resultado.charAt(0).toUpperCase() + resultado.slice(1);
        }

        const textoEntero = numeroATextoEs(entero);
        const textoDecimales = numeroATextoEs(decimales);

        const textoMoneda = entero === 1 ? cfg.singular : cfg.plural;
        const textoCentimos = decimales === 1 ? cfg.centSingular : cfg.centPlural;
        const conectorMoneda = requiereDeTrasMillonesEs(entero) ? 'de ' : '';
        const signo = esNegativo ? 'Menos ' : '';

        const resultado = `${signo}${textoEntero} ${conectorMoneda}${textoMoneda} con ${textoDecimales} ${textoCentimos}`;
        return resultado.charAt(0).toUpperCase() + resultado.slice(1);
    } catch (error) {
        console.error('Error al convertir monto a texto:', error);
        return `${montoNumerico} ${cfg.plural}`;
    }
};

export default moneyToString;