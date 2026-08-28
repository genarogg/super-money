import { useState } from 'react';

export interface CodeTab {
  label: string;
  code: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
}

export default function CodeTabs({ tabs }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full px-4 py-2 text-sm font-mono transition ${
              index === activeIndex
                ? 'bg-violet-900 text-white shadow-lg shadow-violet-200/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-gray-200 bg-slate-950 p-5 text-white">
        <pre className="overflow-x-auto text-sm leading-6">
          <code>{activeTab.code}</code>
        </pre>
      </div>
    </div>
  );
}
