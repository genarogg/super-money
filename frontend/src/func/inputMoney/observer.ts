import activateMoneyInput, { type MoneyInputController } from './activateMoneyInput';
import { setMoneyConfig, type MoneyConfig } from '../moneyConfig';

/**
 * Inicializa todos los inputs `type="money"` del documento y observa
 * nuevos elementos que se agreguen dinámicamente.
 *
 * @returns Un objeto con helpers para acceder a los controladores por elemento.
 */
const initMoneyInputs = (config?: MoneyConfig) => {
    if (config) setMoneyConfig(config);

    const controllers = new Map<HTMLInputElement, MoneyInputController>();

    const activate = (input: HTMLInputElement) => {
        const ctrl = activateMoneyInput(input);
        if (ctrl) controllers.set(input, ctrl);
    };

    document.querySelectorAll<HTMLInputElement>('input[type="money"]').forEach(activate);

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            for (const node of Array.from(mutation.addedNodes)) {
                if (node.nodeType !== 1) continue;
                const el = node as Element;
                if (el.matches('input[type="money"]')) activate(el as HTMLInputElement);
                el.querySelectorAll<HTMLInputElement>('input[type="money"]').forEach(activate);
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return {
        /**
         * Obtiene el controlador de un input específico.
         * @example
         * const ctrl = money.getController(document.querySelector('#precio'));
         * ctrl?.setValue(1234.56);
         */
        getController: (input: HTMLInputElement): MoneyInputController | undefined =>
            controllers.get(input),

        /**
         * Obtiene todos los controladores activos.
         */
        getAll: (): MoneyInputController[] => Array.from(controllers.values()),

        /**
         * Resetea todos los inputs a cero.
         */
        resetAll: (triggerEvent = false): void =>
            controllers.forEach(ctrl => ctrl.reset(triggerEvent)),
    };
};

export default initMoneyInputs;