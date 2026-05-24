import { useEffect, useRef, useState } from 'react';
import initMoneyInputs from '../func/inputMoney';

export default function Demo() {
  const [storeValue, setStoreValue] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>('0.00');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initMoneyInputs();

    const input = inputRef.current;
    if (!input) return;

    const handleMoneyInput = (e: CustomEvent<{ value: number }>) => {
      setStoreValue(e.detail.value);
      setDisplayValue(input.value);
    };

    const handleMoneyChange = (e: CustomEvent<{ formatted: string }>) => {
      setDisplayValue(e.detail.formatted);
    };

    input.addEventListener('money-input', handleMoneyInput as EventListener);
    input.addEventListener('money-change', handleMoneyChange as EventListener);

    return () => {
      input.removeEventListener('money-input', handleMoneyInput as EventListener);
      input.removeEventListener('money-change', handleMoneyChange as EventListener);
    };
  }, []);

  return (
    <section id="demo" className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
          Demo interactiva
        </h2>
        <p className="text-2xl text-gray-700 font-medium">
          ¡Prueba el input de dinero en tiempo real!
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 via-white to-indigo-50 border border-violet-100 shadow-2xl p-8">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-violet-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-200/40 blur-3xl"
        />

        <div className="relative z-10 space-y-8">
          <div className="bg-white rounded-2xl border border-violet-100 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <span className="font-mono text-lg text-violet-600">$</span>
              </div>
              <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                Input principal
              </h3>
            </div>
            <div className="money-wrapper">
              <span className="currency-tag">USD</span>
              <input
                ref={inputRef}
                type="money"
                currency="USD"
                decimals="2"
                placeholder="0.00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-2xl font-mono text-gray-900 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                  Store (integer)
                </h3>
              </div>
              <p className="text-3xl font-mono font-bold text-emerald-600">
                {storeValue}
              </p>
              <p className="text-xs font-mono text-gray-400 mt-2">
                Valor para base de datos
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-violet-100 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-violet-600"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <line x1="9" x2="15" y1="9" y2="15" />
                    <line x1="15" x2="15" y1="9" y2="9" />
                  </svg>
                </div>
                <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                  Display (decimal)
                </h3>
              </div>
              <p className="text-3xl font-mono font-bold text-violet-600">
                {displayValue}
              </p>
              <p className="text-xs font-mono text-gray-400 mt-2">
                Valor para el usuario
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 16 16 12 12 8" />
                <line x1="8" x2="16" y1="12" y2="12" />
              </svg>
              <h3 className="font-mono text-sm uppercase tracking-widest opacity-80">
                ¿Cómo funciona?
              </h3>
            </div>
            <p className="font-mono text-sm leading-relaxed opacity-90">
              El valor se <strong>almacena como entero</strong> (para evitar errores de float) y se <strong>muestra como decimal</strong> (para el usuario). ¡Así nunca tienes problemas con 0.1 + 0.2 = 0.30000000000000004!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
