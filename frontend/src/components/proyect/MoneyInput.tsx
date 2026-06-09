import { useRef, useEffect, useCallback } from 'react';
import activateMoneyInput from '../../func/inputMoney/activateMoneyInput';

export interface MoneyInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type' | 'onBlur'> {
    value?: number;
    onChange?: (value: number) => void;
    onMoneyChange?: (cents: number, formatted: string) => void;
    decimals?: number;
    symbol?: string;
}

interface MoneyInputController {
    getCents: () => number;
    getValue: () => number;
    setCents: (newCents: number, triggerEvent?: boolean) => void;
    setValue: (value: number, triggerEvent?: boolean) => void;
    reset: (triggerEvent?: boolean) => void;
    element: HTMLInputElement;
}

const MoneyInput = ({
    value = 0,
    onChange,
    onMoneyChange,
    decimals,
    symbol = ' Bs. ',
    id,
    className,
    disabled,
    ...rest
}: MoneyInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const ctrlRef = useRef<MoneyInputController | null>(null);

    // Inicializar una sola vez al montar
    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;
        ctrlRef.current = activateMoneyInput(input);
    }, []);

    // Sincronizar value externo → input interno (sin disparar eventos)
    useEffect(() => {
        const ctrl = ctrlRef.current;
        if (!ctrl) return;
        if (ctrl.getValue() !== value) ctrl.setValue(value, false);
    }, [value]);

    // money-input → onChange (cada tecla)
    const handleMoneyInput = useCallback(
        (e: CustomEvent<{ value: number }>) => {
            const factor = Math.pow(10, decimals ?? 2);
            onChange?.(e.detail.value / factor);
        },
        [onChange, decimals],
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
        // addEventListener no acepta CustomEvent directamente, se castea solo en el binding
        const onInput = (e: Event) => handleMoneyInput(e as CustomEvent<{ value: number }>);
        const onChange_ = (e: Event) => handleMoneyChange(e as CustomEvent<{ value: number; formatted: string }>);
        input.addEventListener('money-input', onInput);
        input.addEventListener('money-change', onChange_);
        return () => {
            input.removeEventListener('money-input', onInput);
            input.removeEventListener('money-change', onChange_);
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