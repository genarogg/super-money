import { useState } from 'react';

type BadgeColor = 'violet' | 'emerald' | 'amber' | 'rose';

interface TechBadge {
  label: string;
  color: BadgeColor;
}

const TECH_BADGES: TechBadge[] = [
  { label: 'decimal.js', color: 'violet' },
  { label: 'TypeScript', color: 'emerald' },
  { label: 'MutationObserver', color: 'amber' },
];

const BADGE_STYLES: Record<BadgeColor, string> = {
  violet: 'bg-violet-50 border-violet-200 text-violet-600',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
  rose: 'bg-rose-50 border-rose-200 text-rose-600',
};

const PNPM_COMMAND = 'pnpm add supermoney';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PNPM_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silencioso
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#7c3aed0a_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed0a_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[320px] rounded-full pointer-events-none bg-violet-500/10 blur-[120px]"
      />

      <div className="relative z-10 mb-8">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase font-medium text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          powered by decimal.js · sin errores de float
        </span>
      </div>

      <h1 className="relative z-10 font-['Syne',sans-serif] text-[clamp(4rem,12vw,8rem)] font-black tracking-tighter leading-[0.88] mb-6">
        <span className="text-violet-500">super</span>
        <br />
        <span className="text-gray-900">money</span>
      </h1>

      <p className="relative z-10 text-[clamp(14px,2vw,17px)] leading-relaxed text-gray-500 font-mono max-w-[480px] mx-auto mb-10">
        <code className="text-violet-500">&lt;input type=&quot;money&quot; /&gt;</code>
        <br />
        Modo ATM. Sin frameworks. Sin errores de punto flotante.
      </p>

      <div className="relative z-10 w-full max-w-md mx-auto mb-8">
        <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
          <code id="pnpm-cmd" className="font-mono text-sm text-gray-100 select-all">
            {PNPM_COMMAND}
          </code>
          <button
            type="button"
            aria-label="Copiar comando"
            onClick={handleCopy}
            className="ml-4 p-1.5 rounded-md transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={copied ? 'hidden' : ''}
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={copied ? 'text-emerald-400' : 'hidden'}
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-12">
        <a
          href="#install"
          className="bg-violet-500 hover:bg-violet-600 active:scale-95 text-white font-mono text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/35 hover:-translate-y-px"
        >
          Empezar →
        </a>
        <a
          href="#demo"
          className="border border-violet-200 hover:border-violet-400 text-violet-600 hover:bg-violet-50 font-mono text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px"
        >
          Ver demo
        </a>
      </div>

      <div className="relative z-10 mb-10">
        <div className="inline-flex items-center gap-5 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 font-mono text-xs">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">JS nativo</p>
            <p className="text-rose-500">0.10 + 0.20 = 0.30000000000000004 ✗</p>
          </div>
          <div className="w-px h-8 bg-gray-200 shrink-0" />
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">supermoney</p>
            <p className="text-emerald-500">0.10 + 0.20 = 0.30 ✓</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-3 font-mono text-[11px] font-medium">
        {TECH_BADGES.map((badge) => (
          <span key={badge.label} className={`${BADGE_STYLES[badge.color]} border px-3 py-1.5 rounded-full transition-transform duration-200 hover:scale-105 cursor-default`}>
            {badge.label}
          </span>
        ))}
      </div>
    </section>
  );
}
