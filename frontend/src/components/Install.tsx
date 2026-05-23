import CodeTabs from './CodeTabs';

const codeExamples: any[] = [
  {
    label: 'HTML',
    code: `<!-- Instalar -->
<script src="https://unpkg.com/super-money@latest/dist/index.umd.js"></script>

<!-- Inicializar -->
<script>
  superMoney.initMoneyInputs();
</script>`,
  },
  {
    label: 'React',
    code: `// Instalar
pnpm add super-money

// En tu App.jsx / main.jsx
import { useEffect } from 'react';
import initMoneyInputs from 'super-money';

function App() {
  useEffect(() => {
    initMoneyInputs();
  }, []);

  return <input type="money" />;
}`,
  },
  {
    label: 'Vue',
    code: `// Instalar
pnpm add super-money

// En tu main.js / App.vue
import { onMounted } from 'vue';
import initMoneyInputs from 'super-money';

onMounted(() => {
  initMoneyInputs();
});`,
  },
  {
    label: 'Next.js',
    code: `// Instalar
pnpm add super-money

// En tu layout.js / page.js
'use client';

import { useEffect } from 'react';
import initMoneyInputs from 'super-money';

export default function RootLayout({ children }) {
  useEffect(() => {
    initMoneyInputs();
  }, []);

  return <html><body>{children}</body></html>;
}`,
  },
  {
    label: 'Astro',
    code: `// Instalar
pnpm add super-money

// En tu layout.astro / index.astro
---
import initMoneyInputs from 'super-money';
---

<script is:inline>
  initMoneyInputs();
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
              <span className="font-semibold">pnpm</span> add <span className="text-emerald-400">super-money</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-4">2. Inicializar</h3>
            <CodeTabs tabs={codeExamples} />
          </div>
        </div>

        <div className="bg-violet-50 border border-violet-100 rounded-xl p-6">
          <p className="font-mono text-sm text-violet-600">
            ✨ A partir de aquí, cualquier <code className="bg-violet-100 px-2 py-0.5 rounded">&lt;input type="money"&gt;</code> del DOM funciona automáticamente, incluyendo los que se agreguen dinámicamente.
          </p>
        </div>
      </div>
    </section>
  );
}
