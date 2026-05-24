import { Heart } from 'lucide-react';

const GitHubIcon = () => (
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
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20-4.54c0-.96 0-1.87.66-2.54 2.2-.24 4.5.9 4.5.9s.72 2.3 4.5 2.54c0 .67 0 1.58 0 2.54a5.44 5.44 0 0 0 1.56 3.86c0 5.46-3.3 6.65-6.44 7a3.37 3.37 0 0 0-.94 2.61V19" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-br from-white to-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-extrabold text-violet-600">super</span>
              <span className="text-2xl font-extrabold text-gray-900">money</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              Input de dinero para la web. Modo ATM. Sin errores de punto flotante.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-end gap-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-violet-600 transition-all duration-200 hover:scale-105"
            >
              <GitHubIcon />
              GitHub
            </a>
            
            <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
              Hecho con <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-gray-500">
            MIT License
          </p>
          <p className="text-xs font-mono text-gray-500">
            Sin errores de punto flotante desde {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
