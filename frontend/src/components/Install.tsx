import CodeTabs from './CodeTabs';

const codeExamples = [
  {
    label: 'HTML',
    code: `<!-- Instalar -->
<script src="https://unpkg.com/supermoney@latest/dist/index.umd.js"></script>

<!-- Inicializar -->
<script>
  superMoney.initMoneyInputs({
    symbol: '$',
    decimals: 2,
  });
</script>`,
  },
  {
    label: 'React',
    code: `// Instalar
pnpm add supermoney

// En tu App.jsx / main.jsx
import { useEffect } from 'react';
import { initMoneyInputs } from 'supermoney';

function App() {
  useEffect(() => {
    initMoneyInputs({
      symbol: '$',
      decimals: 2,
    });
  }, []);

  return <input type="money" />;
}`,
  },
  {
    label: 'Vue',
    code: `// Instalar
pnpm add supermoney

// En tu main.js / App.vue
import { onMounted } from 'vue';
import { initMoneyInputs } from 'supermoney';

onMounted(() => {
  initMoneyInputs({
    symbol: 'Bs.',
    decimals: 2,
    moneda: {
      plural: 'Bolívares',
      singular: 'Bolívar',
      centPlural: 'céntimos',
      centSingular: 'céntimo',
    },
  });
});`,
  },
  {
    label: 'Next.js',
    code: `// Instalar
pnpm add supermoney

// En tu layout.js / page.js
'use client';

import { useEffect } from 'react';
import { initMoneyInputs } from 'supermoney';

export default function RootLayout({ children }) {
  useEffect(() => {
    initMoneyInputs({
      symbol: '$',
      decimals: 2,
    });
  }, []);

  return <html><body>{children}</body></html>;
}`,
  },
  {
    label: 'Astro',
    code: `// Instalar
pnpm add supermoney

// En tu layout.astro / index.astro
<script>
  import { initMoneyInputs } from 'supermoney';

  initMoneyInputs({
    symbol: '$',
    decimals: 2,
  });
</script>`,
  },
];

