import centsToDisplay from './centsToDisplay';
import { getMoneyConfig } from '../moneyConfig';

/** API pública que devuelve activateMoneyInput para controlar el input externamente. */
export interface MoneyInputController {
    getCents: () => number;
    getValue: () => number;
    setCents: (newCents: number, triggerEvent?: boolean) => void;
    setValue: (value: number, triggerEvent?: boolean) => void;
    reset: (triggerEvent?: boolean) => void;
    element: HTMLInputElement;
}

const activateMoneyInput = (input: HTMLInputElement): MoneyInputController | null => {
    if (input.getAttribute('type') !== 'money') return null;
    if (input.dataset.moneyInit) {
        // Ya fue inicializado: devolver el controlador guardado en el elemento si existe
        return (input as HTMLInputElement & { _moneyController?: MoneyInputController })._moneyController ?? null;
    }
    input.dataset.moneyInit = 'true';

    const decimals = input.hasAttribute('decimals')
        ? parseInt(input.getAttribute('decimals')!)
        : getMoneyConfig().decimals;

    const min: number | null = input.hasAttribute('min') ? parseInt(input.getAttribute('min')!) : null;
    const max: number | null = input.hasAttribute('max') ? parseInt(input.getAttribute('max')!) : null;

    let cents = 0;
    input.value = centsToDisplay(0, decimals);
    input.inputMode = 'numeric';

    // ─── helpers de cursor ───────────────────────────────────────────────────

    const visualPosToCursorPos = (visualPos: number): number => {
        const formatted = input.value;
        let digitCount = 0;
        for (let i = 0; i < Math.min(visualPos, formatted.length); i++) {
            if (formatted[i] >= '0' && formatted[i] <= '9') digitCount++;
        }
        return digitCount;
    };

    const cursorPosToVisualPos = (formatted: string, digitPos: number): number => {
        let digitCount = 0;
        for (let i = 0; i < formatted.length; i++) {
            if (digitCount === digitPos) {
                let pos = i;
                while (pos < formatted.length && (formatted[pos] === '.' || formatted[pos] === ',')) {
                    pos++;
                }
                return pos;
            }
            if (formatted[i] >= '0' && formatted[i] <= '9') digitCount++;
        }
        return formatted.length;
    };

    // ─── render ──────────────────────────────────────────────────────────────

    const render = (triggerEvent: boolean, keepDigitCursor?: number): void => {
        const newFormatted = centsToDisplay(cents, decimals);
        input.value = newFormatted;

        if (keepDigitCursor !== undefined) {
            const newVisualPos = cursorPosToVisualPos(newFormatted, keepDigitCursor);
            input.setSelectionRange(newVisualPos, newVisualPos);
        }

        if (triggerEvent) {
            input.dispatchEvent(new CustomEvent('money-input', {
                detail: { value: cents, formatted: newFormatted },
                bubbles: true,
            }));
        }
    };

    // ─── API pública ─────────────────────────────────────────────────────────

    const setCents = (newCents: number, triggerEvent = false): void => {
        cents = Math.max(0, Math.round(newCents));
        render(triggerEvent);
    };

    const setValue = (value: number, triggerEvent = false): void => {
        const factor = Math.pow(10, decimals);
        setCents(Math.round(value * factor), triggerEvent);
    };

    const getCents = (): number => cents;

    const getValue = (): number => {
        const factor = Math.pow(10, decimals);
        return cents / factor;
    };

    const reset = (triggerEvent = false): void => setCents(0, triggerEvent);

    // ─── eventos de teclado ──────────────────────────────────────────────────

    input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault();
            return;
        }

        const selStart = input.selectionStart ?? input.value.length;
        const selEnd   = input.selectionEnd   ?? input.value.length;
        const hasSelection = selStart !== selEnd;
        const digit = e.key >= '0' && e.key <= '9' ? parseInt(e.key) : null;

        if (digit !== null) {
            e.preventDefault();
            const digits = Array.from(String(cents).padStart(decimals + 1, '0'));
            if (hasSelection) {
                const dStart = visualPosToCursorPos(selStart);
                const dEnd   = visualPosToCursorPos(selEnd);
                digits.splice(dStart, dEnd - dStart, String(digit));
                cents = parseInt(digits.join('')) || 0;
                render(true, dStart + 1);
            } else {
                const dPos = visualPosToCursorPos(selStart);
                digits.splice(dPos, 0, String(digit));
                cents = parseInt(digits.join('')) || 0;
                render(true, dPos + 1);
            }

        } else if (e.key === 'Backspace') {
            e.preventDefault();
            const digits = Array.from(String(cents).padStart(decimals + 1, '0'));
            if (hasSelection) {
                const dStart = visualPosToCursorPos(selStart);
                const dEnd   = visualPosToCursorPos(selEnd);
                digits.splice(dStart, dEnd - dStart);
                cents = parseInt(digits.join('')) || 0;
                render(true, dStart);
            } else {
                const dPos = visualPosToCursorPos(selStart);
                if (dPos > 0) {
                    const leftOfCursor = digits.slice(0, dPos);
                    const onlyZerosLeft = leftOfCursor.every(d => d === '0');
                    if (digits[dPos - 1] === '0' && onlyZerosLeft) {
                        render(false, dPos);
                    } else {
                        const decimalStartDigit = digits.length - decimals;
                        const inDecimalZone = (dPos - 1) >= decimalStartDigit;
                        digits.splice(dPos - 1, 1);
                        cents = parseInt(digits.join('')) || 0;
                        render(true, inDecimalZone ? dPos : dPos - 1);
                    }
                }
            }

        } else if (e.key === 'Delete') {
            e.preventDefault();
            const digits = Array.from(String(cents).padStart(decimals + 1, '0'));
            if (hasSelection) {
                const dStart = visualPosToCursorPos(selStart);
                const dEnd   = visualPosToCursorPos(selEnd);
                digits.splice(dStart, dEnd - dStart);
                cents = parseInt(digits.join('')) || 0;
                render(true, dStart);
            } else {
                const dPos = visualPosToCursorPos(selStart);
                if (dPos < digits.length) {
                    const leftDigits = digits.slice(0, dPos);
                    const onlyZerosLeft = leftDigits.every(d => d === '0');
                    if (digits[dPos] === '0' && onlyZerosLeft) {
                        render(false, dPos - 1);
                    } else {
                        digits.splice(dPos, 1);
                        cents = parseInt(digits.join('')) || 0;
                        render(true, dPos);
                    }
                }
            }
        }
    });

    input.addEventListener('input', () => {
        const onlyDigits = input.value.replace(/\D/g, '');
        if (onlyDigits !== input.value) {
            input.value = centsToDisplay(cents, decimals);
        }
    });

    input.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        const selStart = input.selectionStart ?? input.value.length;
        const selEnd   = input.selectionEnd   ?? input.value.length;
        const clipboardData = e.clipboardData ?? (window as Window & { clipboardData?: DataTransfer }).clipboardData;
        const pasted = clipboardData?.getData('text') ?? '';
        const pastedDigits = pasted.replace(/\D/g, '');
        if (!pastedDigits) return;
        const digits = Array.from(String(cents).padStart(decimals + 1, '0'));
        const dStart = visualPosToCursorPos(selStart);
        const dEnd   = visualPosToCursorPos(selEnd);
        digits.splice(dStart, dEnd - dStart, ...Array.from(pastedDigits));
        cents = parseInt(digits.join('')) || 0;
        render(true, dStart + pastedDigits.length);
    });

    input.addEventListener('click', () => {});

    input.addEventListener('focus', () => {
        input.classList.remove('is-error', 'is-valid');
        setTimeout(() => {
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }, 0);
    });

    input.addEventListener('blur', () => {
        if ((min !== null && cents < min) || (max !== null && cents > max)) {
            input.classList.add('is-error');
            input.classList.remove('is-valid');
        } else if (cents > 0) {
            input.classList.add('is-valid');
            input.classList.remove('is-error');
        }

        input.dispatchEvent(new CustomEvent('money-change', {
            detail: { value: cents, formatted: input.value },
            bubbles: true,
        }));
    });

    // ─── guardar controlador en el elemento ──────────────────────────────────

    const controller: MoneyInputController = { getCents, getValue, setCents, setValue, reset, element: input };
    (input as HTMLInputElement & { _moneyController?: MoneyInputController })._moneyController = controller;

    return controller;
};

export default activateMoneyInput;