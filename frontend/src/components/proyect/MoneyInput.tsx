import { Heart } from 'lucide-react';



const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-br from-white to-gray-50 py-16">
        <GitHubIcon />
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