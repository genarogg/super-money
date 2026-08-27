import activateMoneyInput, { type MoneyInputController } from './activateMoneyInput';
import { setMoneyConfig, type MoneyConfig } from '../moneyConfig';

export interface MoneyInputsHandle {
    /**
     * Obtiene el controlador de un input específico.
     * @example
     * const ctrl = money.getController(document.querySelector('#precio'));
     * ctrl?.setValue(1234.56);
     */
    getController: (input: HTMLInputElement) => MoneyInputController | undefined;

    /**
     * Obtiene todos los controladores activos.
     */
    getAll: () => MoneyInputController[];

    /**
     * Resetea todos los inputs a cero.
     */
    resetAll: (triggerEvent?: boolean) => void;

    /**
     * Detiene el `MutationObserver` global y olvida los controladores
     * registrados. Después de llamar esto, la próxima llamada a
     * `initMoneyInputs()` crea una instancia nueva desde cero.
     *
     * Normalmente NO hace falta llamarlo: `initMoneyInputs()` ya es
     * idempotente (ver más abajo). Está pensado para tests, HMR, o un
     * cleanup explícito al desmontar toda la app.
     */
    disconnect: () => void;
}

// ─── estado global (singleton) ─────────────────────────────────────────────
// initMoneyInputs() puede ser llamado desde varios lugares (distintos
// componentes montando en paralelo, React StrictMode duplicando efectos en
// dev, HMR, etc.). Solo debe existir UN MutationObserver observando
// document.body a la vez; de lo contrario cada llamada apila un observer
// más que nunca se libera.
let activeObserver: MutationObserver | null = null;
let activeControllers: Map<HTMLInputElement, MoneyInputController> | null = null;
let activeHandle: MoneyInputsHandle | null = null;

const buildHandle = (
    controllers: Map<HTMLInputElement, MoneyInputController>,
    observer: MutationObserver,
): MoneyInputsHandle => ({
    getController: (input: HTMLInputElement): MoneyInputController | undefined =>
        controllers.get(input),

    getAll: (): MoneyInputController[] => Array.from(controllers.values()),

    resetAll: (triggerEvent = false): void =>
        controllers.forEach(ctrl => ctrl.reset(triggerEvent)),

    disconnect: (): void => {
        observer.disconnect();
        controllers.clear();
        // Solo limpiar el estado global si nadie reemplazó ya esta instancia.
        if (activeObserver === observer) {
            activeObserver = null;
            activeControllers = null;
            activeHandle = null;
        }
    },
});

/**
 * Inicializa todos los inputs `type="money"` del documento y observa
 * nuevos elementos que se agreguen dinámicamente.
 *
 * Es seguro llamarla varias veces (distintos componentes, StrictMode, HMR,
 * etc.): si ya existe una instancia activa, se reutiliza en vez de crear un
 * `MutationObserver` nuevo — solo se activan los inputs que aún no tuvieran
 * controlador. Usa `disconnect()` en el handle devuelto si necesitas liberar
 * el observer manualmente.
 *
 * @returns Un objeto con helpers para acceder a los controladores por elemento.
 */
const initMoneyInputs = (config?: MoneyConfig): MoneyInputsHandle => {
    if (config) setMoneyConfig(config);

    if (activeObserver && activeControllers && activeHandle) {
        // Ya hay una instancia corriendo: no crear otro observer, solo
        // activar inputs nuevos que pudieran existir en el DOM.
        document.querySelectorAll<HTMLInputElement>('input[type="money"]').forEach((input) => {
            if (!activeControllers!.has(input)) {
                const ctrl = activateMoneyInput(input);
                if (ctrl) activeControllers!.set(input, ctrl);
            }
        });
        return activeHandle;
    }

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

    activeObserver = observer;
    activeControllers = controllers;
    activeHandle = buildHandle(controllers, observer);

    return activeHandle;
};

export default initMoneyInputs;