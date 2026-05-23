import { useMemo, useState } from 'react';

const formatAmount = (value: number, decimals: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const toDecimal = (cents: number, decimals = 2) => {
  return cents / Math.pow(10, decimals);
};

const getControlledValue = (sharedCents: number, decimals: number) => {
  const factor = Math.pow(10, decimals);
  const centsForThisInput = Math.round((sharedCents / 100) * factor);
  return formatAmount(centsForThisInput / factor, decimals);
};

export default function Demo() {
  const [sharedCents, setSharedCents] = useState(0);

  const handleChange = (value: string, decimals: number) => {
    const parsed = Number(value.replace(/,/g, ''));
    const numericValue = Number.isFinite(parsed) ? parsed : 0;
    const factor = Math.pow(10, decimals);
    const centsFromThisInput = Math.round(numericValue * factor);
    const normalized = Math.round((centsFromThisInput * 100) / factor);
    setSharedCents(normalized);
  };

  const baseDecimalValue = useMemo(() => toDecimal(sharedCents, 2), [sharedCents]);
  const copValue = useMemo(() => baseDecimalValue, [baseDecimalValue]);
  const isCopValid = copValue >= 100 && copValue <= 9999999;

  return (
    <section id="demo" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-12">
        Demo interactiva
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-violet-100 rounded-2xl p-8 shadow-sm">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">
            01 — USD · 2 decimales
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-100 mb-6">
            <span className="text-violet-400">&lt;input</span>{' '}
            <span className="text-emerald-300">type</span>=<span className="text-rose-300">"money"</span>{' '}
            <span className="text-emerald-300">currency</span>=<span className="text-rose-300">"USD"</span>{' '}
            <span className="text-emerald-300">decimals</span>=<span className="text-rose-300">"2"</span>{' '}
            <span className="text-violet-400">/&gt;</span>
          </div>
          <div className="flex items-center gap-3 mb-4 rounded-xl border border-gray-200 bg-slate-50 px-4 py-3">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">USD</span>
            <input
              type="money"
              inputMode="decimal"
              currency="USD"
              decimals="2"
              placeholder="0.00"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              value={getControlledValue(sharedCents, 2)}
              onChange={(event) => handleChange(event.target.value, 2)}
            />
          </div>
          <div className="flex justify-between items-center bg-violet-50 border border-violet-100 rounded-lg px-4 py-3 font-mono text-sm">
            <span className="text-gray-400">Valor capturado</span>
            <span className="text-violet-500 font-medium">{formatAmount(baseDecimalValue, 2)}</span>
          </div>
        </div>

        <div className="bg-white border border-violet-100 rounded-2xl p-8 shadow-sm">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">
            02 — EUR · sin decimales
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-100 mb-6">
            <span className="text-violet-400">&lt;input</span>{' '}
            <span className="text-emerald-300">type</span>=<span className="text-rose-300">"money"</span>{' '}
            <span className="text-emerald-300">currency</span>=<span className="text-rose-300">"EUR"</span>{' '}
            <span className="text-emerald-300">decimals</span>=<span className="text-rose-300">"0"</span>{' '}
            <span className="text-violet-400">/&gt;</span>
          </div>
          <div className="flex items-center gap-3 mb-4 rounded-xl border border-gray-200 bg-slate-50 px-4 py-3">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">EUR</span>
            <input
              type="money"
              inputMode="decimal"
              currency="EUR"
              decimals="0"
              placeholder="0"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              value={getControlledValue(sharedCents, 0)}
              onChange={(event) => handleChange(event.target.value, 0)}
            />
          </div>
          <div className="flex justify-between items-center bg-violet-50 border border-violet-100 rounded-lg px-4 py-3 font-mono text-sm">
            <span className="text-gray-400">Valor capturado</span>
            <span className="text-violet-500 font-medium">{formatAmount(Math.round(baseDecimalValue), 0)}</span>
          </div>
        </div>

        <div className="bg-white border border-violet-100 rounded-2xl p-8 shadow-sm">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">
            03 — COP · min / max
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-100 mb-6">
            <span className="text-violet-400">&lt;input</span>{' '}
            <span className="text-emerald-300">type</span>=<span className="text-rose-300">"money"</span>{' '}
            <span className="text-emerald-300">currency</span>=<span className="text-rose-300">"COP"</span>{' '}
            <span className="text-emerald-300">min</span>=<span className="text-rose-300">"100"</span>{' '}
            <span className="text-emerald-300">max</span>=<span className="text-rose-300">"9999999"</span>{' '}
            <span className="text-violet-400">/&gt;</span>
          </div>
          <div className={`flex items-center gap-3 mb-4 rounded-xl border px-4 py-3 ${
            isCopValid ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'
          }`}>
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">COP</span>
            <input
              type="money"
              inputMode="decimal"
              currency="COP"
              decimals="2"
              placeholder="0.00"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              value={getControlledValue(sharedCents, 2)}
              onChange={(event) => handleChange(event.target.value, 2)}
            />
          </div>
          <div className="flex justify-between items-center bg-violet-50 border border-violet-100 rounded-lg px-4 py-3 font-mono text-sm">
            <span className="text-gray-400">Valor capturado</span>
            <span className="text-violet-500 font-medium">{formatAmount(baseDecimalValue, 2)}</span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="font-mono text-xs bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full">
              Borde verde si válido
            </span>
            <span className="font-mono text-xs bg-rose-50 border border-rose-200 text-rose-500 px-3 py-1 rounded-full">
              Borde rojo si inválido
            </span>
          </div>
        </div>

        <div className="bg-white border border-violet-100 rounded-2xl p-8 shadow-sm">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">
            04 — toInteger / toDecimal
          </div>
          <div className="flex items-center gap-3 mb-4 rounded-xl border border-gray-200 bg-slate-50 px-4 py-3">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">USD</span>
            <input
              type="money"
              inputMode="decimal"
              currency="USD"
              decimals="2"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              value={getControlledValue(sharedCents, 2)}
              onChange={(event) => handleChange(event.target.value, 2)}
            />
          </div>
          <div className="bg-violet-50 border border-violet-100 rounded-lg px-4 py-3 font-mono text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">
                Decimal <em className="opacity-50">(pantalla)</em>
              </span>
              <span className="text-violet-500 font-medium">{formatAmount(baseDecimalValue, 2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">
                Integer <em className="opacity-50">(BD)</em>
              </span>
              <span className="text-emerald-500 font-medium">{sharedCents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">toDecimal(integer)</span>
              <span className="text-violet-500 font-medium">{formatAmount(baseDecimalValue, 2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
