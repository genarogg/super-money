import { useEffect, useRef, useState } from 'react';
import { Clock, Terminal, TerminalSquare, Code2, ArrowRightLeft } from 'lucide-react';
import initMoneyInputs from '../func/inputMoney';
import { showMoney } from '../func/math';

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
                placeholder="0.00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-2xl font-mono text-gray-900 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
<Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                  Store (integer)
                </h3>
              </div>
              <p className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 break-all">
                {storeValue}
              </p>
              <p className="text-xs font-mono text-gray-400 mt-2">
                Valor para base de datos
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-violet-100 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
<TerminalSquare className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                  Display (decimal)
                </h3>
              </div>
              <p className="text-2xl sm:text-3xl font-mono font-bold text-violet-600 break-all">
                {displayValue}
              </p>
              <p className="text-xs font-mono text-gray-400 mt-2">
                Valor para el usuario
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
<Terminal className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                  showMoney()
                </h3>
              </div>
              <p className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600 break-all">
                {showMoney(storeValue, 2, '$')}
              </p>
              <p className="text-xs font-mono text-gray-400 mt-2">
                Valor formateado
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
<Code2 className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                Uso de showMoney
              </h3>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300">
              <p className="mb-2">
                <span className="text-gray-500">// Valor entero (storeValue</span>
              </p>
              <p className="mb-4">
                <span className="text-pink-400">const</span> integer = <span className="text-amber-400">{storeValue}</span>;
              </p>
              <p className="mb-2">
                <span className="text-gray-500">// showMoney(integer, decimals, symbol)</span>
              </p>
              <p>
                <span className="text-purple-400">showMoney</span>(<span className="text-amber-400">{storeValue}</span>, <span className="text-amber-400">2</span>, <span className="text-emerald-400">'$'</span>)
              </p>
              <p className="mt-4">
                <span className="text-gray-500">// Resultado</span>
              </p>
              <p>
                <span className="text-emerald-400">'{showMoney(storeValue, 2, '$')}'</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
<ArrowRightLeft className="w-5 h-5" />
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
