import type { ComponentType, ReactNode } from 'react';
import { Type, ShieldCheck, SlidersHorizontal, Plug, Hash, Sparkles } from 'lucide-react';

type AccentColor = 'amber' | 'rose' | 'sky' | 'violet' | 'emerald';

interface ApiFunction {
  id: string;
  name: string;
  signature: string;
  description: string;
  accent: AccentColor;
  icon: ComponentType<{ className?: string }>;
  code: ReactNode;
  note?: ReactNode;
}

const ACCENTS: Record<AccentColor, { iconBg: string; iconText: string; border: string }> = {
  amber: { iconBg: 'bg-amber-100', iconText: 'text-amber-600', border: 'border-amber-100' },
  rose: { iconBg: 'bg-rose-100', iconText: 'text-rose-600', border: 'border-rose-100' },
  sky: { iconBg: 'bg-sky-100', iconText: 'text-sky-600', border: 'border-sky-100' },
  violet: { iconBg: 'bg-violet-100', iconText: 'text-violet-600', border: 'border-violet-100' },
  emerald: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', border: 'border-emerald-100' },
};

const FUNCTIONS: ApiFunction[] = [
  {
    id: 'moneyToString',
    name: 'moneyToString',
    signature: '(monto, { lang?, moneda?, decimals? })',
    description:
      'Convierte un monto a su representación en palabras, en español o inglés. Ideal para recibos, cheques o contratos que necesitan el monto escrito en letras.',
    accent: 'amber',
    icon: Type,
    code: (
      <>
        <p className="text-gray-500">{'// número → letras'}</p>
        <p>
          <span className="text-purple-400">moneyToString</span>
          {'('}
          <span className="text-amber-400">123456</span>
          {')'}
        </p>
        <p className="text-gray-400 pl-4">
          {'// → "Mil doscientos treinta y cuatro Bolívares con cincuenta y seis céntimos"'}
        </p>
        <br />
        <p>
          <span className="text-purple-400">moneyToString</span>
          {'('}
          <span className="text-amber-400">123456</span>
          {', { lang: '}
          <span className="text-emerald-400">'en'</span>
          {' })'}
        </p>
        <p className="text-gray-400 pl-4">
          {'// → "One thousand two hundred thirty-four Dollars with fifty-six cents"'}
        </p>
      </>
    ),
  },
  {
    id: 'montoNoNegativo',
    name: 'montoNoNegativo',
    signature: '(valor?) → { isValido, message? }',
    description:
      'Validador listo para formularios: confirma que un monto no sea negativo y devuelve un mensaje de error legible. Se integra con cualquier librería de validación.',
    accent: 'rose',
    icon: ShieldCheck,
    code: (
      <>
        <p className="text-gray-500">{'// validación de formularios'}</p>
        <p>
          <span className="text-purple-400">montoNoNegativo</span>
          {'('}
          <span className="text-amber-400">1500</span>
          {')'}
        </p>
        <p className="text-gray-400 pl-4">{'// → { isValido: true }'}</p>
        <br />
        <p>
          <span className="text-purple-400">montoNoNegativo</span>
          {'(-'}
          <span className="text-amber-400">200</span>
          {')'}
        </p>
        <p className="text-gray-400 pl-4">
          {'// → { isValido: false, message: "El monto no puede ser negativo" }'}
        </p>
      </>
    ),
    note: (
      <>
        Llamarla sin argumentos (<code className="bg-gray-100 px-1.5 py-0.5 rounded">montoNoNegativo()</code>)
        también es válido: devuelve <code className="bg-gray-100 px-1.5 py-0.5 rounded">{'{ isValido: true }'}</code>,
        para no romper validaciones de campos opcionales.
      </>
    ),
  },
  {
    id: 'setMoneyConfig',
    name: 'setMoneyConfig',
    signature: '(config)',
    description:
      'Actualiza la configuración global (símbolo, decimales, nombre de la moneda) en caliente, sin volver a llamar a initMoneyInputs. Perfecto para un selector de moneda en la UI.',
    accent: 'sky',
    icon: SlidersHorizontal,
    code: (
      <>
        <p className="text-gray-500">{'// cambiar de moneda sin reiniciar los inputs'}</p>
        <p>
          <span className="text-purple-400">setMoneyConfig</span>
          {'({'}
        </p>
        <p className="pl-4">
          <span className="text-sky-400">symbol</span>
          {': '}
          <span className="text-emerald-400">'€'</span>
          {','}
        </p>
        <p className="pl-4">
          <span className="text-sky-400">decimals</span>
          {': '}
          <span className="text-amber-400">2</span>
          {','}
        </p>
        <p className="pl-4">
          <span className="text-sky-400">moneda</span>
          {': { '}
          <span className="text-sky-400">plural</span>
          {': '}
          <span className="text-emerald-400">'Euros'</span>
          {', '}
          <span className="text-sky-400">singular</span>
          {': '}
          <span className="text-emerald-400">'Euro'</span>
          {' }'}
        </p>
        <p>{'});'}</p>
        <br />
        <p>
          <span className="text-purple-400">showMoney</span>
          {'('}
          <span className="text-amber-400">150000</span>
          {')'}
          <span className="text-gray-400">{'  // → "1,500.00 €"'}</span>
        </p>
      </>
    ),
  },
  {
    id: 'activateMoneyInput',
    name: 'activateMoneyInput',
    signature: '(input) → MoneyInputController',
    description:
      'Activa manualmente un input puntual, sin depender del observer global, y devuelve un controlador para leerlo y escribirlo por código.',
    accent: 'violet',
    icon: Plug,
    code: (
      <>
        <p className="text-gray-500">{'// control programático de un input concreto'}</p>
        <p>
          <span className="text-pink-400">const</span>
          {' input = document.'}
          <span className="text-purple-400">querySelector</span>
          {'('}
          <span className="text-emerald-400">'#precio'</span>
          {');'}
        </p>
        <p>
          <span className="text-pink-400">const</span>
          {' ctrl = '}
          <span className="text-purple-400">activateMoneyInput</span>
          {'(input);'}
        </p>
        <br />
        <p>
          {'ctrl?.'}
          <span className="text-purple-400">setValue</span>
          {'('}
          <span className="text-amber-400">99.90</span>
          {', '}
          <span className="text-amber-400">true</span>
          {');'}
          <span className="text-gray-400">{'  // dispara "money-input"'}</span>
        </p>
        <p>
          {'ctrl?.'}
          <span className="text-purple-400">getCents</span>
          {'();'}
          <span className="text-gray-400">{'          // → 9990'}</span>
        </p>
        <p>
          {'ctrl?.'}
          <span className="text-purple-400">reset</span>
          {'();'}
          <span className="text-gray-400">{'            // vuelve a 0'}</span>
        </p>
      </>
    ),
    note: (
      <>
        El controlador expone{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded">getCents</code>,{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded">getValue</code>,{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded">setCents</code>,{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded">setValue</code> y{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded">reset</code>. Es lo mismo que usa{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded">initMoneyInputs</code> por debajo para cada
        input que detecta.
      </>
    ),
  },
  {
    id: 'centsToDisplay',
    name: 'centsToDisplay',
    signature: '(cents, decimals) → string',
    description:
      'La función pura de formateo que usa showMoney por debajo: recibe centavos y decimales, y devuelve el string con separador de miles, sin símbolo ni config global.',
    accent: 'emerald',
    icon: Hash,
    code: (
      <>
        <p className="text-gray-500">{'// formateo puro, sin config global de por medio'}</p>
        <p>
          <span className="text-purple-400">centsToDisplay</span>
          {'('}
          <span className="text-amber-400">123456</span>
          {', '}
          <span className="text-amber-400">2</span>
          {')'}
          <span className="text-gray-400">{'  // → "1,234.56"'}</span>
        </p>
        <p>
          <span className="text-purple-400">centsToDisplay</span>
          {'('}
          <span className="text-amber-400">123456</span>
          {', '}
          <span className="text-amber-400">0</span>
          {')'}
          <span className="text-gray-400">{'  // → "123,456"'}</span>
        </p>
      </>
    ),
  },
];

export default function Api() {
  return (
    <section id="api" className="bg-gray-50 border-y border-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">API</h2>
          <p className="text-2xl text-gray-700 font-medium mb-3">
            <code className="text-violet-500">showMoney</code> e{' '}
            <code className="text-violet-500">initMoneyInputs</code> son solo el principio
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            supermoney exporta 7 funciones en total. Estas son las otras 5: convertir montos a
            texto, validar formularios, cambiar la moneda en caliente y controlar inputs por
            código.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {FUNCTIONS.map((fn) => {
            const accent = ACCENTS[fn.accent];
            const Icon = fn.icon;
            return (
              <div
                key={fn.id}
                className={`bg-white border ${accent.border} rounded-2xl p-6 shadow-sm flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${accent.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${accent.iconText}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-mono text-sm font-semibold text-gray-900 truncate">
                      {fn.name}
                    </h3>
                    <p className="font-mono text-[11px] text-gray-400 truncate">{fn.signature}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{fn.description}</p>

                <div className="bg-slate-950 text-white rounded-xl px-4 py-4 font-mono text-[13px] leading-6 overflow-x-auto mt-auto">
                  {fn.code}
                </div>

                {fn.note && (
                  <p className="font-mono text-xs text-gray-400 mt-3 leading-relaxed">{fn.note}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 bg-violet-50 border border-violet-100 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
            <p className="font-mono text-sm text-violet-600">
              <code className="bg-violet-100 px-2 py-0.5 rounded">initMoneyInputs()</code> no solo
              activa los inputs: devuelve un handle con{' '}
              <code className="bg-violet-100 px-2 py-0.5 rounded">getController</code>,{' '}
              <code className="bg-violet-100 px-2 py-0.5 rounded">getAll</code>,{' '}
              <code className="bg-violet-100 px-2 py-0.5 rounded">resetAll</code> y{' '}
              <code className="bg-violet-100 px-2 py-0.5 rounded">disconnect</code>, por si
              necesitas gestionar todos los inputs de la página a la vez.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
