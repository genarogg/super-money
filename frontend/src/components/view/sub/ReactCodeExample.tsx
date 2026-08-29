/**
 * Ejemplo de instalación para la pestaña "React": `supermoney` ya exporta
 * el componente `InputMoney` listo para usar, así que no hace falta copiar
 * ningún snippet ni conectar `activateMoneyInput` a mano con un `ref`.
 */
export default function ReactCodeExample() {
  return (
    <>
      <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed">
        <code className="bg-slate-800 px-1.5 py-0.5 rounded">supermoney</code> exporta un
        componente <code className="bg-slate-800 px-1.5 py-0.5 rounded">InputMoney</code>{' '}
        listo para usar, con props normales de React (
        <code className="bg-slate-800 px-1.5 py-0.5 rounded">valueCents</code>,{' '}
        <code className="bg-slate-800 px-1.5 py-0.5 rounded">onChangeCents</code>,{' '}
        <code className="bg-slate-800 px-1.5 py-0.5 rounded">onMoneyChange</code>).
      </p>

      <p className="text-gray-400">{'// Instalar'}</p>
      <p>
        <span className="font-semibold">pnpm</span> add <span className="text-emerald-400">supermoney</span>
      </p>
      <br />

      <p className="text-gray-400">{'// Importar'}</p>
      <p>
        <span className="text-pink-400">import</span>
        {' { InputMoney } '}
        <span className="text-pink-400">from</span>
        {' '}
        <span className="text-emerald-400">"supermoney"</span>
        {';'}
      </p>
      <br />

      <p className="text-gray-400">{'// Usar'}</p>
      <p>
        <span className="text-pink-400">function</span>
        {' '}
        <span className="text-purple-400">App</span>
        {'() {'}
      </p>
      <p className="pl-4">
        <span className="text-pink-400">const</span>
        {' [cents, setCents] = '}
        <span className="text-purple-400">useState</span>
        {'('}
        <span className="text-amber-400">0</span>
        {');'}
      </p>
      <br />
      <p className="pl-4">
        <span className="text-pink-400">return</span>
        {' ('}
      </p>
      <p className="pl-8">{'<InputMoney'}</p>
      <p className="pl-12">
        <span className="text-sky-400">symbol</span>
        {'='}
        <span className="text-emerald-400">"$"</span>
      </p>
      <p className="pl-12">
        <span className="text-sky-400">decimals</span>
        {'={'}
        <span className="text-amber-400">2</span>
        {'}'}
      </p>
      <p className="pl-12">
        <span className="text-sky-400">valueCents</span>
        {'={cents}'}
      </p>
      <p className="pl-12">
        <span className="text-sky-400">onChangeCents</span>
        {'={setCents}'}
      </p>
      <p className="pl-8">{'/>'}</p>
      <p className="pl-4">{');'}</p>
      <p>{'}'}</p>
    </>
  );
}
