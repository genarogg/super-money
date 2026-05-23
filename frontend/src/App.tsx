import { useEffect } from 'react';
import Hero from './components/Hero';
import Install from './components/Install';
import Nav from './components/Nav';
import Demo from './components/Demo';
import initMoneyInputs from './func/inputMoney';

function App() {
  useEffect(() => {
    initMoneyInputs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav />
      <main>
        <Hero />
        <Install />
        <Demo />
      </main>
    </div>
  );
}

export default App;
