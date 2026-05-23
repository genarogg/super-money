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

    const render = (triggerEvent: boolean): void => {
        input.value = centsToDisplay(cents, decimals);
        if (triggerEvent) {
            const realValue = toDecimal(cents, decimals);
            input.dispatchEvent(new CustomEvent('money-input', {
                detail: { value: realValue },
                bubbles: true
            }));
        }
    };

    input.addEventListener('keydown', (e: KeyboardEvent) => {
        // Bloquear e, E, +, -, .
        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault();
            return;
        }

        const digit = e.key >= '0' && e.key <= '9' ? parseInt(e.key) : null;

        if (digit !== null) {
            e.preventDefault();
            cents = cents * 10 + digit;
            render(true);
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            cents = Math.floor(cents / 10);
            render(true);
        } else if (e.key === 'Delete') {
            e.preventDefault();
            cents = 0;
            render(true);
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
        const pasted = (e.clipboardData || (window as any).clipboardData).getData('text') as string;
        const onlyDigits = pasted.replace(/\D/g, '');
        for (const ch of onlyDigits) {
            cents = cents * 10 + parseInt(ch);
        }
        render(true);
    });

    input.addEventListener('click', () => {
        const len = input.value.length;
        input.setSelectionRange(len, len);
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