export default function Install() {
  return (
    <section id="install" className="bg-gray-50 border-y border-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">Instalación</h2>
          <p className="text-xl text-gray-600">Elige tu framework preferido para empezar</p>
        </div>

        <div className="mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-4">1. Instalar la librería</h3>
            <div className="code-block bg-slate-950 text-white rounded-2xl px-4 py-3 font-mono text-sm">
              <span className="font-semibold">pnpm</span> add <span className="text-emerald-400">supermoney</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-4">2. Inicializar con tu moneda</h3>
            <CodeTabs tabs={codeExamples} />
          </div>

          {/* Config global */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-4">
              3. Opciones de configuración
            </h3>
            <div className="bg-slate-950 text-white rounded-2xl px-4 py-4 font-mono text-sm leading-6 overflow-x-auto">
              <p><span className="text-pink-400">initMoneyInputs</span>{'({'}</p>
              <p className="pl-6"><span className="text-sky-400">symbol</span>{'?:   '}<span className="text-amber-400">'$'</span>{'      // símbolo de moneda (por defecto: sin símbolo)'}</p>
              <p className="pl-6"><span className="text-sky-400">decimals</span>{'?: '}<span className="text-amber-400">2</span>{'         // decimales (por defecto: 2)'}</p>
              <p className="pl-6"><span className="text-sky-400">moneda</span>{'?:   {'}</p>
              <p className="pl-12"><span className="text-sky-400">plural</span>{':      '}<span className="text-amber-400">'Bolívares'</span>{'  // nombre plural'}</p>
              <p className="pl-12"><span className="text-sky-400">singular</span>{':    '}<span className="text-amber-400">'Bolívar'</span>{'    // nombre singular'}</p>
              <p className="pl-12"><span className="text-sky-400">centPlural</span>{':  '}<span className="text-amber-400">'céntimos'</span>{'   // centavos plural'}</p>
              <p className="pl-12"><span className="text-sky-400">centSingular</span>{': '}<span className="text-amber-400">'céntimo'</span>{'    // centavos singular'}</p>
              <p className="pl-6">{'}'}</p>
              <p>{'});'}</p>
            </div>
            <p className="font-mono text-xs text-gray-400 mt-3">
              Si no pasas ninguna opción, se usan los defaults: 2 decimales, sin símbolo, Bolívares.
            </p>
          </div>

          {/* showMoney */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-4">
              4. Mostrar valores con <code className="normal-case bg-gray-100 px-2 py-0.5 rounded">showMoney()</code>
            </h3>
            <div className="bg-slate-950 text-white rounded-2xl px-4 py-4 font-mono text-sm leading-7 overflow-x-auto">
              <p className="text-gray-400">{'// showMoney(valor, decimals?, symbol?)'}</p>
              <p>
                <span className="text-purple-400">showMoney</span>{'('}
                <span className="text-amber-400">23456</span>
                {')'}
                <span className="text-gray-400">{'              // → "234.56"  (usa config global)'}</span>
              </p>
              <p>
                <span className="text-purple-400">showMoney</span>{'('}
                <span className="text-amber-400">23456</span>
                {', '}
                <span className="text-amber-400">2</span>
                {', '}
                <span className="text-emerald-400">'$'</span>
                {')'}
                <span className="text-gray-400">{'        // → "234.56 $"  (override puntual)'}</span>
              </p>
              <p>
                <span className="text-purple-400">showMoney</span>{'('}
                <span className="text-amber-400">23456</span>
                {', '}
                <span className="text-amber-400">0</span>
                {')'}
                <span className="text-gray-400">{'             // → "23,456"  (sin decimales)'}</span>
              </p>
            </div>
            <p className="font-mono text-xs text-gray-400 mt-3">
              El valor siempre se pasa como <strong>entero</strong> (cents). Los parámetros
              opcionales sobreescriben la config global para esa llamada.
            </p>
          </div>

          {/* decimals por input */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-4">
              5. Decimales por input
            </h3>
            <div className="bg-slate-950 text-white rounded-2xl px-4 py-4 font-mono text-sm leading-7 overflow-x-auto">
              <p className="text-gray-400">{'<!-- Usa los decimales de la config global -->'}</p>
              <p>{'<input '}<span className="text-sky-400">type</span>{'='}<span className="text-emerald-400">"money"</span>{' />'}</p>
              <br />
              <p className="text-gray-400">{'<!-- Fuerza 0 decimales solo en este input -->'}</p>
              <p>{'<input '}<span className="text-sky-400">type</span>{'='}<span className="text-emerald-400">"money"</span>{' '}<span className="text-sky-400">decimals</span>{'='}<span className="text-emerald-400">"0"</span>{' />'}</p>
              <br />
              <p className="text-gray-400">{'<!-- Fuerza 3 decimales solo en este input -->'}</p>
              <p>{'<input '}<span className="text-sky-400">type</span>{'='}<span className="text-emerald-400">"money"</span>{' '}<span className="text-sky-400">decimals</span>{'='}<span className="text-emerald-400">"3"</span>{' />'}</p>
            </div>
            <p className="font-mono text-xs text-gray-400 mt-3">
              El atributo <code className="bg-gray-100 px-1.5 py-0.5 rounded">decimals</code> en el HTML tiene prioridad sobre la config global.
            </p>
          </div>
        </div>

        <div className="bg-violet-50 border border-violet-100 rounded-xl p-6">
          <p className="font-mono text-sm text-violet-600">
            ✨ A partir de aquí, cualquier{' '}
            <code className="bg-violet-100 px-2 py-0.5 rounded">&lt;input type="money"&gt;</code>{' '}
            del DOM funciona automáticamente, incluyendo los que se agreguen dinámicamente.
          </p>
        </div>
      </div>
    </section>
  );
}