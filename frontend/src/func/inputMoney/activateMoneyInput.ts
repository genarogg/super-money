import centsToDisplay from './centsToDisplay';
import { toDecimal } from '../math/toDecimal';

const activateMoneyInput = (input: HTMLInputElement): void => {
    if (input.getAttribute('type') !== 'money') return;
    if (input.dataset.moneyInit) return;
    input.dataset.moneyInit = 'true';

    const decimals = parseInt(input.getAttribute('decimals') ?? '2');
    const min: number | null = input.hasAttribute('min') ? parseFloat(input.getAttribute('min')!) : null;
    const max: number | null = input.hasAttribute('max') ? parseFloat(input.getAttribute('max')!) : null;

    let cents = 0;
    input.value = centsToDisplay(0, decimals);
    input.inputMode = 'numeric';

    // Convierte la posición visual del cursor a un índice dentro
    // de la cadena de dígitos puros (sin separadores de miles ni punto decimal).
    const visualPosToCursorPos = (visualPos: number): number => {
        const formatted = input.value;
        let digitCount = 0;
        for (let i = 0; i < Math.min(visualPos, formatted.length); i++) {
            if (formatted[i] >= '0' && formatted[i] <= '9') digitCount++;
        }
        return digitCount;
    };

    // Recalcula la posición visual correcta tras re-renderizar,
    // dado un índice dentro de la cadena de dígitos.
    const cursorPosToVisualPos = (digitPos: number): number => {
        const formatted = input.value;
        let digitCount = 0;
        for (let i = 0; i < formatted.length; i++) {
            if (digitCount === digitPos) return i;
            if (formatted[i] >= '0' && formatted[i] <= '9') digitCount++;
        }
        return formatted.length;
    };

    const render = (triggerEvent: boolean, keepDigitCursor?: number): void => {
        input.value = centsToDisplay(cents, decimals);

        // Restaurar el cursor en la posición correcta de dígitos
        if (keepDigitCursor !== undefined) {
            const newVisualPos = cursorPosToVisualPos(keepDigitCursor);
            input.setSelectionRange(newVisualPos, newVisualPos);
        }

        if (triggerEvent) {
            const realValue = toDecimal(cents, decimals);
            input.dispatchEvent(new CustomEvent('money-input', {
                detail: { value: realValue },
                bubbles: true
            }));
        }
    };

    const setCents = (newCents: number, triggerEvent: boolean = true): void => {
        cents = newCents;
        render(triggerEvent);
    };

    (input as any).setCents = setCents;

    input.addEventListener('keydown', (e: KeyboardEvent) => {
        // Bloquear e, E, +, -, .
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

            // Obtener dígitos actuales como array
            const digits = Array.from(String(cents).padStart(decimals + 1, '0'));

            if (hasSelection) {
                // Reemplazar la selección con el dígito tecleado
                const dStart = visualPosToCursorPos(selStart);
                const dEnd   = visualPosToCursorPos(selEnd);
                digits.splice(dStart, dEnd - dStart, String(digit));
                cents = parseInt(digits.join('')) || 0;
                render(true, dStart + 1);
            } else {
                // Insertar dígito en la posición del cursor
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
                    digits.splice(dPos - 1, 1);
                    cents = parseInt(digits.join('')) || 0;
                    // Si a la izquierda del cursor (tras borrar) solo quedan ceros,
                    // el cursor se queda quieto (el número colapsó hacia él).
                    // Si hay algún dígito significativo, retrocede normalmente.
                    const leftDigits = digits.slice(0, dPos - 1);
                    const hasSignificantLeft = leftDigits.some(d => d !== '0');
                    render(true, hasSignificantLeft ? dPos - 1 : dPos);
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
                    digits.splice(dPos, 1);
                    cents = parseInt(digits.join('')) || 0;
                    render(true, dPos);
                }
            }
        }
    });

    // Red de seguridad: limpia cualquier caracter no numérico
    // que entre por autocomplete o dictado de voz
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

        const pasted = (e.clipboardData || (window as any).clipboardData).getData('text') as string;
        const pastedDigits = pasted.replace(/\D/g, '');
        if (!pastedDigits) return;

        const digits = Array.from(String(cents).padStart(decimals + 1, '0'));
        const dStart = visualPosToCursorPos(selStart);
        const dEnd   = visualPosToCursorPos(selEnd);

        // Reemplazar la selección (o insertar en el cursor) con los dígitos pegados
        digits.splice(dStart, dEnd - dStart, ...Array.from(pastedDigits));
        cents = parseInt(digits.join('')) || 0;
        render(true, dStart + pastedDigits.length);
    });

    input.addEventListener('click', () => {
        // No forzar el cursor al final: el usuario eligió dónde hacer click
    });

    input.addEventListener('focus', () => {
        input.classList.remove('is-error', 'is-valid');
        setTimeout(() => {
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }, 0);
    });

    input.addEventListener('blur', () => {
        const realValue = toDecimal(cents, decimals);

        if ((min !== null && realValue < min) || (max !== null && realValue > max)) {
            input.classList.add('is-error');
            input.classList.remove('is-valid');
        } else if (cents > 0) {
            input.classList.add('is-valid');
            input.classList.remove('is-error');
        }

        input.dispatchEvent(new CustomEvent('money-change', {
            detail: { value: realValue, formatted: input.value },
            bubbles: true
        }));
    });
};

export default activateMoneyInput;