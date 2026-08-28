import { useState } from 'react';
import { showMoney, moneyToString } from 'supermoney';
import MoneyInput from '../snippet/MoneyInput';

// ─── Ejemplo: monto a cobrar, estilo display de caja registradora ─────────
const MoneyInputExample = () => {
    const [priceCents, setPriceCents] = useState<number>(0); // 1.500,00

    const inWords = moneyToString(priceCents, { lang: 'es' });

    // Valor decimal "para el usuario" (ej. 150000 centavos -> 1500.00)
    const decimalValue = (priceCents / 100).toFixed(2);

    return (
        <>
            <style>{`
                .money-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    background: radial-gradient(circle at 50% 0%, #12261c 0%, #0a1410 60%, #060a08 100%);
                    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
                    box-sizing: border-box;
                }

                .money-stack {
                    width: 100%;
                    max-width: 620px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .money-card {
                    width: 100%;
                    background: #0d1a14;
                    border: 1px solid #1f3d2c;
                    border-radius: 20px;
                    padding: 36px 32px 28px;
                    box-shadow:
                        0 0 0 1px rgba(78, 217, 145, 0.05),
                        0 24px 60px -20px rgba(0, 0, 0, 0.7),
                        0 0 40px -12px rgba(78, 217, 145, 0.15);
                    position: relative;
                    overflow: hidden;
                }

                .money-card::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background:
                        repeating-linear-gradient(
                            to bottom,
                            rgba(78, 217, 145, 0.035) 0px,
                            rgba(78, 217, 145, 0.035) 1px,
                            transparent 1px,
                            transparent 3px
                        );
                    pointer-events: none;
                }

                .money-eyebrow {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 22px;
                    position: relative;
                }

                .money-eyebrow__label {
                    font-size: 11px;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    color: #5f8a72;
                    font-weight: 600;
                }

                .money-eyebrow__dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #4ed991;
                    box-shadow: 0 0 8px 1px rgba(78, 217, 145, 0.7);
                }

                .money-example label {
                    display: block;
                    font-size: 12px;
                    letter-spacing: 0.02em;
                    color: #7fa38d;
                    margin-bottom: 10px;
                    font-weight: 500;
                }

                /* Wrapper que viene del MoneyInput original: lo reestilizamos
                   como el display numérico de una caja registradora. */
                .money-input-wrapper {
                    display: flex;
                    align-items: baseline;
                    gap: 10px;
                    background: #060f0a;
                    border: 1px solid #244a34;
                    border-radius: 12px;
                    padding: 16px 18px;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }

                .money-input-wrapper:focus-within {
                    border-color: #4ed991;
                    box-shadow: 0 0 0 3px rgba(78, 217, 145, 0.15);
                }

                .money-input-symbol {
                    font-family: 'JetBrains Mono', 'Space Mono', monospace;
                    font-size: 20px;
                    color: #4ed991;
                    font-weight: 600;
                }

                .money-input-wrapper input {
                    flex: 1;
                    min-width: 0;
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #eafff2;
                    font-family: 'JetBrains Mono', 'Space Mono', monospace;
                    font-variant-numeric: tabular-nums;
                    font-size: 30px;
                    font-weight: 600;
                    letter-spacing: 0.01em;
                    caret-color: #4ed991;
                    text-align: right;
                }

                .money-input-wrapper input.is-error {
                    color: #ff8a80;
                }

                .money-example__divider {
                    height: 1px;
                    background: linear-gradient(to right, transparent, #1f3d2c, transparent);
                    margin: 24px 0 18px;
                }

                .money-example__preview {
                    margin: 0;
                    font-size: 13px;
                    line-height: 1.5;
                    color: #7fa38d;
                }

                .money-example__preview strong {
                    display: block;
                    margin-top: 4px;
                    color: #eafff2;
                    font-size: 15px;
                    font-weight: 500;
                }

                .money-example__words {
                    margin: 14px 0 0;
                    font-size: 12px;
                    line-height: 1.55;
                    color: #517a63;
                    font-style: italic;
                }

                /* ─── Panel de debug: integer / decimal / showMoney ─────── */
                .money-debug-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                }

                .money-debug-card {
                    background: #0d1a14;
                    border: 1px solid #1f3d2c;
                    border-radius: 16px;
                    padding: 20px 18px;
                    box-shadow:
                        0 0 0 1px rgba(78, 217, 145, 0.04),
                        0 12px 30px -18px rgba(0, 0, 0, 0.6);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    min-width: 0;
                }

                .money-debug-card__icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    background: rgba(78, 217, 145, 0.12);
                    color: #4ed991;
                    flex-shrink: 0;
                }

                .money-debug-card__head {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .money-debug-card__label {
                    font-size: 11px;
                    letter-spacing: 0.09em;
                    text-transform: uppercase;
                    color: #5f8a72;
                    font-weight: 700;
                    line-height: 1.35;
                }

                .money-debug-card__value {
                    font-family: 'JetBrains Mono', 'Space Mono', monospace;
                    font-variant-numeric: tabular-nums;
                    font-weight: 700;
                    color: #4ed991;
                    word-break: break-word;
                    overflow-wrap: anywhere;
                    line-height: 1.2;
                    /* Escala el tamaño según cuánto texto tenga el valor,
                       así "58,810.00 Bs." no se desborda ni se corta feo. */
                    font-size: clamp(15px, 4.4vw, 22px);
                }

                .money-debug-card__value--compact {
                    letter-spacing: -0.01em;
                    font-size: clamp(14px, 4.1vw, 20px);
                }

                .money-debug-card__hint {
                    margin: 0;
                    font-size: 11.5px;
                    color: #4a7360;
                    line-height: 1.4;
                }

                @media (min-width: 640px) {
                    .money-debug-card__value {
                        font-size: clamp(16px, 1.9vw, 20px);
                    }
                }

                @media (max-width: 480px) {
                    .money-debug-grid {
                        grid-template-columns: 1fr;
                    }

                    .money-debug-card__value {
                        font-size: 24px;
                    }
                }
            `}</style>

            <div className="money-page">
                <div className="money-stack">
                    <div className="money-card">
                        <div className="money-eyebrow">
                            <span className="money-eyebrow__label">Monto a cobrar</span>
                            <span className="money-eyebrow__dot" />
                        </div>

                        <div className="money-example">
                            <label htmlFor="precio">Precio del producto</label>

                            <MoneyInput
                                id="precio"
                                symbol="Bs."
                                decimals={2}
                                valueCents={priceCents}
                                onChangeCents={setPriceCents}
                                onMoneyChange={(cents, formatted) =>
                                    console.log('Monto confirmado al perder el foco:', cents, formatted)
                                }
                            />

                            <p className="money-example__words">{inWords}</p>

                            <div className="money-example__divider" />

                            <p className="money-example__preview">
                                Total formateado
                                <strong>{showMoney(priceCents, { symbol: 'Bs.' })}</strong>
                            </p>
                        </div>
                    </div>

                    {/* Panel de debug: cómo se guarda / muestra / formatea el valor */}
                    <div className="money-debug-grid">
                        <div className="money-debug-card">
                            <div className="money-debug-card__head">
                                <span className="money-debug-card__icon">⏱</span>
                                <span className="money-debug-card__label">
                                    Store
                                    <br />
                                    (integer)
                                </span>
                            </div>
                            <span className="money-debug-card__value">{priceCents}</span>
                            <p className="money-debug-card__hint">Valor para base de datos</p>
                        </div>

                        <div className="money-debug-card">
                            <div className="money-debug-card__head">
                                <span className="money-debug-card__icon">⬒</span>
                                <span className="money-debug-card__label">
                                    Display
                                    <br />
                                    (decimal)
                                </span>
                            </div>
                            <span className="money-debug-card__value">{decimalValue}</span>
                            <p className="money-debug-card__hint">Valor para el usuario</p>
                        </div>

                        <div className="money-debug-card">
                            <div className="money-debug-card__head">
                                <span className="money-debug-card__icon">&gt;_</span>
                                <span className="money-debug-card__label">showMoney()</span>
                            </div>
                            <span className="money-debug-card__value money-debug-card__value--compact">
                                {showMoney(priceCents, { symbol: 'Bs.' })}
                            </span>
                            <p className="money-debug-card__hint">Valor formateado</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoneyInputExample;