import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-violet-600">super</span>
            <span className="text-sm font-medium text-gray-900">money</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-900 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> y store as integer
            </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>MIT License • Sin errores de punto flotante desde 2024</p>
        </div>
      </div>
    </footer>
  );
}
