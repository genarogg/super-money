import activateMoneyInput from './activateMoneyInput';
import { setMoneyConfig, type MoneyConfig } from '../moneyConfig';

const initMoneyInputs = (config?: MoneyConfig): void => {
    if (config) setMoneyConfig(config);

    document.querySelectorAll<HTMLInputElement>('input[type="money"]')
        .forEach(activateMoneyInput);

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            for (const node of Array.from(mutation.addedNodes)) {
                if (node.nodeType !== 1) continue;
                const el = node as Element;
                if (el.matches('input[type="money"]')) activateMoneyInput(el as HTMLInputElement);
                el.querySelectorAll<HTMLInputElement>('input[type="money"]').forEach(activateMoneyInput);
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

export default initMoneyInputs;