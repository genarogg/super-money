export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-violet-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-sm font-medium text-violet-500">super-money</span>
        <div className="flex items-center gap-6 text-sm font-mono text-gray-400">
          <a href="#install" className="hover:text-violet-500 transition-colors">
            install
          </a>
          <a href="#demo" className="hover:text-violet-500 transition-colors">
            demo
          </a>
         
        </div>
      </div>
    </nav>
  );
}
