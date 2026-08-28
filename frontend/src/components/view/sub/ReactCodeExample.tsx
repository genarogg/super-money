import { useState } from 'react';
import MoneyInputSnippet from './MoneyInputSnippet';

type ReactMode = 'snippet' | 'vanilla';

const VanillaReactExample = () => (
  <>
    <p className="text-gray-400">{'// Instalar'}</p>
    <p>
      <span className="font-semibold">pnpm</span> add <span className="text-emerald-400">supermoney</span>
    </p>
    <br />
    <p className="text-gray-400">{'// En tu App.jsx / main.jsx'}</p>
    <p>
      <span className="text-pink-400">import</span>
      {' { useEffect } '}
      <span className="text-pink-400">from</span>
      {' '}
      <span className="text-emerald-400">'react'</span>
      {';'}
    </p>
    <p>
      <span className="text-pink-400">import</span>
      {' { initMoneyInputs } '}
      <span className="text-pink-400">from</span>
      {' '}
      <span className="text-emerald-400">'supermoney'</span>
      {';'}
    </p>
    <br />
    <p>
      <span className="text-pink-400">function</span>
      {' '}
      <span className="text-purple-400">App</span>
      {'() {'}
    </p>
    <p className="pl-4">
      <span className="text-purple-400">useEffect</span>
      {'(() => {'}
    </p>
    <p className="pl-8">
      <span className="text-purple-400">initMoneyInputs</span>
      {'({'}
    </p>
    <p className="pl-12">
      <span className="text-sky-400">symbol</span>
      {': '}
      <span className="text-emerald-400">'$'</span>
      {','}
    </p>
    <p className="pl-12">
      <span className="text-sky-400">decimals</span>
      {': '}
      <span className="text-amber-400">2</span>
      {','}
    </p>
    <p className="pl-8">{'});'}</p>
    <p className="pl-4">{'}, []);'}</p>
    <br />
    <p className="pl-4">
      <span className="text-pink-400">return</span>
      {' <input '}
      <span className="text-sky-400">type</span>
      {'='}
      <span className="text-emerald-400">"money"</span>
      {' />;'}
    </p>
    <p>{'}'}</p>
  </>
);

/**
 * Ejemplo de instalación para la pestaña "React", con un sub-toggle:
 * - "Snippet preparado": copiar el componente <MoneyInput /> completo.
 * - "Manera vanilla": usar <input type="money" /> directo + initMoneyInputs.
 */
export default function ReactCodeExample() {
  const [mode, setMode] = useState<ReactMode>('snippet');

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode('snippet')}
          className={`font-sans rounded-full px-3 py-1 text-xs transition ${
            mode === 'snippet'
              ? 'bg-violet-600 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          Snippet preparado
        </button>
        <button
          type="button"
          onClick={() => setMode('vanilla')}
          className={`font-sans rounded-full px-3 py-1 text-xs transition ${
            mode === 'vanilla'
              ? 'bg-violet-600 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          Manera vanilla
        </button>
      </div>

      {mode === 'snippet' ? (
        <>
          <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed">
            Componente listo para copiar y pegar en tu proyecto: conecta{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded">activateMoneyInput</code> con un{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded">ref</code> y expone props normales de
            React (<code className="bg-slate-800 px-1.5 py-0.5 rounded">valueCents</code>,{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded">onChangeCents</code>,{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded">onMoneyChange</code>).
          </p>
          <div className="max-h-[420px] overflow-y-auto pr-1">
            <MoneyInputSnippet />
          </div>
        </>
      ) : (
        <>
          <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed">
            Sin componente wrapper: usás{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded">{'<input type="money" />'}</code>{' '}
            directo, tal como en JS vainilla, y <code className="bg-slate-800 px-1.5 py-0.5 rounded">initMoneyInputs</code>{' '}
            lo detecta solo.
          </p>
          <VanillaReactExample />
        </>
      )}
    </>
  );
}
