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

    // Tope absoluto soportado por la librería: coincide con Number.MAX_SAFE_INTEGER
    // (9,007,199,254,740,991). Por encima de este valor, `cents` deja de poder
    // representarse como entero exacto en JS y se corrompe en silencio.
    // Es el techo real de `max`, no solo el default: aunque el consumidor pida
    // un `max` mayor, se recorta a este límite.
    const ABSOLUTE_MAX_CENTS = Number.MAX_SAFE_INTEGER; // 9007199254740991
    const ABSOLUTE_MIN_CENTS = 0;

    const min: number = input.hasAttribute('min')
        ? Math.max(ABSOLUTE_MIN_CENTS, parseInt(input.getAttribute('min')!))
        : ABSOLUTE_MIN_CENTS;
    const max: number = input.hasAttribute('max')
        ? Math.min(ABSOLUTE_MAX_CENTS, parseInt(input.getAttribute('max')!))
        : ABSOLUTE_MAX_CENTS;

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

    const clampCents = (value: number): number => {
        if (!Number.isFinite(value)) return min;
        return Math.min(max, Math.max(min, Math.round(value)));
    };

    const setCents = (newCents: number, triggerEvent = false): void => {
        cents = clampCents(newCents);
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
                cents = clampCents(parseInt(digits.join('')) || 0);
                render(true, dStart + 1);
            } else {
                const dPos = visualPosToCursorPos(selStart);
                digits.splice(dPos, 0, String(digit));
                cents = clampCents(parseInt(digits.join('')) || 0);
                render(true, dPos + 1);
            }

        } else if (e.key === 'Backspace') {
            e.preventDefault();
            const digits = Array.from(String(cents).padStart(decimals + 1, '0'));
            if (hasSelection) {
                const dStart = visualPosToCursorPos(selStart);
                const dEnd   = visualPosToCursorPos(selEnd);
                digits.splice(dStart, dEnd - dStart);
                cents = clampCents(parseInt(digits.join('')) || 0);
                render(true, dStart);
            } else {
                const dPos = visualPosToCursorPos(selStart);
                if (dPos === 0) {
                    // No hay nada a la izquierda del cursor que se pueda
                    // borrar. En vez de quedarse sin hacer nada, el cursor
                    // avanza hacia la derecha (misma regla que al chocar
                    // contra relleno), hasta llegar al final.
                    if (dPos < digits.length) {
                        render(false, dPos + 1);
                    }
                } else {
                    const leftOfCursor = digits.slice(0, dPos);
                    const onlyZerosLeft = leftOfCursor.every(d => d === '0');
                    if (digits[dPos - 1] === '0' && onlyZerosLeft) {
                        // Al chocar contra un cero de relleno (no editable) no
                        // se borra nada, pero el cursor avanza hacia la derecha
                        // un dígito por cada pulsación de Backspace, hasta
                        // llegar al final (misma dirección de avance que Delete
                        // en su rama de relleno).
                        render(false, dPos + 1);
                    } else {
                        // Al borrar, los dígitos a la derecha del cursor se
                        // recorren hacia la izquierda para ocupar el hueco,
                        // pero su CANTIDAD no cambia. Por eso anclamos el
                        // cursor por "cuántos dígitos quedan a su derecha"
                        // (invariante ante el borrado) en vez de por índice
                        // absoluto desde el inicio: un índice absoluto se
                        // desalinea cuando, al perder dígitos, vuelve a
                        // hacer falta un cero de relleno al frente (ej.
                        // "1.23" → "0.12"), que corre todo un lugar más de
                        // lo que el índice viejo contemplaba.
                        const digitsFromEnd = digits.length - dPos;
                        digits.splice(dPos - 1, 1);
                        cents = clampCents(parseInt(digits.join('')) || 0);
                        const newDigits = String(cents).padStart(decimals + 1, '0');
                        render(true, newDigits.length - digitsFromEnd);
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
                cents = clampCents(parseInt(digits.join('')) || 0);
                render(true, dStart);
            } else {
                const dPos = visualPosToCursorPos(selStart);
                if (dPos < digits.length) {
                    const leftDigits = digits.slice(0, dPos);
                    const onlyZerosLeft = leftDigits.every(d => d === '0');
                    if (digits[dPos] === '0' && onlyZerosLeft) {
                        // No es un bug: al intentar borrar un cero de relleno (no editable),
                        // no se borra nada, pero el cursor avanza un dígito por cada
                        // pulsación de Delete, hasta llegar a la zona donde sí puede escribir.
                        render(false, dPos + 1);
                    } else {
                        digits.splice(dPos, 1);
                        cents = clampCents(parseInt(digits.join('')) || 0);
                        render(true, dPos);
                    }
                }
            }
        }
    });

    input.addEventListener('input', () => {
        // Si el value nunca se apartó de lo que ya sabíamos, no hay nada
        // que reconciliar (evita trabajo/eventos de más).
        const rawValue = input.value;
        const onlyDigits = rawValue.replace(/\D/g, '');
        if ((parseInt(onlyDigits, 10) || 0) === cents) return;

        // El navegador ya insertó/borró algo fuera de nuestro control de
        // teclado (típico de teclados virtuales/IME en Android, donde el
        // keydown no llega o no trae info útil). En vez de descartar el
        // cambio, lo adoptamos: todos los dígitos presentes se reinterpretan
        // como el nuevo monto, igual que hace la rama de "tecla numérica"
        // del handler de keydown.
        const caret = input.selectionStart ?? rawValue.length;
        const digitPos = visualPosToCursorPos(caret);

        cents = clampCents(parseInt(onlyDigits, 10) || 0);
        render(true, digitPos);
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
        cents = clampCents(parseInt(digits.join('')) || 0);
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