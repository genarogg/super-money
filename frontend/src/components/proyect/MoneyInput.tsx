import { useRef, useEffect, useCallback } from 'react';
import { activateMoneyInput, initMoneyInputs, type MoneyInputController, type MoneyConfig } from '../../func';
// import { activateMoneyInput, initMoneyInputs, type MoneyInputController, type MoneyConfig } from 'supermoney';

// ─── init global (se ejecuta una sola vez en toda la app) ─────────────────────
let globalInitDone = false;

const ensureGlobalInit = (config?: MoneyConfig) => {
    if (globalInitDone) return;
    globalInitDone = true;
    initMoneyInputs(config);
};

// ─── Props ────────────────────────────────────────────────────────────────────
export interface MoneyInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type' | 'onBlur'> {
    /**
     * Valor controlado en centavos (entero, ej: 123456 = 1234.56).
     * Único canal de estado/aritmética: al ser entero, sumas/restas/comparaciones
     * son exactas, sin errores de punto flotante.
     */
    valueCents?: number;
    /** Se llama con los centavos (entero) en cada tecla del usuario. */
    onChangeCents?: (cents: number) => void;
    /** Se llama al perder el foco con (centavos, texto formateado). */
    onMoneyChange?: (cents: number, formatted: string) => void;
    /** Número de decimales. Si no se pasa, usa la config global. */
    decimals?: number;
    /** Símbolo de moneda visible (ej: "Bs."). Solo informativo. */
    symbol?: string;
    /**
     * Config global de moneda. Solo se aplica en la primera instancia montada.
     * Para cambiarla después usa `setMoneyConfig` directamente.
     */
    config?: MoneyConfig;
}

// ─── Componente ───────────────────────────────────────────────────────────────
const MoneyInput = ({
    valueCents = 0,
    onChangeCents,
    onMoneyChange,
    decimals,
    symbol,
    config,
    id,
    className,
    disabled,
    ...rest
}: MoneyInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const ctrlRef = useRef<MoneyInputController | null>(null);

    // Init global + activar este input al montar
    useEffect(() => {
        ensureGlobalInit(config);
        const input = inputRef.current;
        if (!input) return;
        ctrlRef.current = activateMoneyInput(input);
        // config es intencional solo en el primer mount — no queremos re-init si cambia
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sincronizar valueCents externo → input interno (sin disparar eventos).
    // Al ser entero de punta a punta, la sincronización es exacta.
    useEffect(() => {
        const ctrl = ctrlRef.current;
        if (!ctrl) return;
        if (ctrl.getCents() !== valueCents) ctrl.setCents(valueCents, false);
    }, [valueCents]);

    // money-input → onChangeCents (cada tecla). e.detail.value ya son centavos enteros.
    const handleMoneyInput = useCallback(
        (e: CustomEvent<{ value: number }>) => {
            onChangeCents?.(e.detail.value);
        },
        [onChangeCents],
    );

    // money-change → onMoneyChange (al perder foco)
    const handleMoneyChange = useCallback(
        (e: CustomEvent<{ value: number; formatted: string }>) => {
            onMoneyChange?.(e.detail.value, e.detail.formatted);
        },
        [onMoneyChange],
    );

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;
        const onInput = (e: Event) => handleMoneyInput(e as CustomEvent<{ value: number }>);
        const onChanged = (e: Event) => handleMoneyChange(e as CustomEvent<{ value: number; formatted: string }>);
        input.addEventListener('money-input', onInput);
        input.addEventListener('money-change', onChanged);
        return () => {
            input.removeEventListener('money-input', onInput);
            input.removeEventListener('money-change', onChanged);
        };
    }, [handleMoneyInput, handleMoneyChange]);

    return (
        <div className={`money-input-wrapper${className ? ` ${className}` : ''}`}>
            {symbol && <span className="money-input-symbol">{symbol}</span>}
            <input
                {...rest}
                ref={inputRef}
                id={id}
                type="money"
                disabled={disabled}
                {...(decimals !== undefined ? { decimals: String(decimals) } : {})}
            />
        </div>
    );
};

export default MoneyInput;
