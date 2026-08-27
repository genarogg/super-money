// First, let's copy the actual code from frontend to lib to make it self-contained!
// Let's check what files are in frontend/src/func/inputMoney first!

// Let's create a local copy of the func directory inside lib!

// For now, let's just use the same imports but we'll adjust them later!

import {
    showMoney,
    initMoneyInputs,
    moneyToString,
    montoNoNegativo,
    setMoneyConfig,
    activateMoneyInput
} from '../frontend/src/func/index';

import type { MoneyConfig, MoneyInputController } from '../frontend/src/func/index';

export {
    showMoney,
    initMoneyInputs,
    moneyToString,
    montoNoNegativo,
    setMoneyConfig,
    activateMoneyInput
};
export type { MoneyConfig, MoneyInputController };